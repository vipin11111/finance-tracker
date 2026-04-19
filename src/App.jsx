import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { FinanceProvider } from './context/FinanceContext';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import './App.css';

const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="animate-pulse" style={{ color: 'var(--primary)', fontWeight: 600 }}>Loading SmartFinance...</div>
      </div>
    );
  }

  return (
    <>
      {user ? (
        <FinanceProvider>
          <Navbar />
          <Dashboard />
        </FinanceProvider>
      ) : (
        <Login />
      )}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
