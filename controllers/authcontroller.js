const { db } = require('../models/db.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signToken = (userId, role) => {
    return jwt.sign({  userId, role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
      
}

const signup = (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role || 'user'; //user(student, staff), admin, technician

    if (!name || !email || !password) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Error hashing password" });
        }

    const query = `INSERT INTO User (name, email, password, role) VALUES ( ?, ? , ? , ?')`;
    const params = [name, email, hashedPassword, role];

    
    db.run(query, params, function(err) {
        if (err) {
            console.log(err);
            if (err.message.includes("UNIQUE constraint failed")) {
                return res.status(400).json({ error: "Email already exists" });
            }
            return res.status(500).json({ error: "Error creating user" });
        }

        res.cookie('SignedUp', `Trip ID ${this.lastID}`, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000 // 15 minutes
    });
        return res.status(201).json({ message: "User created successfully" });
        });
    });
};

const login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const query = `SELECT * FROM User WHERE email = ?`;
    const params =[email];


    db.get(query, params, (err, row) => {
        
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Error retrieving user" });
        }
        if (!row) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        bcrypt.compare(password, row.password, (err, result) => {
           
            if (err) {
                console.log(err);
                return res.status(500).json({ error: "Error comparing passwords" });
            }
            if (!result) {
                return res.status(400).json({ error: "Invalid email or password" });
            }

            const token = signToken(row.id, row.role);

            res.cookie('LoggedIn', `Trip ID ${id}`, {
                httpOnly: true,
                maxAge: 15 * 60 * 1000 // 15 minutes
        });
          
            return res.status(200).json({
                message: "Login successful",
                data: {id: row.id, name: row.name, email: row.email, role: row.role},token,
            });
        });
    });
};

module.exports = { signup, login }; 

    
    


        