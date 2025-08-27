const express = require("express");
const router = express.Router();
const {
  getAllQuestionsEndpoint,
  getQuestionByIdEndpoint,
  createQuestionEndpoint,
  deleteQuestionEndpoint,
  updateQuestionEndpoint,
  insertQuizResultsEndpoint,
  getSrbQuestionsEndpoint,
  getEngQuestionsEndpoint,
} = require("../controllers/questionController");
const { validateQuestionRequest } = require("../middlewares/questionRules");
const { authorize } = require("../middlewares/authorizationRules");

router.get("/", authorize, getAllQuestionsEndpoint);
router.get("/srb", authorize, getSrbQuestionsEndpoint);
router.get("/eng", authorize, getEngQuestionsEndpoint);
router.get("/:id", authorize, getQuestionByIdEndpoint);
router.post("/", authorize, validateQuestionRequest, createQuestionEndpoint);
router.put("/:id", authorize, validateQuestionRequest, updateQuestionEndpoint);
router.delete("/:id", authorize, deleteQuestionEndpoint);
router.post("/quizResults", authorize, insertQuizResultsEndpoint);

module.exports = router;
