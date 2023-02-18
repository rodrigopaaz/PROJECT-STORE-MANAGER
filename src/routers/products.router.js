const express = require('express');
const { productsController } = require('../controllers');

const router = express.Router();

router.get(
  '/',
  productsController.listProducts,
);

router.get(
  '/search',
  productsController.getByQuery,
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

router.delete(
  '/:id',
  productsController.removeProduct,
);

module.exports = router;