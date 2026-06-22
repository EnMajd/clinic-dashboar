
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const pool = require('./database');
const PORT = process.env.PORT || 3000;
pool.query(`
  CREATE TABLE IF NOT EXISTS appointments (
    id SERIAL PRIMARY KEY,
    patient_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    service TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);


// وسائط
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // يخدم الموقع الأمامي

// إنشاء مجلد uploads إذا لم يوجد
const fs = require('fs');
if (!fs.existsSync('./uploads')) fs.mkdirSync('./uploads');

// المسارات
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/ai', require('./routes/ai'));

// حماية صفحة admin.html
app.get('/admin.html', (req, res, next) => {
  // سيتم إرسال الملف فقط إذا كان الطلب يحتوي على ترويسة المصادقة
  // لكننا نفضل التعامل مع ذلك في الـ frontend
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.listen(PORT, () => {
  console.log(`✅ السيرفر يعمل على http://localhost:${PORT}`);
  console.log(`🔗 لوحة التحكم: http://localhost:${PORT}/admin.html`);
});
// update to trigger deploy

app.post('/api/check-password', (req, res) => {
    const { password } = req.body;

    if (password === process.env.ADMIN_PASSWORD) {
        return res.json({ success: true });
    }

    res.json({ success: false });
});
