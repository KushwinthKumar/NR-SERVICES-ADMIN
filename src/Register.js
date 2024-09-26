import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Use useNavigate hook

  const validateForm = () => {
    const newErrors = {};
    if (!firstName) newErrors.firstName = 'First name is required';
    if (!lastName) newErrors.lastName = 'Last name is required';
    if (!mobileNumber) newErrors.mobileNumber = 'Mobile number is required';
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Here you would typically make an API request to register the user
    // For demonstration, we'll just log the details
    console.log({ firstName, lastName, mobileNumber, email, password });

    // Redirect to the user dashboard page after successful registration
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <h2 className="text-center mb-4">Register to Serve</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">First name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              {errors.firstName && <small className="form-text text-danger">{errors.firstName}</small>}
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last name</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              {errors.lastName && <small className="form-text text-danger">{errors.lastName}</small>}
            </div>
            <div className="form-group">
              <label htmlFor="mobileNumber">Mobile Number</label>
              <input
                type="tel"
                className="form-control"
                id="mobileNumber"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
              />
              {errors.mobileNumber && <small className="form-text text-danger">{errors.mobileNumber}</small>}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {errors.email && <small className="form-text text-danger">{errors.email}</small>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Create Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {errors.password && <small className="form-text text-danger">{errors.password}</small>}
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {errors.confirmPassword && <small className="form-text text-danger">{errors.confirmPassword}</small>}
            </div>
            <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
          </form>
          <p className="text-center mt-3">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;