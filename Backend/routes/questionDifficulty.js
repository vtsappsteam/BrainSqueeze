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
const { authorize } = require("../middlewares/authorizationRules");

router.get("/", authorize, getAllQuestionDifficultiesEndpoint);
router.get("/:id", authorize, getQuestionDifficultyByIdEndpoint);
router.post(
  "/",
  authorize,
  validateQuestionDifficultyRequest,
  createQuestionDifficultyEndpoint
);
router.put(
  "/:id",
  authorize,
  validateQuestionDifficultyRequest,
  updateQuestionDifficultyEndpoint
);
router.delete("/:id", authorize, deleteQuestionDifficultyEndpoint);

module.exports = router;
