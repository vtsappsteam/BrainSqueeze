const validateCategoryRequest = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      status: 400,
      error: "Missing required parameter: 'name'",
    });
  }

  next();
};

module.exports = {
  validateCategoryRequest,
};
