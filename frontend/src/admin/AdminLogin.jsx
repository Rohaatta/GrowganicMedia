import React, { useState } from 'react';
import { Lock, User, KeyRound, AlertCircle } from 'lucide-react';

export default function AdminLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Store in localStorage
      localStorage.setItem('hassan_admin_token', data.token);
      localStorage.setItem('hassan_admin_username', data.username);
      
      onLoginSuccess(data.token, data.username);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Server error. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div className="glow-spot" style={{ width: '300px', height: '300px', top: '35%', left: '40%' }}></div>
      
      <div className="glass-card animate-fade-in-up" style={styles.card}>
        <div style={styles.header}>
          <div style={styles.iconContainer}>
            <KeyRound size={22} color="#ffffff" />
          </div>
          <h2 style={styles.title}>Admin Portal</h2>
          <p style={styles.subtitle}>Enter credentials to access the agency control dashboard.</p>
        </div>

        {error && (
          <div style={styles.errorContainer}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username</label>
            <div style={styles.inputWrapper}>
              <User size={18} style={styles.inputIcon} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                style={styles.input}
                required
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.inputWrapper}>
              <Lock size={18} style={styles.inputIcon} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={styles.input}
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={loading}
            style={styles.submitBtn}
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: 'calc(100vh - 70px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    position: 'relative',
  },
  card: {
    width: '100%',
    maxWidth: '420px',
    padding: '3rem 2.5rem',
    backgroundColor: 'var(--bg-secondary)',
    boxShadow: '0 30px 60px rgba(0, 0, 0, 0.6)',
    zIndex: 2,
    borderRadius: '20px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  iconContainer: {
    background: 'var(--color-accent)',
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1rem auto',
    boxShadow: '0 0 20px var(--color-accent-glow)',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 800,
    marginBottom: '0.4rem',
  },
  subtitle: {
    fontSize: '0.85rem',
    color: 'var(--color-secondary)',
    lineHeight: '1.4',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontSize: '0.8rem',
    fontWeight: 600,
    color: 'var(--color-secondary)',
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: '12px',
    color: '#64748b',
    pointerEvents: 'none',
  },
  input: {
    width: '100%',
    backgroundColor: 'var(--bg-input)',
    border: '1px solid var(--border-color)',
    borderRadius: '10px',
    padding: '0.8rem 1rem 0.8rem 2.5rem',
    color: '#ffffff',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'all var(--transition-fast)',
  },
  submitBtn: {
    width: '100%',
    marginTop: '0.8rem',
  },
  errorContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.8rem 1rem',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.2)',
    color: '#ef4444',
    borderRadius: '10px',
    fontSize: '0.82rem',
    fontWeight: 500,
    marginBottom: '1.5rem',
  }
};
