const express= require("express")
const router = express.Router()
const adminData = require("../Model/admin")
const bcrypt = require("bcrypt")
const jwt= require("jsonwebtoken")
const adminAuthorization = require("../MiddleWares/adminAuthorization")


router.post("/adminLogin" , async(req,res)=>{
    let { adminEmail,adminPassord} = req.body;
    if(adminEmail&&adminPassord){
       
    let userDetails= await adminData.findOne({ adminEmail:adminEmail});
    if(userDetails==null){
       return res.json({
          Error:"No User is  Registered with this Email"
       })
    }
      let passwordResult  = bcrypt.compareSync(adminPassord,userDetails.adminPassord);
    if(passwordResult == false){
       return res.json({
          Error:"Incorrect password"
       })
    }
 
    let token = jwt.sign({userID:userDetails._id},"Shh")
    return res.json({
       Success : "Login Success",
       Token : token,
       userDetails
    })
 
 }else{
    return res.json({
       Error:"Enter All Details"
    })
 }
 

})

module.exports = router


