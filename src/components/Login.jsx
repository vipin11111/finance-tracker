import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Wallet, ShieldCheck, Zap } from 'lucide-react';

const Login = () => {
  const { loginWithGoogle } = useAuth();

  return (
    <div className="auth-page">
      <div className="glass-card auth-card" style={{ padding: '3rem', textAlign: 'center' }}>
        <div style={{ background: 'var(--primary)', width: '64px', height: '64px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
          <Wallet size={32} color="white" />
        </div>
        
        <h1 className="text-gradient" style={{ fontSize: '2rem', marginBottom: '1rem' }}>SmartFinance</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>Master your money with AI-powered insights and beautiful tracking.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem', textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem' }}>
            <ShieldCheck size={18} color="var(--accent)" />
            <span>Secure Cloud Syncing</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem' }}>
            <Zap size={18} color="var(--primary)" />
            <span>AI-Powered Insights</span>
          </div>
        </div>

        <button 
          onClick={loginWithGoogle}
          className="btn-primary" 
          style={{ width: '100%', justifyContent: 'center', padding: '16px' }}
        >
          Sign in to Dashboard
        </button>
        
        <p style={{ marginTop: '1.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          By continuing, you agree to our Terms of Service.
        </p>
      </div>
    </div>
  );
};

export default Login;
