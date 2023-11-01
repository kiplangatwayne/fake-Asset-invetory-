import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
// import Login from './components/Login';

// Component for adding assets
function AddAsset() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    status: '',
    image_url: '',
  });
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000/add_asset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        setMessage('Asset added successfully');
      } else {
        setMessage('Failed to add asset');
      }
    } catch (error) {
      console.error('Error adding asset:', error);
      setMessage('An error occurred while adding the asset');
    }
  };

  return (
    <div>
      <h1>Add New Asset</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Asset Name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="status"
          placeholder="Status"
          value={formData.status}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="image_url"
          placeholder="Image URL"
          value={formData.image_url}
          onChange={handleInputChange}
        />
        <button type="submit">Add Asset</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

// Component for allocating assets
function AllocateAsset() {
  const [formData, setFormData] = useState({
    assetId: '',
    employeeId: '',
  });
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/allocate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        setMessage('Asset allocated successfully');
      } else {
        setMessage('Failed to allocate asset');
      }
    } catch (error) {
      console.error('Error allocating asset:', error);
      setMessage('An error occurred while allocating the asset');
    }
  };

  return (
    <div>
      <h1>Allocate Asset</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="assetId"
          placeholder="Asset ID"
          value={formData.assetId}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="employeeId"
          placeholder="Employee ID"
          value={formData.employeeId}
          onChange={handleInputChange}
        />
        <button type="submit">Allocate Asset</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

// Component for requesting assets
function RequestAsset() {
  const [formData, setFormData] = useState({
    requestReason: '',
    requestQuantity: '',
    requestUrgency: '',
  });
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        setMessage('Asset request submitted successfully');
      } else {
        setMessage('Failed to submit asset request');
      }
    } catch (error) {
      console.error('Error requesting asset:', error);
      setMessage('An error occurred while submitting the asset request');
    }
  };

  return (
    <div>
      <h1>Request Asset</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="requestReason"
          placeholder="Reason"
          value={formData.requestReason}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="requestQuantity"
          placeholder="Quantity"
          value={formData.requestQuantity}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="requestUrgency"
          placeholder="Urgency"
          value={formData.requestUrgency}
          onChange={handleInputChange}
        />
        <button type="submit">Submit Request</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

// Component for user registration
function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    role: 'user',
  });
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        setMessage('Registration successful');
      } else {
        setMessage('Registration failed');
      }
    } catch (error) {
      console.error('Error registering:', error);
      setMessage('An error occurred during registration');
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
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
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <button type="submit">Register</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

// Component for user classification
function UserClassification() {
  const [classification, setClassification] = useState('Unknown');

  useEffect(() => {
    // http://127.0.0.1:5000/classify
    // Replace with an actual API call to retrieve user classification
    // For example, you can use the access token stored in localStorage
    // to make an authenticated request to your server.
    // Update 'classification' based on the response from the server.
  }, []);

  return (
    <div>
      <h1>User Classification</h1>
      <p>Your user classification is: {classification}</p>
      <p>
        <Link to="/">Go back to the home page</Link>
      </p>
    </div>
  );
}

// Component for user login
function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem('access_token', data.access_token);
        // Redirect to the home page or another route after successful login
        window.location.href = '/';
      } else {
        setMessage('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setMessage('An error occurred during login.');
    }
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
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/add_asset">Add Asset</Link>
            </li>
            <li>
              <Link to="/allocate_asset">Allocate Asset</Link>
            </li>
            <li>
              <Link to="/request_asset">Request Asset</Link>
            </li>
            <li>
              <Link to="/user_classification">User Classification</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/add_asset" element={<AddAsset />} />
          <Route path="/allocate_asset" element={<AllocateAsset />} />
          <Route path="/request_asset" element={<RequestAsset />} />
          <Route path="/user_classification" element={<UserClassification />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
