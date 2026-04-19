import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { Search, Filter, Trash2, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

const TransactionList = () => {
  const { transactions, deleteTransaction } = useFinance();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = transactions.filter(t => {
    const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         t.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || t.type === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="glass-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h3>Recent Transactions</h3>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '40px', fontSize: '0.875rem' }}
            />
          </div>
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            style={{ fontSize: '0.875rem' }}
          >
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expenses</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {filtered.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>No transactions found.</p>
        ) : (
          filtered.map(t => (
            <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--bg-secondary)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ 
                  background: t.type === 'income' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(248, 81, 73, 0.1)',
                  padding: '10px', borderRadius: '12px',
                  color: t.type === 'income' ? 'var(--accent)' : 'var(--danger)'
                }}>
                  {t.type === 'income' ? <ArrowUpRight size={20} /> : <ArrowDownLeft size={20} />}
                </div>
                <div>
                  <p style={{ fontWeight: 600, color: 'var(--text-bright)' }}>{t.description || t.category}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.date} • {t.category}</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <p style={{ fontWeight: 700, color: t.type === 'income' ? 'var(--accent)' : 'var(--danger)' }}>
                  {t.type === 'income' ? '+' : '-'}${Math.abs(t.amount).toLocaleString()}
                </p>
                <button 
                  onClick={() => deleteTransaction(t.id)}
                  style={{ color: 'var(--text-muted)', background: 'transparent' }}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TransactionList;
