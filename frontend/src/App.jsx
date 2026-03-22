import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Mail, Send, History, LogOut } from 'lucide-react';
import Dashboard from './Dashboard';
import EmailHistory from './History';
import Login from './Login';

const App = () => {
  const isAuth = localStorage.getItem('isAuth');

  const logout = () => {
    localStorage.removeItem('isAuth');
    window.location.reload();
  };

  if (!isAuth) {
    return <Login />;
  }

  return (
    <Router>
      <div className="navbar">
        <div className="nav-brand">
          <Mail size={24} />
          Bulk Mail App
        </div>
        <div className="nav-links">
          <Link to="/" className="nav-item">
            <Send size={18} /> Send Mail
          </Link>
          <Link to="/history" className="nav-item">
            <History size={18} /> History
          </Link>
          <button onClick={logout} className="nav-item">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>
      
      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/history" element={<EmailHistory />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
