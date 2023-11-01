import React, { useEffect, useState } from 'react';

const ApproveAssetRequest = ({ requestId }) => {
  const [message, setMessage] = useState('');
  
  const approveRequest = () => {
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
      // Handle unauthorized access
      console.error('Unauthorized');
      return;
    }

    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    };

    fetch(`/approve_request/<int:request_id>'${requestId}`, requestOptions)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          // Handle errors (e.g., display an error message)
          console.error('Failed to approve asset request');
        }
      })
      .then((data) => {
        // Handle success (e.g., display a success message)
        setMessage(data.message); // Asset request approved successfully
      })
      .catch((error) => {
        // Handle any network or other errors
        console.error('Error approving asset request:', error);
      });
  };

  useEffect(() => {
    // Automatically approve the request when the component mounts
    approveRequest();
  }, []);

  return (
    <div>
      <h1>Approving Asset Request</h1>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ApproveAssetRequest;
