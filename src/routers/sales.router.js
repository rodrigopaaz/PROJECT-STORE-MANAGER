const express = require('express');
const { salesController } = require('../controllers');

const router = express.Router();

 router.get(
  '/',
  salesController.listProducts,
);

router.get(
  '/:id',
  salesController.getProduct,
); 

router.post(
  '/',
  salesController.addSales,
);

module.exports = router;