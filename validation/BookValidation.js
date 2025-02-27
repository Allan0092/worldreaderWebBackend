const Joi = require("joi");

const BookValidation = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(), // Email string, resolved to ObjectId in controller
    isbn: Joi.string().allow("").optional(),
    publicationDate: Joi.date().iso().allow("").optional(),
    contentType: Joi.string().valid("PDF", "ePub").required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      _original: req.body.title || "Unknown",
      details: error.details,
    });
  }
  next();
};

module.exports = BookValidation;
