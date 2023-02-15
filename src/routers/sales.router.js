const express = require('express');
const { salesController } = require('../controllers');

const router = express.Router();

/* router.get(
  '/',
  productsController.listProducts,
);

router.get(
  '/:id',
  productsController.getProduct,
); */

router.post(
  '/',
  salesController.addSales,
);

module.exports = router;