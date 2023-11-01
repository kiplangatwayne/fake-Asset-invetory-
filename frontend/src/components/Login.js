import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const loginUser = async (data) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        const result = await response.json();
        localStorage.setItem('access_token', result.access_token);
        toast.success('Login successful'); // Show success notification
        navigate('/');
      } else {
        toast.error('Invalid username or password'); // Show error notification
      }
    } catch (error) {
      console.error('Error logging in:', error);
      toast.error('An error occurred during login'); // Show error notification
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    loginUser(formData);
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <button type="submit">Login</button>
      </form>
      <ToastContainer /> {/* This component renders the notifications */}
    </div>
  );
}

export default Login;
