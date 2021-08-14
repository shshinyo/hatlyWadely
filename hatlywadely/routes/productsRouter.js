const express = require('express');
const productController = require('../controllers/productsController');
const router = express.Router();
router.post('/add',productController.addProduct);
router.put('/edit/:id',productController.editProduct);
router.get('/product/:id',productController.getProduct);
router.delete('/delete/:id',productController.deleteProduct);
router.get('/category/:id',productController.getProductsOfCategory);




module.exports =router