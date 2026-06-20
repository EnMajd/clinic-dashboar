module.exports = function adminAuth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (token === process.env.ADMIN_TOKEN) {
    next();
  } else {
    res.status(401).json({ error: 'غير مصرح' });
  }
};