const mongoose = require("mongoose")


const adminLoginSchema = mongoose.Schema({
       
      adminEmail:{
           type:String,
           required:true
      },
      adminPassord:{
           type:String,
           required:true
      }

})

module.exports = mongoose.model("adminData",adminLoginSchema)