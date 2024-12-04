
const express = require("express")
const app = express()
const mongoose= require("mongoose")
const cors = require("cors")
const port=8080
const userRoutes = require("./Views/userRoutes")
const productRoutes=require("./Views/produtcs")
const adminRouter = require("./Views/admin")



app.use(express.json());
app.use(cors())
app.use(productRoutes)
app.use(userRoutes)
app.use(adminRouter)




mongoose.connect("mongodb+srv://ramanareddym0342:Ramana799@ecommercedata.tz3aa.mongodb.net/?retryWrites=true&w=majority&appName=ECommerceData").then(()=>{
    console.log("DB Connected")
})

app.listen(port, ()=>{
    console.log(`server started running in ${port} port`)
})