const sqlite = require('sqlite3');
const db = new sqlite.Database('travel.db');

db.run(`
    CREATE TABLE IF NOT EXISTS TRIP (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        DESTINATIONNAME TEXT,
        LOCATION TEXT
    )
`);

module.exports = db;
