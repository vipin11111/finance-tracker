import React, { createContext, useContext, useEffect, useState } from 'react';
import { collection, addDoc, onSnapshot, query, where, orderBy, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db, isDemoMode } from '../lib/firebase';
import { useAuth } from './AuthContext';

const FinanceContext = createContext();

export const useFinance = () => useContext(FinanceContext);

export const FinanceProvider = ({ children }) => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [budget, setBudget] = useState(2000); // Default budget
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setTransactions([]);
      setLoading(false);
      return;
    }

    if (isDemoMode) {
      const saved = localStorage.getItem(`transactions_${user.uid}`);
      if (saved) {
        setTransactions(JSON.parse(saved));
      } else {
        const mockData = [
          { id: '1', amount: 3500, category: 'Salary', date: '2026-04-01', description: 'Monthly Salary', type: 'income' },
          { id: '2', amount: 1200, category: 'Rent', date: '2026-04-02', description: 'April Rent', type: 'expense' },
          { id: '3', amount: 150, category: 'Food', date: '2026-04-05', description: 'Grocery shopping', type: 'expense' },
          { id: '4', amount: 200, category: 'Freelance', date: '2026-04-10', description: 'Logo design project', type: 'income' },
          { id: '5', amount: 80, category: 'Travel', date: '2026-04-12', description: 'Fuel', type: 'expense' },
        ];
        setTransactions(mockData);
        localStorage.setItem(`transactions_${user.uid}`, JSON.stringify(mockData));
      }
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'transactions'),
      where('userId', '==', user.uid),
      orderBy('date', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTransactions(data);
      setLoading(false);
    });

    return unsubscribe;
  }, [user]);

  // Persistence for demo mode
  useEffect(() => {
    if (isDemoMode && user) {
      localStorage.setItem(`transactions_${user.uid}`, JSON.stringify(transactions));
    }
  }, [transactions, user]);

  const addTransaction = async (data) => {
    if (isDemoMode) {
      setTransactions(prev => [{ id: Date.now().toString(), ...data, userId: user.uid }, ...prev]);
      return;
    }
    await addDoc(collection(db, 'transactions'), {
      ...data,
      userId: user.uid,
      createdAt: new Date().toISOString()
    });
  };

  const deleteTransaction = async (id) => {
    if (isDemoMode) {
      setTransactions(prev => prev.filter(t => t.id !== id));
      return;
    }
    await deleteDoc(doc(db, 'transactions', id));
  };

  const updateBudget = (amount) => {
    setBudget(amount);
  };

  return (
    <FinanceContext.Provider value={{ 
      transactions, 
      budget, 
      addTransaction, 
      deleteTransaction, 
      updateBudget,
      loading 
    }}>
      {children}
    </FinanceContext.Provider>
  );
};
