import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export const CategoryChart = ({ data }) => {
  const COLORS = ['#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#ec4899'];

  const categoryData = data.reduce((acc, curr) => {
    if (curr.type === 'expense') {
      const existing = acc.find(a => a.name === curr.category);
      if (existing) existing.value += curr.amount;
      else acc.push({ name: curr.category, value: curr.amount });
    }
    return acc;
  }, []);

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={categoryData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {categoryData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(255,255,255,0.1)" />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px' }}
            itemStyle={{ color: 'var(--text-bright)' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export const TrendChart = ({ data }) => {
  // Sort data by date and group by day/month
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
  
  const trendData = sortedData.reduce((acc, curr) => {
    const date = curr.date;
    const existing = acc.find(a => a.date === date);
    if (existing) {
      if (curr.type === 'income') existing.income += curr.amount;
      else existing.expense += curr.amount;
    } else {
      acc.push({ 
        date, 
        income: curr.type === 'income' ? curr.amount : 0, 
        expense: curr.type === 'expense' ? curr.amount : 0 
      });
    }
    return acc;
  }, []).slice(-7); // Last 7 unique dates for clarity

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={trendData}>
          <XAxis dataKey="date" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip 
            contentStyle={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px' }}
          />
          <Line type="monotone" dataKey="income" stroke="var(--accent)" strokeWidth={3} dot={{ fill: 'var(--accent)' }} />
          <Line type="monotone" dataKey="expense" stroke="var(--danger)" strokeWidth={3} dot={{ fill: 'var(--danger)' }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
