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

const create = async (element) => {
  const error = validateProduct(element);
  if (error.type) return error;
  const products = await productsModel.create(element);
  return { type: null, message: products };
};

const update = async (id, newData) => {
    const error = validateProduct(newData);
  if (error.type) return error;
  const result = await productsModel.update(id, newData);
  if (!result.affectedRows) {
   return { type: 'NOT_FOUND', message: 'Product not found' }; 
  }
  return { type: '', message: { id, name: newData } };
};

module.exports = {
  findAll,
  findById,
  create,
  update,
};