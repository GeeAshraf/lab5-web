const { db } = require("../models/db.js");

const RetrieveAllUsers = (req, res) => {
    const query = "SELECT * FROM User";
    const params = [];

    res.cookie('UsersRetreived', `User ID ${id}`, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000 // 15 minutes
    });

    db.all(query, params, (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: "Error Retrieving Users" });
        }
        return res.status(200).json({
            message: "Users retrieved successfully",
            data: rows,
        });
    });
};

const RetrieveUserById = (req, res) => {
    const id = Number(req.params.id);
    const query = `SELECT * FROM User WHERE id = '?'`;
    const params = [id];

    res.cookie('SpecificUserRetreived', `User ID ${id}`, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000 // 15 minutes
    });

    db.get(query, params, (err, row) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: "Error Retrieving User" });
        }
        if (!row) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json({
            message: "User retrieved successfully",
            data: row,
        });
    });
};

const CreateUser = (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({
            message: 'Missing required fields: name, email, password, role',
        });
    }

    const query = `INSERT INTO User (name, email, password, role)
    VALUES (?, ?, ?, ?)`;

    const params = [name, email, password, role];

    res.cookie('UserCreated', `User ID ${id}`, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000 // 15 minutes
    });

    db.run(query, params, function (err) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error creating User",
                error: err.message
            });
        }
        return res.status(201).json({
            message: "User created successfully",
            id: this.lastID
        });
    });
};

const DeleteUserById = (req, res) => {
    const id = Number(req.params.id);
    const query = `DELETE FROM User WHERE id = ?`;
    const params = [id];

    res.cookie('UserDeleted', `User ID ${id}`, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000 // 15 minutes
    });

    db.run(query, params, function (err) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error deleting User",
                error: err.message
            });
        }
        if (this.changes === 0) {
            return res.status(404).json({
                message: `User not found`
            });
        }
        res.status(200).json({
            status: 'success',
            message: `User with id ${id} deleted successfully`
        });
    });
};

const UpdateUserById = (req, res) => {
    const id = Number(req.params.id);
    const { name, email, password, role } = req.body;
    const query = `UPDATE User SET 
    name='?', email='?', password='?', role='?' WHERE id = '?'`;

    const params = [name, email, password, role, id];

    res.cookie('UserUpdated', `User ID ${id}`, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000 // 15 minutes
    });

    db.run(query, params, function (err) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error updating User",
                error: err.message
            });
        }
        if (this.changes === 0) {
            return res.status(404).json({
                message: `User not found`
            });
        }
        res.status(200).json({
            status: 'success',
            message: `User with id ${id} updated successfully`
        });
    });
};

module.exports = { RetrieveAllUsers, CreateUser, DeleteUserById, UpdateUserById, RetrieveUserById };
