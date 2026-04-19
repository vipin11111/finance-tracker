import React, { useState } from 'react';
import { Sparkles, RefreshCw, AlertCircle } from 'lucide-react';
import { getGeminiInsights } from '../services/aiService';

const AIInsights = ({ transactions }) => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateInsights = async () => {
    if (transactions.length === 0) {
      setError("Add some transactions first to get insights!");
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      const result = await getGeminiInsights(transactions);
      setInsights(result);
    } catch (err) {
      setError("Could not generate insights. Make sure your Gemini API key is set in .env");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(22, 27, 34, 0.8))', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles size={20} color="var(--primary)" />
          <h3 style={{ margin: 0 }}>AI Financial Insights</h3>
        </div>
        <button 
          onClick={generateInsights} 
          disabled={loading}
          style={{ background: 'transparent', color: 'var(--primary)', padding: '4px' }}
        >
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {loading ? (
        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          <p>Analyzing your spending patterns...</p>
        </div>
      ) : insights ? (
        <div className="animate-fade-in" style={{ fontSize: '0.9375rem', color: 'var(--text-main)' }}>
          <p style={{ whiteSpace: 'pre-wrap' }}>{insights}</p>
        </div>
      ) : error ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--danger)', fontSize: '0.875rem' }}>
          <AlertCircle size={16} />
          <p>{error}</p>
        </div>
      ) : (
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          Click the refresh icon to get personalized AI tips based on your data.
        </p>
      )}
    </div>
  );
};

export default AIInsights;
