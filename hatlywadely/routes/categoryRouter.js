const express = require('express');
const categoryController = require('../controllers/categoryController');
const router = express.Router();
router.post('/add',categoryController.addCategory);
router.put('/edit/:id',categoryController.editCategory);
router.get('/',categoryController.getCategories);
router.delete('/delete/:id',categoryController.deleteCategory);




module.exports =router