import React, { Component } from 'react';

class RequestAsset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestReason: '',
      requestQuantity: '',
      requestUrgency: '',
    };
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // Perform AJAX request to submit an asset request
    // You can use fetch or a library like Axios
  };

  render() {
    return (
      <div>
        <h1>Request Asset</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="requestReason"
            placeholder="Reason"
            value={this.state.requestReason}
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            name="requestQuantity"
            placeholder="Quantity"
            value={this.state.requestQuantity}
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            name="requestUrgency"
            placeholder="Urgency"
            value={this.state.requestUrgency}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit Request</button>
        </form>
      </div>
    );
  }
}

export default RequestAsset;
