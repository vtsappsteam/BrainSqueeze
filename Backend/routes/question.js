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
  exportQuestionsEndpoint,
  importQuestionsEndpoint,
  exportRawEndpoint,
} = require("../controllers/questionController");
const { validateQuestionRequest } = require("../middlewares/questionRules");
const { authorize } = require("../middlewares/authorizationRules");
const { upload } = require("../helpers/excelHelper");

router.get("/", authorize, getAllQuestionsEndpoint);
router.get("/srb", authorize, getSrbQuestionsEndpoint);
router.get("/eng", authorize, getEngQuestionsEndpoint);
router.get("/export", authorize, exportQuestionsEndpoint);
router.get("/exportRaw", authorize, exportRawEndpoint);

router.post(
  "/import",
  authorize,
  upload.single("file"),
  importQuestionsEndpoint
);
router.get("/:id", authorize, getQuestionByIdEndpoint);
router.post("/", authorize, validateQuestionRequest, createQuestionEndpoint);
router.put("/:id", authorize, validateQuestionRequest, updateQuestionEndpoint);
router.delete("/:id", authorize, deleteQuestionEndpoint);
router.post("/quizResults", authorize, insertQuizResultsEndpoint);

module.exports = router;
