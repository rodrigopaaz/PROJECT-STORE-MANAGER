const { salesModel } = require('../models');
// const { validateSales } = require('./validations/schemas');
const { getItems, checkError } = require('./validations/validateRegister');

/* const findAll = async () => {
  const products = await productsModel.findAll();
  return { type: null, message: products };
};

const findById = async (id) => {
  const products = await productsModel.findById(id);
  if (!products) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }

  return { type: null, message: products };
};
 */
const create = async (element) => {
  let errors = { type: null, message: '' };
  const errorValidate = checkError(element);
  if (errorValidate.type) return errorValidate;
  const checkId = await getItems();
  const ids = checkId.message.map((e) => e.id);

  const elementIds = element.map((e) => e.productId);
  elementIds.forEach((el) => {
    if (!ids.includes(el)) { errors = { type: 404, message: 'Product not found' }; }
  });
  
  if (errors.type) {
    return { type: 'NOT_FOUND', message: 'Product not found' };
  }
  const sales = await salesModel.create(element);
  console.log(sales);
  return { type: null, message: sales };
};

module.exports = {
  create,
};