const express = require("express");
const router = express.Router();
const {
  getAllUsersEndpoint,
  getUserByIdEndpoint,
  createUserEndpoint,
  updateUserEndpoint,
  deleteUserEndpoint,
} = require("../controllers/usersController");
const {
  validateUserRequest,
  validateUpdateUserRequest,
} = require("../middlewares/userRules");
const { authorize } = require("../middlewares/authorizationRules");

router.get("/", authorize, getAllUsersEndpoint);
router.get("/:id", authorize, getUserByIdEndpoint);
router.post("/", authorize, validateUserRequest, createUserEndpoint);
router.put("/:id", authorize, validateUpdateUserRequest, updateUserEndpoint);
router.delete("/:id", authorize, deleteUserEndpoint);

module.exports = router;
