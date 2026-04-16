const { validationResult } = require("express-validator");
const ApiError = require("../utils.ApiError");

const handleValidationErrors = (req, _res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  return next(new ApiError(400, errors.array()[0].msg));
};

module.exports = handleValidationErrors;
