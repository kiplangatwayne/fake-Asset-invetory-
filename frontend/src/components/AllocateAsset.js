import React, { Component } from 'react';

class AllocateAsset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assetId: '',
      employeeName: '',
      message: '',
    };
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const allocationData = {
      Normal_Employee_name: this.state.employeeName,
    };

    try {
      const response = await fetch(`http://127.0.0.1:5000/allocate_asset/{asset_id}${this.state.assetId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify(allocationData),
      });

      if (response.status === 201) {
        this.setState({ message: 'Asset allocated to employee successfully' });
      } else if (response.status === 404) {
        this.setState({ message: 'Asset or Normal Employee not found' });
      } else {
        this.setState({ message: 'Failed to allocate asset' });
      }
    } catch (error) {
      console.error('Error allocating asset:', error);
      // Handle the error, e.g., show an error message to the user
      this.setState({ message: 'An error occurred during asset allocation' });
    }
  };

  render() {
    return (
      <div>
        <h1>Allocate Asset</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="assetId"
            placeholder="Asset ID"
            value={this.state.assetId}
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            name="employeeName"
            placeholder="Employee Name"
            value={this.state.employeeName}
            onChange={this.handleInputChange}
          />
          <button type="submit">Allocate Asset</button>
          {this.state.message && <p>{this.state.message}</p>}
        </form>
      </div>
    );
  }
}

export default AllocateAsset;
