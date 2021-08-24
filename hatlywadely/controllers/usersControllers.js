const User = require('../models/userModel');
const passport = require('passport');
const jwtUtil = require('../core/jwt');



async function createuser(req,res){
    let user = req.body;  

    let newUser = await new User(user);
   newUser.save((err,done)=>{
       if(err){
        console.log(err);
           res.json({state:false,message:'user didnt created'})
       }else{
           console.log(done)
           res.json({state:true,message:'user created'})
       }
   })
}
async function getUsers(req, res) {
    // const USER = require('./models/userModel');
    let users = await User.find({})
    res.json(users);
}
async function addProductToCart(req,res){
    let productId  = req.params.productId;
    let userId   = req.params.id
    await User.update({_id:userId},{$addToSet:{cart:productId}},(err,data)=>{
        if(err){
            res.json({state:1,message:'product didnt added'})
        }else{
            res.json({state:0,message:'product  added'})

        }
    })


}

async function login (req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return res.json(err); }
        if (!user) { return res.json(info); }
        req.logIn(user, function(err) {
          if (err) { return res.json(err); }
           delete user.password ;
           let payload = {email:user.email,userType:user.userType} ;
           if(user.userType == 'general'){
             user.accessToken = jwtUtil.generate_access_token('general',payload,process.env.SECRET_KEY)
           }else if(user.userType == 'owner'){
               user.accessToken = jwtUtil.generate_access_token('owner',payload,process.env.SECRET_KEY_OWNER)
           }else if(user.userType == 'driver'){
               user.accessToken = jwtUtil.generate_access_token('driver',payload,process.env.SECRET_KEY_DRIVER)
             }
           user.accessToken
          return res.status(200).json({message:'Login Success',user,status:0});
        });
      })(req, res, next);
  }

module.exports ={
    createuser,
    getUsers,
    addProductToCart,
    login
}