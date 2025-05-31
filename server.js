"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const host = "127.0.0.1";
const port = 8080;
const startPage = "index.html";

app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/" + startPage, (req, res) => {
    res.sendFile(__dirname + "/" + startPage);
});

// Import db connection
const db = require("./db-connection");

// Load restaurant data
app.get("/loadRestaurantData", (req, res) => {
    const sql = "SELECT * FROM restaurant";
    db.query(sql, (error, result) => {
        if (error) throw error;
        res.json(result);
    });
});

// Register user
app.post("/registerUser", (req, res) => {
    const sql = "INSERT INTO user (username, password) VALUES (?, ?)";
    const parameters = [req.body.username, req.body.password];
    db.query(sql, parameters, (error, result) => {
        if (error) throw error;
        res.json(result);
    });
});

// Login user
// Login user
app.post("/loginUser", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send("Username and password required");
    }

    const sql = "SELECT * FROM user WHERE username = ?";
    db.query(sql, [username], (error, results) => {
        if (error) {
            console.error("Database error:", error);
            return res.status(500).send("Server error");
        }
        
        if (results.length === 0) {
            return res.status(401).send("Invalid username or password");
        }
        
        const user = results[0];
        // In future, use bcrypt.compare(password, user.password)
        if (password === user.password) {
            res.status(200).send("Login successful");
        } else {
            res.status(401).send("Invalid username or password");
        }
    });
});

const server = app.listen(port, host, () => {
    console.log(`Example app listening at http://${host}:${port}`);
});

// to get restaurant names for review page.
app.get('/getRestaurants', function(request, response) {  
    const sql = 'SELECT _id, name FROM restaurant_review.restaurant';  
    
    db.query(sql, function(error, results) {  
        if (error) {  
            console.error('Error fetching restaurants:', error.message);  
            return response.status(500).send('Internal Server Error');  
        }  
        response.json(results);  
    });  
});

// Route to submit a review
app.post('/submitReview', (req, res) => {
    const { restaurantId, username, review, rating, datePosted } = req.body;
    const query = 'INSERT INTO review (restaurantId, username, review, rating, datePosted) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [restaurantId, username, review, rating, datePosted], (err, results) => {
        if (err) {
            console.error('Error inserting review:', err);
            res.json({ success: false });
        } else {
            res.json({ success: true });
        }
    });
});