import { useState } from 'react';
import axios from 'axios';

function Register({ onUserAdded }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post('http://localhost:5000/api/users', { name, age: parseInt(age) });
      setName('');
      setAge('');
      setLoading(false);
      alert('User created successfully');
      if (onUserAdded) onUserAdded();
    } catch (error) {
      console.error('Error creating user:', error);
      setLoading(false);
      alert('Error creating user');
    }
  };

  return (
    <div className="register-container" style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '20px' }}>
      <h2>CREATE USERS</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>NAME: </label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required
          />
          <label> AGE: </label>
          <input 
            type="number" 
            value={age} 
            onChange={(e) => setAge(e.target.value)} 
            required
          />
          <button 
            type="submit" 
            disabled={loading}
            style={{ backgroundColor: '#4CAF50', color: 'white', marginLeft: '10px' }}
          >
            {loading ? 'Saving...' : 'SAVE DATA'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;