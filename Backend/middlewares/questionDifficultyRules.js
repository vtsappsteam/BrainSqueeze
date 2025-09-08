const validateQuestionDifficultyRequest = (req, res, next) => {
  const { name, engName, maxThreshold, minThreshold } = req.body;

  if (!name) {
    return res.status(400).json({
      status: 400,
      error: "Missing required parameter: 'name'",
    });
  }
  if (!engName) {
    return res.status(400).json({
      status: 400,
      error: "Missing required parameter: 'engName'",
    });
  }
  if (maxThreshold === undefined) {
    return res.status(400).json({
      status: 400,
      error: "Missing required parameter: 'maxThreshold'",
    });
  }
  if (minThreshold === undefined) {
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
