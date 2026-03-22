import React, { useState } from 'react';
import { Mail, ShieldCheck, AlertCircle } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const submitAction = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('isAuth', 'true');
      window.location.reload();
    } else {
      setMsg('Invalid Credentials. Please use admin / admin.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box card" style={{ textAlign: 'center', padding: '40px' }}>
        <Mail size={48} color="#2563eb" style={{ marginBottom: '16px' }} />
        <h2 style={{ marginBottom: '8px', justifyContent: 'center' }}>Admin Dashboard</h2>
        <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '30px' }}>
          Log in to manage bulk mail operations
        </p>

        {msg && (
          <div className="alert alert-danger" style={{ textAlign: 'left', fontSize: '13px' }}>
            <AlertCircle size={18} /> {msg}
          </div>
        )}

        <form onSubmit={submitAction} style={{ textAlign: 'left' }}>
          <div className="form-group">
            <label>Username</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Enter username"
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="Enter password"
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>
            <ShieldCheck size={18} /> Secure Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
