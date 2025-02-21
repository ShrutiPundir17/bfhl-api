const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const userDetails = {
    user_id: "john_doe_17091999",
    email: "john@xyz.com",
    roll_number: "ABCD123"
};

app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
        return res.status(400).json({ is_success: false, message: "Invalid input" });
    }

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => /^[A-Za-z]$/.test(item));
    const highestAlphabet = alphabets.length > 0 ? [alphabets.reduce((a, b) => a > b ? a : b)] : [];

    res.json({
        is_success: true,
        user_id: userDetails.user_id,
        email: userDetails.email,
        roll_number: userDetails.roll_number,
        numbers: numbers,
        alphabets: alphabets,
        highest_alphabet: highestAlphabet,
        data: data
    });
});

app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});