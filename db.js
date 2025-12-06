const sqlite = require('sqlite3');
const db = new sqlite.Database('UniTrack.db');

const CreateTripTable = `CREATE TABLE IF NOT EXISTS Request (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    location TEXT NOT NULL,
    category TEXT NOT NULL,
    priority TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    technician_id INTEGER DEFAULT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (technician_id) REFERENCES User(id)  

)`;

const CreateUserTable = `CREATE TABLE IF NOT EXISTS User (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'user'
)`;

module.exports = { 
    db, 
    CreateRequestTable,
    CreateUserTable
};
