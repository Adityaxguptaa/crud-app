import { useState } from 'react';
import './App.css';
import Delete from './components/Delete';
import Register from './components/Register';
import Update from './components/Update';
import View from './components/View';

function App() {
  const [refreshData, setRefreshData] = useState(0);
  
  const handleDataChange = () => {
    // Increment to trigger a refresh
    setRefreshData(prev => prev + 1);
  };

  return (
    <div className="app-container">
      <h1 style={{ color: 'white', border: '3px solid #388E3C', padding: '10px', marginBottom: '20px', width: '100%' }}>
        CRUD FUNCTION APP
      </h1>
      
      <Register onUserAdded={handleDataChange} />
      
      <View key={`view-${refreshData}`} />
      
      <Update onUserUpdated={handleDataChange} />
      
      <Delete onUserDeleted={handleDataChange} />
    </div>
  );
}

export default App;