// UserLoginForm.js
import React, { useState } from 'react';
import '../static/css/UserLoginForm.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom';

const UserLoginForm = ({ onClose }) => {

  document.title = "Resume Ranker | User Login";

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    mobileNumber: '',
  });

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login or registration logic here
    console.log(formData); // For demonstration purposes
  };  

  return (
    <div className={`user-form-container ${isLogin ? 'login' : 'register'}`}>
      <h2>{isLogin ? 'User Login' : 'User Registration'}</h2>
      <form onSubmit={handleSubmit} className="user-form">
        {isLogin ? (
          <>
            <label>
              Email:
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="form-input" />
            </label>
            <label>
              Password:
              <input type="password" name="password" value={formData.password} onChange={handleInputChange} required className="form-input" />
            </label>
            <p className="forgot-password-link">
                <Link to="/forgot-password">Forgot Password?</Link>
            </p>
          </>
        ) : (
          <>
            <label>
              First Name:
              <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required className="form-input" />
            </label>
            <label>
              Last Name:
              <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required className="form-input" />
            </label>
            <label>
              Email:
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="form-input" />
            </label>
            <label>
              Mobile Number:
              <input type="tel" name="mobileNumber" value={formData.mobileNumber} onChange={handleInputChange} required className="form-input" />
            </label>
          </>
        )}
        <button type="submit" className={`form-button ${isLogin ? 'login-button' : 'register-button'}`}>
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
      <p className="form-toggle">
        {isLogin ? "Don't have an account? " : 'Already have an account? '}
        <button type="button" onClick={toggleForm} className="toggle-button">
          {isLogin ? 'Register here' : 'Login here'}
        </button>
      </p>      
    </div>
  );
};

export default UserLoginForm;
