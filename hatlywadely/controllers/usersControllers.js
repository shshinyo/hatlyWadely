const User = require('../models/userModel');
const passport = require('passport');


async function createuser(req,res){
    console.log(req.body)

    let user = req.body;  
    user.password = User.hashPassword(req.body.password);
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

  let user =   await new User({
        name: 'rehab',
        address: 'bagour',
        phone: '01067390401',
        userType: 'user'
    })
    let users = await User.find({})
    res.json(user);
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
    console.log(req.body)
    passport.authenticate('local', function(err, user, info) {
        if (err) { return res.json(err); }
        if (!user) { return res.json(info); }
        req.logIn(user, function(err) {
          if (err) { return res.json(err); }
           delete user.password ;
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