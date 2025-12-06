const {app} = require('./index');
const PORT = 5000;
const db_access = require('./models/db.js');
const db = db_access.db;

db.serialize(() => {
    db.run(db_access.CreateRequestTable, (err) => {
        if (err) console.log("Error creating Request table:", err.message);
    });
       db.run(db_access.CreateUserTable, (err) => {
        if (err) console.log("Error creating User table:", err.message);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 

