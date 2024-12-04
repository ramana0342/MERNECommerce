import React from 'react'
import {Routes,Route, NavLink, Navigate} from "react-router-dom"
import DisplayProducts from './displayProducts';
import UploadProduct from './uploadProduct';
import UserLogin from './userLogin';
import UserRegister from './Register';
import "./App.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { store } from './EApp';
import { useContext } from 'react';
import Cart from './cart';
import AdminLogin from './adminLogin';



function Index() {

    const userToken = JSON.parse(sessionStorage.getItem("Token"))
 //   console.log(userToken)
    const [LoginStatus, setLoginStatus] = useState(userToken)
     const navigate = useNavigate()
     const {userCartData,setUserCartData} = useContext(store)
     
     const [productData,setProductData] = useState([])


    


  



  
    const LogOutFun = () => {
      sessionStorage.removeItem("Token");
      setLoginStatus()
      navigate("/")
    }

  return (
    <>


<div class="mainNavBar" style={{display:"flex",justifyContent:"space-evenly"}}>
       <NavLink to="/" className="navlinks"><b>Home</b></NavLink> 
       <NavLink to="/userCart"  className="navlinks"><b>Cart {userToken ?  - userCartData.length :""}</b></NavLink>
       <NavLink to= "/adminLogin" className="navlinks"><b>Admin</b></NavLink>
       {/* <NavLink to="/uploadProducts" className="navlinks"><b>uploadProduct</b></NavLink>  */}
     {LoginStatus ? <NavLink className="navlinks" > <b onClick={()=>{LogOutFun()}}>LogOut</b> </NavLink> :  <NavLink to="/loginUser" className="navlinks" > <b>LogIn</b></NavLink>}
    </div>

    <Routes>
        <Route path="/" element={<DisplayProducts />}/>
      
        <Route path="/loginUser" element = {<UserLogin LoginStatus={LoginStatus} setLoginStatus={setLoginStatus}/>}/>
        <Route path="/RegisterUser" element= {<UserRegister/>} />
        <Route path="/userCart"  element={<Cart/>} />
        <Route path="/adminLogin" element = {<AdminLogin/>} />
         
        <Route path="/uploadProducts" element = {<UploadProduct/>} />
       
    </Routes>


    </>
 
  )
}

export default Index;