const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
const cors = require("cors");
const axios = require("axios"); // ✅ Import Axios for API calls

const app = express();
app.use(express.json());
app.use(cors());

// Database Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "oracle",
    database: "resume_checker"
});

db.connect((err) => {
    if (err) {
        console.error("❌ Database Connection Error:", err);
    } else {
        console.log("✅ MySQL Connected...");
    }
});

// Login Route
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM users1 WHERE email = ?", [email], async (err, result) => {
        if (err) {
            console.error("❌ Database Error:", err);
            return res.status(500).json({ message: "Server error" });
        }

        if (result.length === 0) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const user = result[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
            { userId: user.id },
            "1055b4e6cba11c94e3580b1c6c149f11f411eeb14761760dbb222aa2466e000e003f3c7c54dce1dc5666498f52fab1dc26393a05a8369595d1f982d0e61486c0",
            { expiresIn: "1h" }
        );

        res.json({ message: "Login successful", token });
    });
});

// 🔹 **New Route: Forward ATS Score Request to Flask**
app.post("/api/ats-score", async (req, res) => {
    try {
        // Forward the request to the Flask server
        const flaskResponse = await axios.post("http://localhost:5000/api/ats-score", req.body);
        res.json(flaskResponse.data); // Send response back to frontend
    } catch (error) {
        console.error("❌ Error calling Flask API:", error.message);
        res.status(500).json({ error: "Failed to calculate ATS score" });
    }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
