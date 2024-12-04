const mongoose = require("mongoose")
const { ObjectId } = mongoose;


let userSchema=new mongoose.Schema({
    Name : {
        type : String,
        required : true 
    },
    Email : {
        type : String,
        required : true 
    },
    Password : {
        type : String,
        required : true 
    },
    CartItems:{
        type:[{
            productId: {
                type: String,  
                required: true
            },
            cartProductTitle:{
                  type:String,
                  required:true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            cartProductImage:{
                  type:String,
                  required:true
            }
        }],
        required:false
    }
  
})

module.exports =  mongoose.model("user", userSchema)