import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, LogOut, User, Wallet } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="glass" style={{ margin: '1rem', padding: '0.75rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: '1rem', zIndex: 100 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ background: 'var(--primary)', padding: '8px', borderRadius: '10px' }}>
          <Wallet size={24} color="white" />
        </div>
        <h2 className="text-gradient" style={{ margin: 0, fontSize: '1.25rem' }}>SmartFinance</h2>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        {user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div className="hidden-mobile" style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-bright)' }}>{user.displayName}</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Free Plan</p>
            </div>
            <button 
              onClick={logout}
              className="glass"
              style={{ padding: '8px', borderRadius: '10px', color: 'var(--danger)' }}
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
