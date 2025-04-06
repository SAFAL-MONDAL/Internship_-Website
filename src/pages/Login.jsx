import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import '../style/Login.css';

const Login = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      if (onClose) {
        onClose();
      }
      // You can add navigation logic here when not in modal mode
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || 'Login failed. Please try again.');
      } else {
        setError('An unexpected error occurred.');
      }
      setLoading(false);
    }
  };

  return (
    <motion.div 
      className="login-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Hero Section */}
      <motion.div 
        className="login-hero"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h1>Internship. Impact. Inspire.</h1>
        <p className="hero-subtitle">Turn knowledge into action through hands-on experience.</p>
        
        <div className="hero-cta">
  <motion.p 
    className="learn-today"
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.4 }}
  >
    Learn Today, <span className="lead-tomorrow">Lead Tomorrow.</span>
  </motion.p>
</div>
      </motion.div>

      {/* Login Form Section */}
      <motion.div 
        className="login-form-container"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="login-form">
          <h2>Welcome Back!</h2>
          <p className="login-subtitle">Login to continue your journey</p>
          
          {error && (
            <motion.div 
              className="error-message"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}
          
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>
            
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>
            
            <motion.button 
              type="submit" 
              className="login-button"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </motion.button>
          </form>
          
          <div className="login-footer">
            <p>Don't have an account? <a href="/signup">Sign up</a></p>
            <a href="/forgot-password" className="forgot-password">Forgot password?</a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Login;