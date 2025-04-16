const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Path to data.json
const dataPath = path.join(__dirname, 'data.json');

// Helper function to read data
const readData = () => {
  const data = fs.readFileSync(dataPath, 'utf8');
  return JSON.parse(data);
};

// Helper function to write data
const writeData = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
};

// Create
app.post('/api/users', (req, res) => {
  try {
    const data = readData();
    const newUser = {
      id: data.users.length > 0 ? Math.max(...data.users.map(user => user.id)) + 1 : 1,
      name: req.body.name,
      age: parseInt(req.body.age)
    };
    
    data.users.push(newUser);
    writeData(data);
    
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Read
app.get('/api/users', (req, res) => {
  try {
    const data = readData();
    res.json(data.users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update
app.put('/api/users/:id', (req, res) => {
  try {
    const data = readData();
    const id = parseInt(req.params.id);
    const index = data.users.findIndex(user => user.id === id);
    
    if (index === -1) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    data.users[index] = {
      id: id,
      name: req.body.name,
      age: parseInt(req.body.age)
    };
    
    writeData(data);
    res.json(data.users[index]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete
app.delete('/api/users/:id', (req, res) => {
  try {
    const data = readData();
    const id = parseInt(req.params.id);
    const index = data.users.findIndex(user => user.id === id);
    
    if (index === -1) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    data.users.splice(index, 1);
    writeData(data);
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});