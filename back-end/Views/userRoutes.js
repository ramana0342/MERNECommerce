const express= require("express");
const router= express.Router();
 const  usersData= require("../Model/user")
 let bcrypt= require("bcrypt")
 let jwt = require("jsonwebtoken")



 router.post("/register",async(req,res)=>{

    let {Name,Email,Password} = req.body;
    if(Name&&Email&&Password){
      let existUser = await usersData.findOne({Email:Email});
      if(existUser==null){
      let encryptPassword= bcrypt.hashSync(Password,10);
      req.body.Password = encryptPassword
       let user=new  usersData(req.body);
       let userDetails = await user.save();
  
       return res.json({
          Success : "User Stored in DB",
          userDetails
       })
      }else{
         return res.json({
            ERROR:"Already Hava An Account On This Email ID"
         })
       }
    }else{
       return res.json({
         ERROR:"Enter All Details"
       })
    }
    
    
    }); 

 router.post("/login",async(req,res)=>{
   let {Email,Password} = req.body;
   if(Email&&Password){
   let userDetails= await usersData.findOne({Email:Email});
   if(userDetails==null){
      return res.json({
         Error:"No User is  Registered with this Email"
      })
   }
     let passwordResult  = bcrypt.compareSync(Password,userDetails.Password);
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

   
 });

 router.get("/getUserData", async(req,res)=>{
            let Token = req.headers.authorization;
           // console.log(Token)
            let tokenResult = jwt.verify(Token, "Shh");
         //   console.log(tokenResult)
            let userData = await usersData.findById(tokenResult.userID)
            res.json({
               CartItems:userData.CartItems
            })
 })

 router.put("/addCartItem/:id", async(req,res)=>{
                      const cartItemId = req.params.id 
                      const { action } = req.body;
                   //   console.log(req.body)
                     // console.log(cartItemId)
                     // console.log(usersData)
                     let Token = req.headers.authorization;
                      let tokenResult = jwt.verify(Token, "Shh");
                      let userData = await usersData.findById(tokenResult.userID)
                     // console.log(userData)
                 

                  if(userData){
                     const itemExists = userData.CartItems.find(item => item.productId == cartItemId);
                     if(itemExists){
                              if(action=="INCREASE" || action=="DECREASE"){
                                     userData.CartItems = userData.CartItems.map((item,index)=>{
                                     if(item.productId==cartItemId){
                                                if(action=="INCREASE"){
                                                    return {...item,quantity:item.quantity+1}
                                                }else if(action=="DECREASE" && item.quantity>1){
                                                    return {...item,quantity:item.quantity-1}
                                                }
                                     }
                                         return  item
                       })}else if(action=="REMOVE"){
                        userData.CartItems = userData.CartItems.filter((item,index)=>{
                               if(item.productId !== cartItemId){
                                   return true
                               }
                        })
                       }


                     }else{
                        let cartItemData={
                           cartProductTitle:req.body.Title,
                           productId:cartItemId,
                           quantity:1,
                           price:req.body.Price,
                           cartProductImage:req.body.Photo[0]
                        }
                          userData.CartItems.push(cartItemData)
                       }
                  }else{
                     // let cartItemData={
                     //    cartProductTitle:req.body.Title,
                     //    productId:cartItemId,
                     //    quantity:1,
                     //    price:req.body.Price,
                     //    cartProductImage:req.body.Photo[0]
                     // }
                     //   userData.CartItems = [cartItemData]
                  }

                 let result =  await userData.save();
                      res.json({
                           result
                      })
 })

 module.exports=router;





// 81254 19848  