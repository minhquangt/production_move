const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/productCtrl');

router.get('/allProducts', productCtrl.getAllProducts);
router.get('/allProductsFactory/:id', productCtrl.getAllProductsFactory);
router.post('/create', productCtrl.create);
router.put('/update', productCtrl.update);
router.delete('/delete', productCtrl.delete);

module.exports = router;
