const { productsModel } = require('../models');

const findAll = async () => {
  const passengers = await productsModel.findAll();
  return { type: null, message: passengers };
};

const findById = async (id) => {
  const passengers = await productsModel.findById(id);
  if (!passengers) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }

  return { type: null, message: passengers };
};

module.exports = {
  findAll,
  findById,
};