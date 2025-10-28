// server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // parse JSON body

// 1) open (or create) database file
const dbPath = path.join(__dirname, 'trips.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Could not open database', err);
    process.exit(1);
  }
  console.log('Connected to SQLite database:', dbPath);
});

// 2) create TRIP table if not exists
const createTableSql = `
CREATE TABLE IF NOT EXISTS TRIP (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  destinationName TEXT NOT NULL,
  location TEXT,
  continent TEXT,
  duration INTEGER,
  price REAL,
  startDate TEXT,
  endDate TEXT,
  transport TEXT,
  description TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
`;
db.run(createTableSql, (err) => {
  if (err) console.error('Error creating TRIP table', err);
  else console.log('TRIP table ready');
});

// Helper: run queries in serialized order when needed
db.serialize();

// ----------------- ROUTES -----------------

// Create (Insert) - POST /trips
app.post('/trips', (req, res) => {
  const {
    destinationName,
    location,
    continent,
    duration,
    price,
    startDate,
    endDate,
    transport,
    description
  } = req.body;

  // Simple validation
  if (!destinationName) {
    return res.status(400).json({ error: 'destinationName is required' });
  }

  const sql = `INSERT INTO TRIP
    (destinationName, location, continent, duration, price, startDate, endDate, transport, description)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const params = [
    destinationName,
    location || null,
    continent || null,
    duration || null,
    price || null,
    startDate || null,
    endDate || null,
    transport || null,
    description || null
  ];

  db.run(sql, params, function (err) {
    if (err) {
      console.error('Insert error', err);
      return res.status(500).json({ error: 'Database insert failed' });
    }
    // `this.lastID` is the inserted row ID
    res.status(201).json({ message: 'Trip created', id: this.lastID });
  });
});

// Retrieve ALL - GET /trips
app.get('/trips', (req, res) => {
  const sql = `SELECT * FROM TRIP ORDER BY id DESC`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Select all error', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rows);
  });
});

// Retrieve ONE - GET /trips/:id
app.get('/trips/:id', (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM TRIP WHERE id = ?`;
  db.get(sql, [id], (err, row) => {
    if (err) {
      console.error('Select one error', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (!row) return res.status(404).json({ error: 'Trip not found' });
    res.json(row);
  });
});

// Update - PUT /trips/:id
app.put('/trips/:id', (req, res) => {
  const id = req.params.id;
  const {
    destinationName,
    location,
    continent,
    duration,
    price,
    startDate,
    endDate,
    transport,
    description
  } = req.body;

  const sql = `UPDATE TRIP SET
    destinationName = ?, location = ?, continent = ?, duration = ?, price = ?, startDate = ?, endDate = ?, transport = ?, description = ?
    WHERE id = ?`;

  const params = [
    destinationName,
    location,
    continent,
    duration,
    price,
    startDate,
    endDate,
    transport,
    description,
    id
  ];

  db.run(sql, params, function (err) {
    if (err) {
      console.error('Update error', err);
      return res.status(500).json({ error: 'Database update failed' });
    }
    if (this.changes === 0) return res.status(404).json({ error: 'Trip not found' });
    res.json({ message: 'Trip updated' });
  });
});

// Delete - DELETE /trips/:id
app.delete('/trips/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM TRIP WHERE id = ?`;
  db.run(sql, [id], function (err) {
    if (err) {
      console.error('Delete error', err);
      return res.status(500).json({ error: 'Database delete failed' });
    }
    if (this.changes === 0) return res.status(404).json({ error: 'Trip not found' });
    res.json({ message: 'Trip deleted' });
  });
});

// Graceful shutdown - close DB when process ends
process.on('SIGINT', () => {
  console.log('\nShutting down...');
  db.close((err) => {
    if (err) return console.error('Error closing DB', err);
    console.log('Database closed');
    process.exit(0);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
