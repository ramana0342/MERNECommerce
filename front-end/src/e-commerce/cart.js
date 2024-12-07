import React, { useState } from 'react'
import { store } from './EApp'
import { useContext } from 'react';
import axios from 'axios';
import "./cart.css";

function Cart() {

  const[decreaseBtnStatus,setDecreaseBtnStatus] = useState()
  const[increaseBtnStatus,setIncreaseBtnStatus] = useState()
  const[removeBtnStatus,setRemoveBtnStatus] = useState()
  const userToken = JSON.parse(sessionStorage.getItem("Token"))
  const {userCartData,setUserCartData} = useContext(store)
 //  console.log(userCartData)


   function totalCartItems(){
            return userCartData.length
   }

   const CartPrice = userCartData.reduce((acc,item)=>{
                        return acc+item.quantity*item.price
                        
   },0)

 //  console.log(CartPrice)

   function cartItemFun(actionPerform,product){
         
         if(actionPerform=="REMOVE"){
          setRemoveBtnStatus(product.productId)
         }
         if(actionPerform=="DECREASE" && product.quantity>1){
         setDecreaseBtnStatus(product.productId)
         }
         if(actionPerform=="INCREASE"){
          setIncreaseBtnStatus(product.productId)
         }
   //  console.log("123")
     let token = JSON.parse(sessionStorage.getItem("Token"))
     if(token){
       console.log(token)
   const headers = {
"Authorization": `${token}`
  }
     axios.put(`https://mernecommerce-22ox.onrender.com/addCartItem/${product.productId}`, {action:actionPerform}, {headers}).then((res)=>{
          console.log(res)
           if(res.data.result){
             setUserCartData( res.data.result.CartItems);
            
             if(actionPerform=="REMOVE"){
              setRemoveBtnStatus()
             }
             if(actionPerform=="DECREASE" && product.quantity>1){
              setDecreaseBtnStatus()
              }
              if(actionPerform=="INCREASE"){
                setIncreaseBtnStatus()
               }
           }
     })
 }
   }

const DecreaseBtnFun = (product)=>{
           if(product.productId==decreaseBtnStatus){
                return <button><div class="spinner-border text-danger" role="status">
                <span class="visually-hidden">Loading...</span>
              </div></button>
           }else{
                return  <button onClick={()=>{cartItemFun("DECREASE" , product)}}>-</button>
           }
}

const IncreaseBtnFun = (product)=>{
  if(product.productId==increaseBtnStatus){
       return <button><div class="spinner-border text-danger" role="status">
       <span class="visually-hidden">Loading...</span>
     </div></button>
  }else{
       return  <button class="QtyBtn"   onClick={()=>{cartItemFun("INCREASE" , product)}}>+</button>
  }
}
  






  return (<>
         { userToken ? <div className='container cartContainer' style={{width:"100%",marginTop:"60px"}}>
            {userCartData.length>0 ? <> <div className='CartCardContainer'>
            {userCartData.length>0 ? 
               userCartData.map((product,index)=>{
                  return(<>
                      
                         <div class="cartProductCard">
                
                         <div class="cartProductImg">
                         <img src={product.cartProductImage} alt="CartImage" />
                         </div>
     
                         <div className="CartproductContent">
                                 <h6>{product.cartProductTitle}</h6>
                                 <h5>Price={product.price}</h5>
                                 <span>{DecreaseBtnFun(product)}Qty-<span id="productQty">{product.quantity}</span>{IncreaseBtnFun(product)}</span>
                                 <p>Item Total Cost ({product.quantity}) = <b>{product.quantity*product.price}</b></p>
                                 {product.productId == removeBtnStatus ? <button class="btn btn-warning" type="button" disabled>
  <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
  <span role="status">Loading...</span>
</button> : <button type="button" class="btn btn-primary" onClick={()=>{cartItemFun("REMOVE" , product)}}>Remove</button> }
                                 
                         </div>
     
                    </div>
                     </>)  }): ""}
                     </div>
                     <div className='PriceDetails'>
                        <h3 style={{textAlign:"center"}}>Price Details</h3>
                        <h4>Price({totalCartItems()} items) = {CartPrice}</h4>  
                        <h4>Delivery Fees = 40 rup (Free)</h4>
                        <hr style={{margin:"0px 80px"}}></hr>
                     </div> </> : <div style={{display:"flex", height:"80vh",width:"100%", justifyContent:"center", alignItems:"center"}}><h1>Your Cart Is Empty</h1></div>}
                      </div> : <div style={{display:"flex", height:"100vh", justifyContent:"center", alignItems:"center"}}><h1>Your Not Login</h1></div> }
  </>)
}

export default Cart