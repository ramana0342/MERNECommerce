const express = require("express")
const router = express.Router()

const productData= require("../Model/uploadProduct")
const adminAuthorization = require("../MiddleWares/adminAuthorization")



router.post("/uploadImage" , adminAuthorization , async(req,res)=>{

      // console.log(req.body)
           let uploadData = new productData(req.body)
           let responceData = await uploadData.save()
           res.json({
              Messege:"Success",
              responceData

           })
})


router.get("/getProductsData",async(req,res)=>{
        
  let productsData = await productData.find({})
   res.json({
        Message:"Success",
        productsData

   })

})





module.exports = router
