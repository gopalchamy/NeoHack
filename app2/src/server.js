const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

// In-memory data for testing purposes (replace with a database in a real application)
let users = [
    { id: 1, password: 'password1', projectName: 'Project A', certificates: [] },
    { id: 2, password: 'password2', projectName: 'Project B', certificates: [] }
];

// Route to handle user login
app.post('/login', (req, res) => {
    const { employeeId, password } = req.body;
    const user = users.find(u => u.id == employeeId && u.password === password);

    if (user) {
        res.json({ success: true, projectName: user.projectName });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// Route to handle certificate upload
app.post('/upload-certificate', (req, res) => {
    const { employeeId, certificate } = req.body;
    const user = users.find(u => u.id == employeeId);

    if (user) {
        user.certificates.push(certificate);
        res.json({ success: true, message: 'Certificate uploaded successfully' });
    } else {
        res.status(404).json({ success: false, message: 'User not found' });
    }
});

// Test route to check if server is running
app.get('/test', (req, res) => {
    res.send('Server is working!');
});

// Serve index1.html for the root path ('/')
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index1.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
