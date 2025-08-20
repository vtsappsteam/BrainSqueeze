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

router.get("/", getAllCategoriesEndpoint);
router.get("/withDifficulties", getAllCategoriesWithDifficultiesEndpoint);
router.get("/:id", getCategoryByIdEndpoint);
router.post("/", validateCategoryRequest, createCategoryEndpoint);
router.put("/:id", validateCategoryRequest, updateCategoryEndpoint);
router.delete("/:id", deleteCategoryEndpoint);

module.exports = router;
