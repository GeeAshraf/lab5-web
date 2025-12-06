const { db } = require("../models/db.js");

const RetrieveAllRequests = (req, res) => {
    const query = "SELECT * FROM Requests";
    const params = [];

    res.cookie('RequestRetrieved', `AllRequests`, {
        httpOnly: true,
        sameSite: 'Strict',
        secure: false,
        maxAge: 15 * 60 * 1000 // 15 minutes
    });

    db.all(query, params, (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: "Error Retrieving requests" });
        }
        return res.status(200).json({
            message: "requests retrieved successfully",
            data: rows,
            });
        });
    };

const RetrieveRequestById = (req, res) => {
    const id = Number(req.params.id);
    const query = `SELECT * FROM Request WHERE id = ?`;
    const params = [id];

    
    res.cookie('RequestRetrieved', `Request ID ${id}`, {
        httpOnly: true,
        sameSite: 'Strict',
        secure: false,
        maxAge: 15 * 60 * 1000 // 15 minutes
    });

    db.get(query, params, (err, row) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: "Error Retrieving Request" });
        }
        if (!row) {
            return res.status(404).json({ error: "Request not found" });
        }
        
        return res.status(200).json({
            message: "Request retrieved successfully",
            data: row,
            });
        });
    };

const CreateRequest = (req,res) => {
    const{tilte, location, category, language, priority, description} = req.body;

    if(!title || !location || !category || !priority || !description) {
        return res.status(400).json({
            message: 'Missing required fields: title, location, category, priority, description',
        });
    }
    
    const query = `INSERT INTO Request (title, location, category, ,priority, description, status)

    VALUES (?, ?, ?, ?, ?, 'pending)`;

    const params = [title, location, category, language, priority, description];

    res.cookie('RequestCreated', `Request ID ${this.lastID}`, {
        httpOnly: true,
        sameSite: 'Strict',
        secure: false,
        maxAge: 15 * 60 * 1000 // 15 minutes
    });

    db.run(query, params, function(err){
        if(err){
            console.log(err);
            return res.status(500).json({
                message: "Error creating request",
                error: err.message
            });   
        }
        return res.status(201).json({
            message: "request created successfully",
        });
    });
};        


const DeleteRequestById = (req,res) => {
    const id = Number(req.params.id);
    const query = `DELETE FROM Request WHERE id = ?`;
    const params = id;

    res.cookie('RequestDeleted', `Request ID ${id}`, {
        httpOnly: true,
        sameSite: 'Strict',
        secure: false,
        maxAge: 15 * 60 * 1000 // 15 minutes
    });

    db.run(query, params, function(err){
        if(err){
            console.log(err);
            return  res.status(500).json({
                message: "Error deleting Request",
                error: err.message
            });   
        }
        if(this.changes === 0){
            return res.status(404).json({
                message: `Request not found`
            });
        }
        res.status(200).json({
            status: 'success',
            message: `Request with id ${id} deleted successfully`
        });
    });
};

const UpdateRequestById = (req,res) => {
    const id = Number(req.params.id);
    const{title, location, category, priority, description, status}=req.body;

    const query = `UPDATE Request SET 
    title= ? , location= ? , category= ? , priority= ? , 
    description= ? , status= ? , WHERE id = ? `;

    const params = [title, location, category, priority, description, status,id];

    res.cookie('RequestDeleted', `Request ID ${id}`, {
        httpOnly: true,
        sameSite: 'Strict',
        secure: false,
        maxAge: 15 * 60 * 1000 // 15 minutes
    });
    
    db.run(query, params, function(err){
        if(err){
            console.log(err);
            return res.status(500).json({
                message: "Error updating Request",
                error: err.message
            });   
        }if(this.changes === 0){
            return res.status(404).json({
                message: `Request not found`
            });
        }res.status(200).json({
            status: 'success',
            message: `Request with id ${id} updated successfully`
        });
    });
}


module.exports = {RetrieveAllRequests, CreateRequest, DeleteRequestByID, UpdateRequestById, RetrieveRequestById};
