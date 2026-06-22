const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// تحديد مسار قاعدة البيانات
const dbPath = path.join(__dirname, 'clinic.db');

// إنشاء اتصال بقاعدة البيانات
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to SQLite database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// إنشاء جدول المواعيد إذا لم يكن موجودًا
db.run(`
  CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    service TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);

module.exports = db;
