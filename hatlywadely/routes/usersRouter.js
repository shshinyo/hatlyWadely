const express = require('express');
const userController = require('../controllers/usersControllers')
const router = express.Router();
router.post('/newUser',userController.createuser);
router.get('/getUsers',userController.getUsers);
router.post('/addToCart/:productId/:id',userController.addProductToCart);

module.exports = router