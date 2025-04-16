import axios from 'axios';
import { useEffect, useState } from 'react';

function Delete({ onUserDeleted }) {
  const [users, setUsers] = useState([]);
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

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        setLoading(true);
        await axios.delete(`http://localhost:5000/api/users/${id}`);
        setLoading(false);
        alert('User deleted successfully');
        fetchUsers();
        if (onUserDeleted) onUserDeleted();
      } catch (error) {
        console.error('Error deleting user:', error);
        setLoading(false);
        alert('Error deleting user');
      }
    }
  };

  return (
    <div className="delete-container" style={{ border: '1px solid #ccc', padding: '15px' }}>
      <h2>DELETE USER</h2>
      <table border="1" style={{ width: '100%' }}>
        <thead>
          <tr style={{ backgroundColor: '#f44336', color: 'white' }}>
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
  onClick={() => handleDelete(user.id)}
  disabled={loading}
  className="delete-button"
>
  {loading ? 'Deleting...' : 'Delete'}
</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Delete;