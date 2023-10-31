import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      role: 'Normal User', // Default role
      success: false,
      error: null,
    };
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleRegister = async (e) => {
    e.preventDefault();

    const { username, password, email, role } = this.state;

    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email, role }),
      });

      if (response.status === 201) {
        // Registration successful
        this.setState({ success: true });
      } else {
        const data = await response.json();
        this.setState({ error: data.message });
      }
    } catch (error) {
      console.error('Error during registration:', error);
      this.setState({ error: 'An error occurred during registration' });
    }
  };

  render() {
    if (this.state.success) {
      // Registration was successful, redirect to a success page or login
      return <Redirect to="/login" />;
    }

    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleRegister}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={this.state.username}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={this.state.role}
              onChange={this.handleInputChange}
            >
              <option value="Normal User">Normal User</option>
              <option value="Procurement Manager">Procurement Manager</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <button type="submit">Register</button>
        </form>
        {this.state.error && <p className="error">{this.state.error}</p>}
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    );
  }
}

export default Register;
