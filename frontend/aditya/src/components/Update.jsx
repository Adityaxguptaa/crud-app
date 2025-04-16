import { useState, useEffect } from 'react';
import axios from 'axios';

function Update({ onUserUpdated }) {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSelectUser = (user) => {
    setSelectedUserId(user.id);
    setName(user.name);
    setAge(user.age.toString());
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.put(`http://localhost:5000/api/users/${selectedUserId}`, { name, age: parseInt(age) });
      setLoading(false);
      setSelectedUserId(null);
      setName('');
      setAge('');
      alert('User updated successfully');
      fetchUsers();
      if (onUserUpdated) onUserUpdated();
    } catch (error) {
      console.error('Error updating user:', error);
      setLoading(false);
      alert('Error updating user');
    }
  };

  return (
    <div className="update-container" style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '20px' }}>
      <h2>UPDATE USER</h2>
      {selectedUserId ? (
        <form onSubmit={handleUpdate}>
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
              {loading ? 'Updating...' : 'UPDATE'}
            </button>
            <button 
              type="button" 
              onClick={() => setSelectedUserId(null)}
              style={{ backgroundColor: '#f44336', color: 'white', marginLeft: '5px' }}
            >
              CANCEL
            </button>
          </div>
        </form>
      ) : (
        <table border="1" style={{ width: '100%' }}>
          <thead>
            <tr style={{ backgroundColor: '#2196F3', color: 'white' }}>
              <th>ID</th>
              <th>NAME</th>
              <th>AGE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>
                <button 
  onClick={() => handleSelectUser(user)}
  className="edit-button"
>
  Edit
</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Update;