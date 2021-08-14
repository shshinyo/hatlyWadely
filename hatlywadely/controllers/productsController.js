const Product  = require('../models/productModel');
const ObjectId = require('mongoose').Types.ObjectId;

async function addProduct(req,res){
let newProduct = await new  Product(req.body);
newProduct.save((err,done)=>{
    if(err){
     console.log(err);
        res.json({state:1,message:'product didnt created'})
    }else{
        console.log(done)
        res.json({state:0,message:'product created'})
    }
}) 
}

async function editProduct(req,res){
    let body = req.body ;
    let id = req.params.id ; 
    Product.update({_id: id}, {$set: body}, function (err){
        if (err) res.json({state:1,message:'product didnt edited'})
        res.json({state:0,message:'product edited'})
});
    
    }
async function getProduct(req,res){
        let id = req.params.id ; 
        if(isValidObjectId(id) ){
            let product =  await  Product.findById(id);
                if(product){
                    res.json(product);

                }else{
                    res.json({state:1,message:'product didnt Found'});
                } 
        }else res.json({state:1,message:'bad id'});
      
        }
 async function deleteProduct(req,res){
            let id = req.params.id ; 
            if(isValidObjectId(id) ){
                Product.findOneAndRemove({_id: id}, function(err,data)
                {
                    if(!err){
                        console.log("Deleted");
                        res.json({state:0,message:'product deleted'});
                    }else{
                        res.json({state:1,message:' error while deleting product'});
                    }
                });
            }else res.json({state:1,message:'bad id'});
      }

 async function getProductsOfCategory(req,res){
        let category = req.params.id ; 
        console.log(category)
        Product.find({category:category}, function(err,data)
            {
                if(!err){
                    res.json({state:0,data});
                }else{
                    res.json({state:1,message:' error while finding products'});
                }
            });    
  }      
  

  
module.exports={
    addProduct,
    editProduct,
    getProduct,
    deleteProduct,
    getProductsOfCategory
}

// Validator function
function isValidObjectId(id){
      
    if(ObjectId.isValid(id)){
        if((String)(new ObjectId(id)) === id)
            return true;        
        return false;
    }
    return false;
}