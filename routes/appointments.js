
const express = require('express');
const router = express.Router();
const db = require('../database');
const adminAuth = require('../middleware/auth');

// إنشاء حجز (عام - من الموقع)
router.post('/', (req, res) => {
  const { patient_name, phone, service, date, time } = req.body;
  if (!patient_name || !phone || !service || !date || !time) {
    return res.status(400).json({ error: 'جميع الحقول مطلوبة' });
  }

  const stmt = db.prepare(
    'INSERT INTO appointments (patient_name, phone, service, date, time) VALUES (?, ?, ?, ?, ?)'
  );
  const result = stmt.run(patient_name, phone, service, date, time);
  res.json({ id: result.lastInsertRowid, message: 'تم تسجيل الحجز بنجاح' });
});

// عرض جميع الحجوزات (للآدمن فقط)
router.get('/', adminAuth, (req, res) => {
  const stmt = db.prepare('SELECT * FROM appointments ORDER BY date DESC, time DESC');
  const rows = stmt.all();
  res.json(rows);
});

// تحديث حجز – يدعم تعديل أي حقل أو مجموعة حقول
router.patch('/:id', adminAuth, (req, res) => {
  const { patient_name, phone, service, date, time, status } = req.body;
  const updates = [];
  const values = [];

  if (patient_name !== undefined) {
    const trimmedName = patient_name.trim();
    if (trimmedName === '') return res.status(400).json({ error: 'الاسم لا يمكن أن يكون فارغاً' });
    updates.push('patient_name = ?');
    values.push(trimmedName);
  }

  if (phone !== undefined) {
    const trimmedPhone = phone.trim();
    if (trimmedPhone === '') return res.status(400).json({ error: 'رقم الهاتف لا يمكن أن يكون فارغاً' });
    updates.push('phone = ?');
    values.push(trimmedPhone);
  }

  if (service !== undefined) {
    updates.push('service = ?');
    values.push(service);
  }

  if (date !== undefined) {
    updates.push('date = ?');
    values.push(date);
  }

  if (time !== undefined) {
    updates.push('time = ?');
    values.push(time);
  }

  if (status !== undefined) {
    const allowedStatuses = ['جديد', 'مؤكد', 'ملغي'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ error: 'حالة غير صالحة' });
    }
    updates.push('status = ?');
    values.push(status);
  }

  if (updates.length === 0) {
    return res.status(400).json({ error: 'لا توجد حقول للتحديث' });
  }

  values.push(req.params.id);
  const stmt = db.prepare(`UPDATE appointments SET ${updates.join(', ')} WHERE id = ?`);
  stmt.run(...values);
  res.json({ success: true, message: 'تم التحديث بنجاح' });
});

// حذف حجز
router.delete('/:id', adminAuth, (req, res) => {
  const stmt = db.prepare('DELETE FROM appointments WHERE id = ?');
  stmt.run(req.params.id);
  res.json({ success: true });
});

module.exports = router;