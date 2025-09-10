const express = require("express");
const router = express.Router();
const {
  loginEndpoint,
  logoutEndpoint,
  registerEndpoint,
  refreshToken,
  changePasswordEndpoint,
} = require("../controllers/authorizationController");
const {
  validateLoginRequest,
  authorize,
} = require("../middlewares/authorizationRules");

router.post("/login", validateLoginRequest, loginEndpoint);
router.post("/logout", authorize, logoutEndpoint);
router.post("/register", registerEndpoint);
router.post("/refreshToken", refreshToken);
router.post("/changePassword", authorize, changePasswordEndpoint);

module.exports = router;
