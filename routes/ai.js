const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../database');

// إعداد Multer لتخزين الصور المرفوعة
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// نقطة النهاية لتحليل الصورة
router.post('/analyze', upload.single('xray'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'الرجاء رفع الصورة' });

  const imageBase64 = fs.readFileSync(req.file.path, { encoding: 'base64' });
  
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.2-11b-vision-preview',
        messages: [{
          role: 'user',
          content: [
            { type: 'text', text: 'أنت طبيب أشعة خبير. حلل صورة الأشعة هذه وقدم تقريراً أولياً باللغة العربية.' },
            { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${imageBase64}` } }
          ]
        }],
        max_tokens: 500
      })
    });

    const data = await response.json();
    const analysis = data.choices?.[0]?.message?.content || 'تعذر التحليل';

    // حفظ التقرير في قاعدة البيانات
    db.prepare('INSERT INTO xray_reports (original_name, report) VALUES (?, ?)')
      .run(req.file.originalname, analysis);

    res.json({ report: analysis });
  } catch (error) {
    res.status(500).json({ error: 'فشل الاتصال بالذكاء الاصطناعي' });
  }
});

module.exports = router;