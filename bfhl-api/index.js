const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Add this line

const app = express();
app.use(cors()); // Add this line to enable CORS
app.use(bodyParser.json());

const USER_ID = "john_doe_17091999"; // Replace with your full_name_ddmmyyyy
const EMAIL = "john@xyz.com"; // Replace with your college email
const ROLL_NUMBER = "ABCD123"; // Replace with your college roll number

// Root Route (Optional)
app.get('/', (req, res) => {
    res.send('Welcome to the BFHL API');
});

// POST Method Endpoint
app.post('/bfhl', (req, res) => {
    const data = req.body.data;
    console.log('Received data:', data); // Debug log

    if (!Array.isArray(data)) {
        return res.status(400).json({
            "is_success": false,
            "message": "Invalid input format"
        });
    }

    const numbers = [];
    const alphabets = [];
    let highestLowercaseAlphabet = '';

    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (/^[a-zA-Z]$/.test(item)) {
            alphabets.push(item);
            if (/[a-z]/.test(item) && item > highestLowercaseAlphabet) {
                highestLowercaseAlphabet = item;
            }
        }
    });

    res.json({
        "is_success": true,
        "user_id": USER_ID,
        "email": EMAIL,
        "roll_number": ROLL_NUMBER,
        "numbers": numbers,
        "alphabets": alphabets,
        "highest_lowercase_alphabet": highestLowercaseAlphabet ? [highestLowercaseAlphabet] : []
    });
});

// GET Method Endpoint
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        "operation_code": 1
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
