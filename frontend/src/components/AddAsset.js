import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AddAsset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      category: '',
      status: '',
      image_url: '',
      message: '',
    };
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const assetData = {
      name: this.state.name,
      category: this.state.category,
      status: this.state.status,
      image_url: this.state.image_url,
    };

    // Perform an AJAX request to add a new asset
    // You can use fetch or a library like Axios
    fetch('http://127.0.0.1:5000/add_asset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: JSON.stringify(assetData),
    })
      .then((response) => {
        if (response.status === 201) {
          this.setState({ message: 'Asset added successfully' });
        } else {
          this.setState({ message: 'Failed to add asset' });
        }
      })
      .catch((error) => {
        console.error('Error adding asset:', error);
        // Handle the error, e.g., show an error message to the user
      });
  };

  render() {
    return (
      <div>
        <h1>Add New Asset</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Asset Name"
            value={this.state.name}
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={this.state.category}
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            name="status"
            placeholder="Status"
            value={this.state.status}
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            name="image_url"
            placeholder="Image URL"
            value={this.state.image_url}
            onChange={this.handleInputChange}
          />
          <button type="submit">Add Asset</button>
          {this.state.message && <p>{this.state.message}</p>}
        </form>
        <p>
          <Link to="/">Go back to the home page</Link>
        </p>
      </div>
    );
  }
}

export default AddAsset;
