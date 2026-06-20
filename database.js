const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('clinic.db');


const dbPath = path.join(__dirname, 'clinic.db');
const db = new Database(dbPath);

// إعداد الجداول
db.exec(`
  CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    service TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    status TEXT DEFAULT 'جديد',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS xray_reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    original_name TEXT,
    report TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

module.exports = db;