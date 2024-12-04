const mongoose= require("mongoose")



const uploadProductSchema= new mongoose.Schema({
      Title:{
        type:String,
        required:true
      },
      Price:{
        type:Number,
        required:true
      },
      Rating:{
        type:Number,
        required:true
      },
      Description:{
        type:String,
        required:true
      },
      Photo:{
          type:[String],
          required:true
      },
      Category:{
          type:String,
          required:true
      },
      subCategory:{
           type:String,
           required:true,
      },
      Brand:{
          type:String,
          required:true
      }

})


module.exports= mongoose.model("productsData" , uploadProductSchema )