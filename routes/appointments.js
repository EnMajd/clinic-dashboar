
const express = require('express');
const router = express.Router();
const pool = require('../database'); // استيراد PostgreSQL
const adminAuth = require('../middleware/auth');

// إنشاء حجز (عام - من الموقع)
router.post('/', async (req, res) => {
  const { patient_name, phone, service, date, time } = req.body;

  if (!patient_name || !phone || !service || !date || !time) {
    return res.status(400).json({ error: 'جميع الحقول مطلوبة' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO appointments (patient_name, phone, service, date, time)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [patient_name, phone, service, date, time]
    );

    res.json({ id: result.rows[0].id, message: 'تم تسجيل الحجز بنجاح' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'خطأ في قاعدة البيانات' });
  }
});

// عرض جميع الحجوزات (للآدمن فقط)
router.get('/', adminAuth, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM appointments ORDER BY date DESC, time DESC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'خطأ في قاعدة البيانات' });
  }
});

// تحديث حجز – يدعم تعديل أي حقل أو مجموعة حقول
router.patch('/:id', adminAuth, async (req, res) => {
  const { patient_name, phone, service, date, time, status } = req.body;

  const updates = [];
  const values = [];
  let index = 1;

  if (patient_name !== undefined) {
    const trimmed = patient_name.trim();
    if (trimmed === '') return res.status(400).json({ error: 'الاسم لا يمكن أن يكون فارغاً' });
    updates.push(`patient_name = $${index++}`);
    values.push(trimmed);
  }

  if (phone !== undefined) {
    const trimmed = phone.trim();
    if (trimmed === '') return res.status(400).json({ error: 'رقم الهاتف لا يمكن أن يكون فارغاً' });
    updates.push(`phone = $${index++}`);
    values.push(trimmed);
  }

  if (service !== undefined) {
    updates.push(`service = $${index++}`);
    values.push(service);
  }

  if (date !== undefined) {
    updates.push(`date = $${index++}`);
    values.push(date);
  }

  if (time !== undefined) {
    updates.push(`time = $${index++}`);
    values.push(time);
  }

  if (status !== undefined) {
    const allowedStatuses = ['جديد', 'مؤكد', 'ملغي'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ error: 'حالة غير صالحة' });
    }
    updates.push(`status = $${index++}`);
    values.push(status);
  }

  if (updates.length === 0) {
    return res.status(400).json({ error: 'لا توجد حقول للتحديث' });
  }

  values.push(req.params.id);

  const query = `
    UPDATE appointments
    SET ${updates.join(', ')}
    WHERE id = $${index}
  `;

  try {
    await pool.query(query, values);
    res.json({ success: true, message: 'تم التحديث بنجاح' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'خطأ في قاعدة البيانات' });
  }
});

// حذف حجز
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    await pool.query('DELETE FROM appointments WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'خطأ في قاعدة البيانات' });
  }
});

module.exports = router;
