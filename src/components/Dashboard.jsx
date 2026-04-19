import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { useAuth } from '../context/AuthContext';
import { Plus, TrendingUp, TrendingDown, DollarSign, Download } from 'lucide-react';
import TransactionModal from './TransactionModal';
import TransactionList from './TransactionList';
import { CategoryChart, TrendChart } from './FinanceCharts';
import AIInsights from './AIInsights';
import BudgetTracker from './BudgetTracker';

const Dashboard = () => {
  const { transactions } = useFinance();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = totalIncome - totalExpenses;

  const exportToCSV = () => {
    const headers = ['Date,Description,Category,Type,Amount\n'];
    const rows = transactions.map(t => `${t.date},${t.description},${t.category},${t.type},${t.amount}\n`);
    const blob = new Blob([...headers, ...rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `finance_data_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="app-container">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem' }} className="text-gradient">Welcome back, {user?.displayName?.split(' ')[0]}</h1>
          <p style={{ color: 'var(--text-muted)' }}>Here's what's happening with your money today.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={exportToCSV} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Download size={18} /> Export
          </button>
          <button onClick={() => setIsModalOpen(true)} className="btn-primary">
            <Plus size={20} /> Add Transaction
          </button>
        </div>
      </header>

      {/* Summary Stats */}
      <div className="dashboard-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', marginBottom: '2.5rem' }}>
        <div className="glass-card stats-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
            <DollarSign size={18} />
            <span>Total Balance</span>
          </div>
          <p className="stats-value">${balance.toLocaleString()}</p>
        </div>
        <div className="glass-card stats-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)' }}>
            <TrendingUp size={18} />
            <span>Total Income</span>
          </div>
          <p className="stats-value" style={{ color: 'var(--accent)' }}>+${totalIncome.toLocaleString()}</p>
        </div>
        <div className="glass-card stats-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--danger)' }}>
            <TrendingDown size={18} />
            <span>Total Expenses</span>
          </div>
          <p className="stats-value" style={{ color: 'var(--danger)' }}>-${totalExpenses.toLocaleString()}</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <BudgetTracker />
          <AIInsights transactions={transactions} />
        </div>
        <div className="glass-card">
          <h3 style={{ marginBottom: '1rem' }}>Spending Trends</h3>
          <TrendChart data={transactions} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        <TransactionList />
        <div className="glass-card">
          <h3 style={{ marginBottom: '1rem' }}>Expenses by Category</h3>
          <CategoryChart data={transactions} />
        </div>
      </div>

      <TransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Dashboard;
