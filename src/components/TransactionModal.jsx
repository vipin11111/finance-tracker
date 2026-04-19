import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { X, PlusCircle, MinusCircle } from 'lucide-react';

const TransactionModal = ({ isOpen, onClose }) => {
  const { addTransaction } = useFinance();
  const [formData, setFormData] = useState({
    amount: '',
    category: 'Food',
    date: new Date().toISOString().split('T')[0],
    description: '',
    type: 'expense'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      ...formData,
      amount: parseFloat(formData.amount)
    });
    setFormData({
      amount: '',
      category: 'Food',
      date: new Date().toISOString().split('T')[0],
      description: '',
      type: 'expense'
    });
    onClose();
  };

  const categories = formData.type === 'income' 
    ? ['Salary', 'Freelance', 'Investment', 'Gift', 'Other']
    : ['Food', 'Travel', 'Rent', 'Shopping', 'Bills', 'Entertainment', 'Other'];

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '450px', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: 'var(--text-muted)' }}>
          <X size={24} />
        </button>

        <h3 style={{ marginBottom: '1.5rem' }}>Add Transaction</h3>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--bg-secondary)', padding: '4px', borderRadius: '12px' }}>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'income', category: 'Salary' })}
              style={{ 
                flex: 1, padding: '10px', borderRadius: '10px', 
                background: formData.type === 'income' ? 'var(--accent)' : 'transparent',
                color: formData.type === 'income' ? 'white' : 'var(--text-muted)',
                fontWeight: 600
              }}
            >
              Income
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'expense', category: 'Food' })}
              style={{ 
                flex: 1, padding: '10px', borderRadius: '10px', 
                background: formData.type === 'expense' ? 'var(--danger)' : 'transparent',
                color: formData.type === 'expense' ? 'white' : 'var(--text-muted)',
                fontWeight: 600
              }}
            >
              Expense
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Amount</label>
            <input
              type="number"
              required
              placeholder="0.00"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Date</label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Description</label>
            <input
              type="text"
              placeholder="What was this for?"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <button type="submit" className="btn-primary" style={{ justifyContent: 'center', marginTop: '0.5rem' }}>
            Save Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;
