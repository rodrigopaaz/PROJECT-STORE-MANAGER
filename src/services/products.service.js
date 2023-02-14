const { productsModel } = require('../models');
const { validateProduct } = require('./validations/schemas');

const findAll = async () => {
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

const create = async (name) => {
  const error = validateProduct(name);
  if (error.type) return error;
  const products = await productsModel.create(name);
  return { type: null, message: products };
};

module.exports = {
  findAll,
  findById,
  create,
};