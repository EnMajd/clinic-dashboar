
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

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
