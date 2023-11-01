import React, { Component } from 'react';

class RequestAsset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reason: '',
      quantity: '',
      urgency: '',
      message: '',
    };
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the asset request data
    const assetRequestData = {
      reason: this.state.reason,
      quantity: this.state.quantity,
      urgency: this.state.urgency,
    };

    // Perform an AJAX request to submit an asset request
    fetch('http://127.0.0.1:5000/request_asset/{asset_id}', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: JSON.stringify(assetRequestData),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Failed to submit asset request');
        }
      })
      .then((data) => {
        this.setState({ message: 'Asset request submitted successfully' });
        // You can handle the response data as needed
      })
      .catch((error) => {
        console.error('Error submitting asset request:', error);
        this.setState({ message: 'Failed to submit asset request' });
      });
  };

  render() {
    return (
      <div>
        <h1>Request Asset</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="reason"
            placeholder="Reason"
            value={this.state.reason}
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            name="quantity"
            placeholder="Quantity"
            value={this.state.quantity}
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            name="urgency"
            placeholder="Urgency"
            value={this.state.urgency}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit Request</button>
          {this.state.message && <p>{this.state.message}</p>}
        </form>
      </div>
    );
  }
}

export default RequestAsset;
