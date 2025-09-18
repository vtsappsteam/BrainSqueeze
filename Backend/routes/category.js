const express = require("express");
const router = express.Router();
const {
  getAllCategoriesEndpoint,
  getAllCategoriesWithDifficultiesEndpoint,
  getCategoryByIdEndpoint,
  createCategoryEndpoint,
  updateCategoryEndpoint,
  deleteCategoryEndpoint,
} = require("../controllers/categoryController");
const { validateCategoryRequest } = require("../middlewares/categoryRules");
const { authorize } = require("../middlewares/authorizationRules");

router.get("/", authorize, getAllCategoriesEndpoint);
router.get(
  "/withDifficulties",
  authorize,
  getAllCategoriesWithDifficultiesEndpoint
);
router.get("/:id", authorize, getCategoryByIdEndpoint);
router.post("/", authorize, validateCategoryRequest, createCategoryEndpoint);
router.put("/:id", authorize, validateCategoryRequest, updateCategoryEndpoint);
router.delete("/:id", authorize, deleteCategoryEndpoint);

module.exports = router;
