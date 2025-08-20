const validateQuestionRequest = (req, res, next) => {
  const {
    question,
    correctAnswer,
    wrongAnswer1,
    wrongAnswer2,
    wrongAnswer3,
    categoryId,
    questionDifficultyId,
  } = req.body;

  if (!question) {
    return res.status(400).json({
      status: 400,
      error: "Missing required parameter: 'question'",
    });
  }
  if (!correctAnswer) {
    return res.status(400).json({
      status: 400,
      error: "Missing required parameter: 'correctAnswer'",
    });
  }
  if (!wrongAnswer1) {
    return res.status(400).json({
      status: 400,
      error: "Missing required parameter: 'wrongAnswer1'",
    });
  }
  if (!wrongAnswer2) {
    return res.status(400).json({
      status: 400,
      error: "Missing required parameter: 'wrongAnswer2'",
    });
  }
  if (!wrongAnswer3) {
    return res.status(400).json({
      status: 400,
      error: "Missing required parameter: 'wrongAnswer3'",
    });
  }
  if (!categoryId) {
    return res.status(400).json({
      status: 400,
      error: "Missing required parameter: 'categoryId'",
    });
  }
  if (!questionDifficultyId) {
    return res.status(400).json({
      status: 400,
      error: "Missing required parameter: 'questionDifficultyId'",
    });
  }

  next();
};

module.exports = {
  validateQuestionRequest,
};
