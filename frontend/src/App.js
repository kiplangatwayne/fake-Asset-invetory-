import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddAsset from './components/AddAsset';
import AllocateAsset from './components/AllocateAsset';
import RequestAsset from './components/RequestAsset';
import Login from './components/Login';
import Register from './components/Register';
import Userprofile from './components/UserProfile';
import UserClassification from './components/UserClassification';
import UserRequests from './components/UserRequest';
// import ApproveAssetRequest from './ApproveAssetRequest'; // Import the new component
import ApproveAssetRequest from './components/ApproveAssetRequest';


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
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/userprofile">User Profile</Link>
            </li>
            <li>
              <Link to="/userClassification">User Classification</Link>
            </li>
            <li>
              <Link to="/userRequests">User Requests</Link>
            </li>
            <li>
              <Link to="/approve_asset_request">Approve Asset Request</Link> {/* New route */}
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/add_asset" element={<AddAsset />} />
          <Route path="/allocate_asset" element={<AllocateAsset />} />
          <Route path="/request_asset" element={<RequestAsset />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userprofile" element={<Userprofile />} />
          <Route path="/userClassification" element={<UserClassification />} />
          <Route path="/userRequests" element={<UserRequests />} />
          <Route path="/approve_asset_request" element={<ApproveAssetRequest />} /> {/* New route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
