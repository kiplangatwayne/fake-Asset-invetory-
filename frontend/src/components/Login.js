import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: null,
      loggedIn: false,
    };
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleLogin = async (e) => {
    e.preventDefault();

    const { username, password } = this.state;

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 200) {
        // Successful login, extract the access token from the response
        const data = await response.json();
        const access_token = data.access_token;

        // Store the access token in local storage or a secure location
        localStorage.setItem('access_token', access_token);

        // Redirect the user to the desired page upon successful login
        this.setState({ loggedIn: true });
      } else {
        // Authentication failed, display an error message
        this.setState({ error: 'Invalid username or password' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      this.setState({ error: 'An error occurred during login' });
    }
  };

  render() {
    if (this.state.loggedIn) {
      // Redirect the user to the desired page upon successful login
      return <Redirect to="/dashboard" />;
    }

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleLogin}>
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
          <button type="submit">Login</button>
        </form>
        {this.state.error && <p className="error">{this.state.error}</p>}
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    );
  }
}

export default Login;
