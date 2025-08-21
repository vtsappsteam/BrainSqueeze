const validateQuestionRequest = (req, res, next) => {
  const {
    question,
    correctAnswer,
    wrongAnswer1,
    wrongAnswer2,
    wrongAnswer3,
    engQuestion,
    engCorrectAnswer,
    engWrongAnswer1,
    engWrongAnswer2,
    engWrongAnswer3,
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
  if (!engQuestion) {
    return res.status(400).json({
      status: 400,
      error: "Missing required parameter: 'engQuestion'",
    });
  }
  if (!engCorrectAnswer) {
    return res.status(400).json({
      status: 400,
      error: "Missing required parameter: 'engCorrectAnswer'",
    });
  }
  if (!engWrongAnswer1) {
    return res.status(400).json({
      status: 400,
      error: "Missing required parameter: 'engWrongAnswer1'",
    });
  }
  if (!engWrongAnswer2) {
    return res.status(400).json({
      status: 400,
      error: "Missing required parameter: 'engWrongAnswer2'",
    });
  }
  if (!engWrongAnswer3) {
    return res.status(400).json({
      status: 400,
      error: "Missing required parameter: 'engWrongAnswer3'",
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
