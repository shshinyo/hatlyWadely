const express = require('express');
const multerController = require("../controllers/multerController");

const productController = require('../controllers/productsController');
const router = express.Router();
router.post('/add',multerController.upload.array('files'),productController.addProduct);
router.post('/uploadProductImage',multerController.upload.array('files'),multerController.UploadProductImage);
router.put('/edit/:id',productController.editProduct);
router.get('/product/:id',productController.getProduct);
router.delete('/delete/:id',productController.deleteProduct);
router.get('/category/:id',productController.getProductsOfCategory);




module.exports =router