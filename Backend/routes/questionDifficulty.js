const express = require("express");
const router = express.Router();
const {
  getAllQuestionDifficultiesEndpoint,
  getQuestionDifficultyByIdEndpoint,
  createQuestionDifficultyEndpoint,
  updateQuestionDifficultyEndpoint,
  deleteQuestionDifficultyEndpoint,
} = require("../controllers/questionDifficultyController");
const {
  validateQuestionDifficultyRequest,
} = require("../middlewares/questionDifficultyRules");

router.get("/", getAllQuestionDifficultiesEndpoint);
router.get("/:id", getQuestionDifficultyByIdEndpoint);
router.post(
  "/",
  validateQuestionDifficultyRequest,
  createQuestionDifficultyEndpoint
);
router.put(
  "/:id",
  validateQuestionDifficultyRequest,
  updateQuestionDifficultyEndpoint
);
router.delete("/:id", deleteQuestionDifficultyEndpoint);

module.exports = router;
