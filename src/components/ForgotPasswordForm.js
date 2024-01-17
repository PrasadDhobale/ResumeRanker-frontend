// ForgotPasswordForm.js
import React, { useState } from 'react';
import '../static/css/ForgotPasswordForm.css'; // Import the CSS file for styling

const ForgotPasswordForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic for handling forgot password submission
    console.log(formData); // For demonstration purposes
  };

  return (
    <div className="forgot-password-form-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit} className="forgot-password-form">
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="form-input" />
        </label>
        <button type="submit" className="form-button">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
