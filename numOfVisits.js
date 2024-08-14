// Import the required modules
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

// Create an instance of an Express application
const app = express();

// Use the cookie-parser middleware to parse cookies from incoming requests
app.use(cookieParser());

// Route to serve the index.html file for the root URL
app.get('/', (req, res) => {
    // Send the index.html file located in the current directory
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route to track the number of visits using cookies
app.get('/numOfVisits', (req, res) => {
    // Retrieve the visit count from cookies, increment by 1 if it exists, otherwise start at 1
    let visitCount = req.cookies.visitCount ? parseInt(req.cookies.visitCount) + 1 : 1;
    // Retrieve the last visit date from cookies, default to the current date if not present
    let lastVisit = req.cookies.lastVisit ? new Date(req.cookies.lastVisit) : new Date();

    // Set the updated visit count and last visit date as cookies in the response
    res.cookie('visitCount', visitCount);
    res.cookie('lastVisit', new Date());

    // Send a response based on the visit count
    if (visitCount === 1) {
        // Message for first-time visitors
        res.send('Welcome to the live webpage! You are visiting here for the first time!');
    } else {
        // Message for returning visitors with visit count and last visit date
        res.send(`Hi, you have been here ${visitCount} times. Last time of your visit was recorded on: ${lastVisit}`);
    }
});

// Start the server and listen on port 3001
app.listen(3001, () => {
    console.log('Exercise 2 server is running on port 3001');
});
