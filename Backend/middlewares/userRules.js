const validateUserRequest = (req, res, next) => {
  const { firstName, lastName, email, roleId } = req.body;

  if (!firstName) {
    return res.status(400).json({
      status: 400,
      error: "Missing required parameter: 'firstName'",
    });
  }
  if (!lastName) {
    return res.status(400).json({
      status: 400,
      error: "Missing required parameter: 'lastName'",
    });
  }
  if (!email) {
    return res.status(400).json({
      status: 400,
      error: "Missing required parameter: 'email'",
    });
  }
  if (!roleId) {
    return res.status(400).json({
      status: 400,
      error: "Missing required parameter: 'roleId'",
    });
  }

  next();
};

module.exports = {
  validateUserRequest,
};
