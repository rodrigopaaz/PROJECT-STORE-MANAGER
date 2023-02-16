const express = require('express');
const { productsController } = require('../controllers');

const router = express.Router();

router.get(
  '/',
  productsController.listProducts,
);

router.get(
  '/:id',
  productsController.getProduct,
);

router.post(
  '/',
  productsController.addProduct,
);

router.put(
  '/:id',
  productsController.updateProduct,
);

module.exports = router;