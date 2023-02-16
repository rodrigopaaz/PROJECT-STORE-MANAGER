const { findAll } = require('../products.service');
const { validateSales } = require('./schemas');

const getItems = async () => {
  const registeredIds = await findAll();
  return registeredIds;
};

const checkError = (element) => {
  console.log(element, 'asdfhohsafosdihi');
  let errors = { type: null, message: '' }; 
  element.forEach((e) => {
    const error = validateSales(e);
    if (error.type) errors = { type: error.type, message: error.message };
  });
  return errors;
};

module.exports = {
  getItems,
  checkError,
};