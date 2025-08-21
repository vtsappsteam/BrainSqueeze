const validateCategoryRequest = (req, res, next) => {
  const { name, engName } = req.body;

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

  next();
};

module.exports = {
  validateCategoryRequest,
};
