
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the 'client' directory
app.use(express.static(path.join(__dirname, '../client')));

const dbPath = path.join(__dirname, 'db.json');
let db; // In-memory database cache

// Initialize the database
try {
    const data = fs.readFileSync(dbPath, 'utf8');
    db = JSON.parse(data);
} catch (error) {
    console.error("Error reading from database:", error);
    // If the file doesn't exist or is corrupt, start with an empty user list
    db = { users: [] };
}

// Function to write to the database asynchronously
const writeDB = (data) => {
    fs.writeFile(dbPath, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error("Error writing to database:", err);
        }
    });
};

// Signup endpoint
app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const existingUser = db.users.find(user => user.email === email);

        if (existingUser) {
            return res.status(409).json({ message: 'User with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            id: db.users.length + 1,
            email,
            password: hashedPassword
        };

        db.users.push(newUser);
        writeDB(db);

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = db.users.find(u => u.email === email);

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
