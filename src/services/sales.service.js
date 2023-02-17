const { salesModel } = require('../models');
// const { validateSales } = require('./validations/schemas');
const { getItems, checkError } = require('./validations/validateRegister');

 const findAll = async () => {
  const sales = await salesModel.findAll();
  return { type: null, message: sales };
};

const findById = async (id) => {
  const sales = await salesModel.findById(id);
  if (!sales.length) {
    return { type: 'NOT_FOUND', message: 'Sale not found' };
  }

  return { type: null, message: sales };
};
 
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
  return { type: null, message: sales };
};

/* const update = async (id, newData) => {
    const error = validateProduct(newData);
  if (error.type) return error;
  const result = await productsModel.update(id, newData);
  if (!result.affectedRows) {
   return { type: 'NOT_FOUND', message: 'Product not found' }; 
  }
  return { type: '', message: { id, name: newData } };
}; */

const deleteSale = async (id) => {
  const remove = await salesModel.deleteSale(id);
  if (!remove.affectedRows) {
    return { type: 'NOT_FOUND', message: 'Sale not found' };
  }   
  return { type: '', message: remove };
};

module.exports = {
  create,
  findAll,
  findById,
  deleteSale,
};