const { salesService } = require('../services');
const errorMap = require('../utils/errorMap');

 const listProducts = async (_req, res) => {
  const { type, message } = await salesService.findAll();

  if (type) return res.status(errorMap.mapError(type)).json(message);

  res.status(200).json(message);
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.findById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(200).json([...message]);
};
 
const addSales = async (req, res) => {
  const sales = req.body;
  const { type, message } = await salesService.create(sales);
   if (type) {
      return res.status(errorMap.mapError(type)).json({ message });
  } 

  return res.status(201).json({ id: message.id, itemsSold: sales });
};

const removeSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.deleteSale(id);
  if (type) {
    return res.status(errorMap.mapError(type)).json({ message });
  }
  return res.status(204).json();
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const sales = req.body;
  const { type, message } = await salesService.update(sales, id);
   if (type) {
      return res.status(errorMap.mapError(type)).json({ message });
  } 

  return res.status(200).json({ saleId: id, itemsUpdated: sales });
};

module.exports = {
  addSales,
  listProducts,
  getProduct,
  removeSale,
  updateSale,
};