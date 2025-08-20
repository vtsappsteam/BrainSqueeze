const express = require("express");
const router = express.Router();
const {
  getAllQuestionsEndpoint,
  getQuestionByIdEndpoint,
  createQuestionEndpoint,
  deleteQuestionEndpoint,
  updateQuestionEndpoint,
  insertQuizResultsEndpoint,
} = require("../controllers/questionController");
const { validateQuestionRequest } = require("../middlewares/questionRules");

router.get("/", getAllQuestionsEndpoint);
router.get("/:id", getQuestionByIdEndpoint);
router.post("/", validateQuestionRequest, createQuestionEndpoint);
router.put("/:id", validateQuestionRequest, updateQuestionEndpoint);
router.delete("/:id", deleteQuestionEndpoint);
router.post("/quizResults", insertQuizResultsEndpoint);

module.exports = router;
