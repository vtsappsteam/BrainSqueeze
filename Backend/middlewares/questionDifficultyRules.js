const validateQuestionDifficultyRequest = (req, res, next) => {
  const { name, maxThreshold, minThreshold } = req.body;

  if (!name) {
    return res.status(400).json({
      status: 400,
      error: "Missing required parameter: 'name'",
    });
  }
  if (!maxThreshold) {
    return res.status(400).json({
      status: 400,
      error: "Missing required parameter: 'maxThreshold'",
    });
  }
  if (!minThreshold) {
    return res.status(400).json({
      status: 400,
      error: "Missing required parameter: 'minThreshold'",
    });
  }

  next();
};

module.exports = {
  validateQuestionDifficultyRequest,
};
