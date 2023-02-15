const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

const isNameNull = Joi.object({
  name: Joi.string().required(),
});

const isNameFiveCh = Joi.object({
  name: Joi.string().min(5).required(),
});

const isIdNull = Joi.object({
  productId: Joi.number().integer().min(1).required(),
});

const isIdFiveCh = Joi.object({
  productId: Joi.number().integer().min(1).required(),
});

const isQuantityValid = Joi.object({
  quantity: Joi.number().integer().required(),
});

const isQuantityNull = Joi.object({
  quantity: Joi.number().min(1),
});

const validateProduct = (name) => {
  const { error: err1 } = isNameNull.validate({ name });
  if (err1) return { type: 'BAD_REQUEST', message: err1.message };
    const { error: err2 } = isNameFiveCh.validate({ name });
  if (err2) return { type: 'INVALID_VALUE', message: err2.message };

  return { type: null, message: '' };
};

const validateFields = (sales) => {
   const { productId, quantity } = sales;
    const { error: err1 } = isIdNull.validate({ productId });
  if (err1) return { type: 'BAD_REQUEST', message: err1.message };
    const { error: err2 } = isIdFiveCh.validate({ productId });
  if (err2) return { type: 'INVALID_VALUE', message: err2.message };
  const { error: err3 } = isQuantityNull.validate({ quantity });
  if (err3) return { type: 'INVALID_VALUE', message: err3.message };// 400
    const { error: err4 } = isQuantityValid.validate({ quantity });
  if (err4) return { type: 'BAD_REQUEST', message: err4.message };// 
};

const validateSales = (sales) => {
  const error = validateFields(sales);
  if (error) { return error; }
  return { type: null, message: '' };
};

module.exports = {
  idSchema,
  validateProduct,
  validateSales,
};