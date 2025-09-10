const express = require("express");
const router = express.Router();
const {
  getAllQuestionDifficultiesEndpoint,
  getQuestionDifficultyByIdEndpoint,
  updateQuestionDifficultyEndpoint,
} = require("../controllers/questionDifficultyController");
const {
  validateQuestionDifficultyRequest,
} = require("../middlewares/questionDifficultyRules");
const { authorize } = require("../middlewares/authorizationRules");

router.get("/", authorize, getAllQuestionDifficultiesEndpoint);
router.get("/:id", authorize, getQuestionDifficultyByIdEndpoint);
router.post("/", (req, res) => {
  res.status(501).json({ message: "Not implemented" });
});
router.put(
  "/:id",
  authorize,
  validateQuestionDifficultyRequest,
  updateQuestionDifficultyEndpoint
);
router.delete("/:id", (req, res) => {
  res.status(501).json({ message: "Not implemented" });
});

module.exports = router;
