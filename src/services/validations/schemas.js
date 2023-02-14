const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

const isNameNull = Joi.object({
  name: Joi.string().required(),
});

const isNameFiveCh = Joi.object({
  name: Joi.string().min(5).required(),
});

const validateProduct = (name) => {
  const { error: err1 } = isNameNull.validate({ name });
  if (err1) return { type: 'BAD_REQUEST', message: err1.message };

    const { error: err2 } = isNameFiveCh.validate({ name });
  if (err2) return { type: 'INVALID_VALUE', message: err2.message };

  return { type: null, message: '' };
};

module.exports = {
  idSchema,
  validateProduct,
};