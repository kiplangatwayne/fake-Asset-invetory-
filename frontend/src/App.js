import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AllocateAsset from './components/AllocateAsset';
import AddAsset from './components/AddAsset';
import RequestAsset from './components/RequestAsset';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Define routes for your components */}
        <Route path="/add_asset" component={AddAsset} />
        <Route path="/allocate_asset" component={AllocateAsset} />
        <Route path="/request_asset" component={RequestAsset} />
      </div>
    </Router>
  );
}

export default App;
