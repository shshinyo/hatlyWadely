const Category  = require('../models/categoryModel');
const ObjectId = require('mongoose').Types.ObjectId;

async function addCategory(req,res){
let newCategory = await new  Category(req.body);
newCategory.save((err,done)=>{
    if(err){
     console.log(err);
        res.json({state:1,message:'Category didnt created'})
    }else{
        console.log(done)
        res.json({state:0,message:'Category created'})
    }
}) 
}

async function editCategory(req,res){
    let body = req.body ;
    let id = req.params.id ; 
    Category.update({_id: id}, {$set: body}, function (err){
        if (err) res.json({state:1,message:'Category didnt edited'})
        res.json({state:0,message:'Category edited'})
});
    
    }
async function getCategories(req,res){
            let Categories =  await  Category.find({});
                if(Categories){
                    res.json(Categories);

                }else{
                    res.json({state:1,message:'Categories didnt Found'});
                } 
      
        }
 async function deleteCategory(req,res){
            let id = req.params.id ; 
            if(isValidObjectId(id) ){
                Category.findOneAndRemove({_id: id}, function(err,data)
                {
                    if(!err){
                        console.log("Deleted");
                        res.json({state:0,message:'Category deleted'});
                    }else{
                        res.json({state:1,message:' error while deleting Category'});
                    }
                });
            }else res.json({state:1,message:'bad id'});
      }
  
module.exports={
    addCategory,
    editCategory,
    getCategories,
    deleteCategory,
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