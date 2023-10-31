import React, { Component } from 'react';

class AllocateAsset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assetId: '',
      employeeId: '',
    };
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // Perform AJAX request to allocate an asset
    // You can use fetch or a library like Axios
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
            name="employeeId"
            placeholder="Employee ID"
            value={this.state.employeeId}
            onChange={this.handleInputChange}
          />
          <button type="submit">Allocate Asset</button>
        </form>
      </div>
    );
  }
}

export default AllocateAsset;
