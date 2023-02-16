const { productsService } = require('../services');
const errorMap = require('../utils/errorMap');

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { type, message } = await productsService.update(id, name);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};

const listProducts = async (_req, res) => {
  const { type, message } = await productsService.findAll();

  if (type) return res.status(errorMap.mapError(type)).json(message);

  res.status(200).json(message);
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.findById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};

const addProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productsService.create(name);
  if (type) {
      return res.status(errorMap.mapError(type)).json({ message });
  }

  return res.status(201).json({ id: message, name });
};

const removeProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.deleteProduct(id);
  if (type) {
    return res.status(errorMap.mapError(type)).json({ message });
  }
  return res.status(204).json();
};

module.exports = {
  listProducts,
  getProduct,
  addProduct,
  updateProduct,
  removeProduct,
};