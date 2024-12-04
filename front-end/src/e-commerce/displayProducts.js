import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios';
import "./App.css"
import { store } from './EApp';
import { useContext } from 'react';
import AllProducts from './allProducts';
import FilterProducts from './filterProducts';
import SheimerEffect from './sheimerEffect';


function DisplayProducts() {

      const[filterData,setFilterData] = useState([])
      const [searchInput,setSearchInput] = useState("")
       const {userCartData,setUserCartData} = useContext(store)
       const {productData,setProductData} = useContext(store)

       const [cartBtnStatus, setCartBtnStatus] = useState({}); 
       
 //  console.log(userCartData)
        

      function CartButton(product){
    // console.log(product)
        const userToken = JSON.parse(sessionStorage.getItem("Token"))
        const buttonStatus = cartBtnStatus[product._id];
              if(userToken){
                //  console.log("123")
                      if(userCartData.length>0){
                       //   console.log("323")
                              let IsExist= userCartData.find((item,index)=>{ if (product._id==item.productId){ return true} })
                               // console.log(IsExist)
                                if(IsExist){
                                    return <button type="button" class="btn btn-success">Added To Cart</button>
                                }else if (buttonStatus === "loading") {
                                  return <button class="btn btn-danger" type="button" disabled>
                                  <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                  <span role="status">Loading...</span>
                                </button>
                                }
                                else{
                                   return  <button type="button" class="btn btn-primary" onClick={()=>{AddtoCartFun(product)}} >Add To Cart</button> 
                                }
                      }else{
                        return <button type="button" class="btn btn-primary" onClick={()=>{AddtoCartFun(product)}}>Add To Cart</button>
                      }
              }else{
                return <button type="button" onClick={()=>{window.alert("You Did Not Login Plese Login")}} class="btn btn-secondary">Add To Cart</button>
              }
      }


      function AddtoCartFun(productItem){
             // console.log(productItem)
             setCartBtnStatus({
              [productItem._id]: "loading"});
              let token = JSON.parse(sessionStorage.getItem("Token"))
              if(token){
                console.log(token)
            const headers = {
      "Authorization": `${token}`
           }
              axios.put(`http://localhost:8080/addCartItem/${productItem._id}`, productItem, {headers}).then((res)=>{
                  // console.log(res)
                    if(res.data.result){
                      setUserCartData(prevCartData => [
                        ...prevCartData,
                        res.data.result.CartItems[res.data.result.CartItems.length-1]

                      ]);
                      setCartBtnStatus({[productItem._id] : "added",}) // After success, set status to "added"
            ;
                    }
              })
          }
      }

      const filterProductsFun=(e)=>{
        setSearchInput(e.target.value)
              let filterProducts = productData.filter((product)=>{
                              if(`${product.Title}${product.Description}${product.Category}${product.subCategory}${product.Brand}`.toLowerCase().includes(e.target.value.toLowerCase())){
                                       return true
                              }
              })
              setFilterData(filterProducts)
      }

      const displayProductsFun = ()=>{
            if(searchInput!="" && filterData.length>0){
                   return  <FilterProducts  filterData={filterData} CartButton={CartButton} AddtoCartFun={AddtoCartFun} />
            }else if(searchInput!="" && filterData.length==0){
                  return <div style={{display:"flex", height:"70vh",justifyContent:"center",alignItems:"center"}}><h1>No Product Found</h1></div>
            }else if(searchInput==""){
                    return <AllProducts CartButton={CartButton} AddtoCartFun={AddtoCartFun} productData={productData}/>
            }
      }
  
   // console.log(cartBtnStatus)

//console.log(userCartData)
    
  return (<>
  <div className='container-fluid' style={{margin:"50px 0px"}}>
      <div style={{textAlign:"center"}}><input style={{margin:"20px",width:"30%",border:"2px solid black"}} type='text' placeholder='Search Any Product or Brand or Category' onChange={(e)=>{filterProductsFun(e)}}/></div>
            {displayProductsFun()}
     </div>

  </> )
  
}

export default DisplayProducts