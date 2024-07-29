const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');  // Add this line
const app = express();
const PORT = 3000;
const SECRET_KEY = 'your_secret_key';
app.use(express.json());
app.use(cors());  // Add this line
let users = [];
let books = [
    { id: 1, title: "1984", author: "George Orwell" },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
    { id: 3, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { id: 4, title: "Moby Dick", author: "Herman Melville" },
    { id: 5, title: "War and Peace", author: "Leo Tolstoy" },
    { id: 6, title: "Pride and Prejudice", author: "Jane Austen" },
    { id: 7, title: "The Catcher in the Rye", author: "J.D. Salinger" },
    { id: 8, title: "The Lord of the Rings", author: "J.R.R. Tolkien" },
    { id: 9, title: "Animal Farm", author: "George Orwell" },
    { id: 10, title: "Ulysses", author: "James Joyce" },
    { id: 11, title: "The Odyssey", author: "Homer" },
    { id: 12, title: "Brave New World", author: "Aldous Huxley" },
    { id: 13, title: "The Divine Comedy", author: "Dante Alighieri" }
];
let shuffledBooks = [...books];
// Function to shuffle the books array
const shuffleBooks = () => {
    for (let i = shuffledBooks.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledBooks[i], shuffledBooks[j]] = [shuffledBooks[j], shuffledBooks[i]];
    }
};
// Shuffle books every 5 seconds
setInterval(() => {
    shuffleBooks();
    console.log('Books shuffled');
}, 5000);
// Register a new user
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully' });
});
// Login a user
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.sendStatus(401);
    }
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
};
app.get('/books', authenticateToken, (req, res) => {
    // Introduce a delay of 2 seconds before responding
    setTimeout(() => {
        res.json(shuffledBooks);
    }, 2000);
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    shuffleBooks(); // Initial shuffle
});