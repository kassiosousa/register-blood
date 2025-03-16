const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./src/db/blood.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('🗄️ Conectado ao banco SQLite.');
        db.run(`CREATE TABLE IF NOT EXISTS blood_records (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            value FLOAT NOT NULL,
            date TEXT NOT NULL
        )`);
    }
});

module.exports = db;
