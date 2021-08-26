const express = require('express');
const userController = require('../controllers/usersControllers');
const authUtil = require('../core/auth');

const router = express.Router();
router.post('/newUser',userController.createuser);
router.get('/getUsers',authUtil.extend,userController.getUsers);
router.post('/addToCart/:productId/:id',userController.addProductToCart);
router.post('/login',userController.login);

function isValidUser(req,res,next){
    if(req.isAuthenticated()) next();
    else return res.status(401).json({message:'Unauthorized Request'});
  }
module.exports = router