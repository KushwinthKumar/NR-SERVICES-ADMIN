import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Hardcoded admin credentials
    const adminCredentials = { email: 'admin@example.com', password: 'admin123' };

    if (email === adminCredentials.email && password === adminCredentials.password) {
      // Simulate token and role response
      const token = 'fake-jwt-token';
      localStorage.setItem('token', token);
      localStorage.setItem('role', 'admin');

      // Redirect to admin dashboard
      navigate('/admin-dashboard');
    } else {
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="card p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <form onSubmit={handleSubmit}>
          <h2 className="text-center mb-4">Admin Login</h2>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">Login</button>
        </form>
        <p className="text-center mt-3">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
