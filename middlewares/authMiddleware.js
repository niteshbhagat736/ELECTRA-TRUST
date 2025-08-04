const adminEmail = process.env.ADMIN_EMAIL;

exports.verifyAdmin = (req, res, next) => {
  const email = req.headers['x-user-email'];
  if (!email) return res.status(400).json({ error: 'Missing email header' });

  if (email.toLowerCase() === adminEmail.toLowerCase()) {
    return next();
  } else {
    return res.status(403).json({ error: "Unauthorized admin access" });
  }
};

exports.requireAuth = (req, res, next) => {
  const email = req.headers['x-user-email'];
  if (email) {
    req.user = { email }; 
    return next();
  }
  return res.status(401).json({ error: 'Authentication required' });
};
