const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;

const authorize = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.sendStatus(401);
    req.user = user;
    next();
  });
};

const validateLoginRequest = (req, res, next) => {
  if (!req.body.email) {
    return res.status(400).json({ error: "Email is required" });
  }
  if (!req.body.password) {
    return res.status(400).json({ error: "Password is required" });
  }
  next();
};

module.exports = { authorize, validateLoginRequest };
