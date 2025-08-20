const express = require("express");
const router = express.Router();
const {
  getAllUsersEndpoint,
  getUserByIdEndpoint,
  createUserEndpoint,
  updateUserEndpoint,
  deleteUserEndpoint,
  //searchUserByFirstNameAndLastName
} = require("../controllers/usersController");
const { validateUserRequest } = require("../middlewares/userRules");

router.get("/", getAllUsersEndpoint);
router.get("/:id", getUserByIdEndpoint);
router.post("/", validateUserRequest, createUserEndpoint);
router.put("/:id", updateUserEndpoint);
router.delete("/:id", deleteUserEndpoint);
//router.get('/search', searchUserByFirstNameAndLastName);

module.exports = router;
