const express = require('express');
const mongoose = require('mongoose');
const mongoDB = require("./db");

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
mongoDB();

// Middleware to allow CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://food-taupe-zeta.vercel.app");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));

// Default route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
