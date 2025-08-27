const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  getUserPasswordByEmail,
  changePassword,
  saveRefreshToken,
  getUserById,
} = require("../services/userService");

const SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, SECRET, {
    expiresIn: "1d",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

const loginEndpoint = async (req, res) => {
  const { email, password } = req.body;
  const user = await getUserPasswordByEmail(email);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: "Invalid credentials" });

  if (user.password_change_needed) {
    return res
      .status(403)
      .json({ error: "Password must be changed before continuing" });
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  const firstName = user.first_name;
  const lastName = user.last_name;
  const refreshTokenHash = await bcrypt.hash(refreshToken, 10);
  try {
    await saveRefreshToken(user.id, refreshTokenHash);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error while updating User!" });
  }

  res.status(200).json({
    accessToken,
    refreshToken,
    firstName,
    lastName,
    message: "Login successful",
  });
};

const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.sendStatus(401);

  const user = await getUserById(req.user.id);
  if (!user) return res.status(403).json({ error: "User not found" });

  const isValid = await bcrypt.compare(refreshToken, user.refresh_token);
  if (!isValid) return res.sendStatus(403);
  jwt.verify(refreshToken, REFRESH_SECRET, (err) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken(user);
    res.json({ accessToken });
  });
};

const logoutEndpoint = async (req, res) => {
  const user = await getUserById(req.user.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  try {
    await saveRefreshToken(user.id, null);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error while logging out!" });
  }

  res.status(200).json({ message: "Logged out successfully" });
};

const registerEndpoint = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  const user = await getUserPasswordByEmail(email);
  if (!user) return res.status(400).send("User not found");

  const match = await bcrypt.compare(oldPassword, user.password);
  if (!match) return res.status(400).json({ message: "Invalid old password" });

  if (oldPassword === newPassword) {
    return res.status(400).json({
      message: "New password must be different from the old password",
    });
  }

  const passwordHash = await bcrypt.hash(newPassword, 10);
  await changePassword(user.id, passwordHash);

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  const userId = user.id;
  const firstName = user.first_name;
  const lastName = user.last_name;
  const refreshTokenHash = await bcrypt.hash(refreshToken, 10);
  try {
    await saveRefreshToken(user.id, refreshTokenHash);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error while registering User!" });
  }

  res.status(200).json({
    accessToken,
    refreshToken,
    userId,
    firstName,
    lastName,
    message: "User registered successfully",
  });
};

const changePasswordEndpoint = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  const user = await getUserPasswordByEmail(email);
  if (!user) return res.status(400).send("User not found");

  const match = await bcrypt.compare(oldPassword, user.password);
  if (!match) return res.status(400).json({ message: "Invalid old password" });

  if (oldPassword === newPassword) {
    return res.status(400).json({
      message: "New password must be different from the old password",
    });
  }

  const passwordHash = await bcrypt.hash(newPassword, 10);
  await changePassword(user.id, passwordHash);

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  const refreshTokenHash = await bcrypt.hash(refreshToken, 10);
  try {
    await saveRefreshToken(user.id, refreshTokenHash);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error while updating User!" });
  }

  res.status(200).json({
    accessToken,
    refreshToken,
    message: "Password changed successfully",
  });
};

module.exports = {
  loginEndpoint,
  logoutEndpoint,
  refreshToken,
  registerEndpoint,
  changePasswordEndpoint,
};
