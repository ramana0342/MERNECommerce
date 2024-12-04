import React, { useEffect, useState } from 'react'
import {BrowserRouter } from "react-router-dom"
import { createContext } from 'react'
import Index from "./index";
import axios from 'axios';


export const store= createContext()

function EApp() {
 
const [userCartData,setUserCartData] = useState([])
const [productData,setProductData] = useState([])

//console.log(true)
useEffect(()=>{

  let token = JSON.parse(sessionStorage.getItem("Token"))
  if(token){
    // console.log(token)
  const headers = {
      "Authorization": `${token}`
  }
  axios.get("https://mernecommerce-22ox.onrender.com/getUserData" , {headers}).then((res)=>{
        if(res.data.CartItems){
           setUserCartData(res.data.CartItems)
        }
  })
}
},[])

useEffect(()=>{
  axios.get("https://mernecommerce-22ox.onrender.com/getProductsData").then((res)=>{
     // console.log(res.data.productsData)
      if(res.data.Message == "Success"){
              setProductData(res.data.productsData)
      }
  }).catch((err)=>{
      console.log(err)
  })
},[])


  return (
    <>
     <store.Provider value={{userCartData,setUserCartData,productData,setProductData}}>
    <BrowserRouter>
      
    <Index/>
    </BrowserRouter>
    </store.Provider>
    </>
  )
}

export default EApp