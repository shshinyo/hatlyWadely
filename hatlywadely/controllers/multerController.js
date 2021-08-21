const multer = require('multer')
const fs =require ('fs');
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, 'storage/productImages')
  },
  filename: (req, file, callBack) => {
    callBack(null, `image_${Date.now().toString()}_${file.originalname}`)
  }
});

const upload = multer({ storage: storage });
async function UploadProductImage(req, res, next) {
    let files = req.files;
    console.log(files)
    if (Array.isArray(files) &&  files.length > 0 ){
        res.json({message:'successfully saves files',state:0}) 
      
    }else{
      res.json({message:'error while save attachments ',status:-1})   
    }
  };

  module.exports={
    upload,
    UploadProductImage
  }