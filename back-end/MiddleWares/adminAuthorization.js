const adminData = require("../Model/admin");
const jwt= require("jsonwebtoken");
const { findById } = require("../Model/user");
  
  const adminAuthorization = async(req,res,next)=>{
         try{
    let Token = req.headers.authorization;
     if(Token){
    let tokenResult = jwt.verify(Token,"Shh")
    console.log(tokenResult)
    let userExist = await adminData.findById(tokenResult.userID)
    console.log(userExist)
        if(userExist){
          next()
        }else{
              res.json({
                    message:"You Are Not Admin"
              })
        }
         }else{
          res.json({
            message:"You have Not Access || Token Missing"
      })
        }
      }catch(err){
              res.json({
                 message: err
              })
       }

  }


module.exports = adminAuthorization