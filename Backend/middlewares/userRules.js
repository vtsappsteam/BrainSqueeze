const validateUserRequest = (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

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
  if (!password) {
    return res.status(400).json({
      status: 400,
      error: "Missing required parameter: 'password'",
    });
  }

  next();
};

const validateUpdateUserRequest = (req, res, next) => {
  const { firstName, lastName, email } = req.body;

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

  next();
};

module.exports = {
  validateUserRequest,
  validateUpdateUserRequest,
};
