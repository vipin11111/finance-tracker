import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { Target, AlertTriangle } from 'lucide-react';

const BudgetTracker = () => {
  const { transactions, budget, updateBudget } = useFinance();
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(budget);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const percentage = Math.min((totalExpenses / budget) * 100, 100);
  const isOverBudget = totalExpenses > budget;

  const handleSave = () => {
    updateBudget(parseFloat(newBudget));
    setIsEditing(false);
  };

  return (
    <div className="glass-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Target size={20} color="var(--primary)" />
          <h3 style={{ margin: 0 }}>Monthly Budget</h3>
        </div>
        {isEditing ? (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input 
              type="number" 
              value={newBudget} 
              onChange={(e) => setNewBudget(e.target.value)}
              style={{ width: '100px', padding: '6px' }}
            />
            <button onClick={handleSave} className="btn-primary" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>Save</button>
          </div>
        ) : (
          <button onClick={() => setIsEditing(true)} style={{ color: 'var(--primary)', background: 'transparent', fontSize: '0.875rem' }}>Edit Limit</button>
        )}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>Spent: ${totalExpenses.toLocaleString()}</span>
          <span style={{ color: 'var(--text-muted)' }}>Goal: ${budget.toLocaleString()}</span>
        </div>
        <div style={{ width: '100%', height: '10px', background: 'var(--bg-secondary)', borderRadius: '5px', overflow: 'hidden' }}>
          <div style={{ 
            width: `${percentage}%`, 
            height: '100%', 
            background: isOverBudget ? 'var(--danger)' : 'var(--primary)',
            transition: 'width 0.5s ease-out'
          }} />
        </div>
      </div>

      {isOverBudget && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--danger)', fontSize: '0.875rem', background: 'rgba(248, 81, 73, 0.1)', padding: '10px', borderRadius: '10px' }}>
          <AlertTriangle size={16} />
          <p>You've exceeded your monthly budget by ${(totalExpenses - budget).toLocaleString()}!</p>
        </div>
      )}
    </div>
  );
};

export default BudgetTracker;
