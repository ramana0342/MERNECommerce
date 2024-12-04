import React from "react";
import "./App.css"
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";




const AdminLogin = () => {

  let navigate = useNavigate()
  const [userLogin, setuserLogin] = useState({ adminEmail: "",  adminPassord: "" });
  const [LoginError, setLoginError] = useState("")
  const [loginBtnstatus,setloginBtnstatus] = useState()
  const [LoginStatus,setLoginStatus] = useState()
 

  
  
  const handleChange = (field, value) => {
    setLoginError("")
    setuserLogin({ ...userLogin, [field]: value })
  }

  const handlekeyDownFun=(e)=>{
        if(e.key == "Enter"){
          LoginEvent()
        }
  }



  const LoginEvent = () => {
    setloginBtnstatus(true)
    axios.post("https://mernecommerce-22ox.onrender.com/adminLogin", userLogin).then((res) => {
   console.log(res.data)
      if (res.data.Success) {
        setLoginError("")
        setLoginStatus(true)
        sessionStorage.setItem("adminToken" , JSON.stringify(res.data.Token))
        setloginBtnstatus()
        
        navigate("/uploadProducts")
      } else {
        setLoginStatus()
        setLoginError(res.data.Error)
        setloginBtnstatus()
      }
    })
  }

  return (<>

    <div class="adminLogincontainer">
      <div className="Loginform">
        <h3><b>Plese LogIn</b></h3>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label"><b>Email address:</b></label><br />
          <input
            onChange={(e) => { handleChange("adminEmail", e.target.value) }}
            type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter Your Email" />

        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label"><b>Password:</b></label><br />
          <input
            onChange={(e) => { handleChange("adminPassord", e.target.value) }}  onKeyDown={(e)=>{handlekeyDownFun(e)}}
            type="password" class="form-control" id="exampleInputPassword1" placeholder="Enter Your Password" />
        </div>
        <div className="Login-btn">
            {loginBtnstatus ? <button class="btn btn-primary" type="button" disabled><span class="spinner-border spinner-border-sm" aria-hidden="true"></span><span role="status">Loading...</span></button> 
            :<button onClick={() => { LoginEvent() }} type="submit" class="btn btn-primary" id="submit">LogIn</button> }
        </div>
        <div style={{ marginTop: "10px", textAlign: "center" }}><b>Aren't An Admin ?</b><br /> <NavLink to="/"><b>Home</b></NavLink></div>
        <div>{LoginStatus == true ? <b style={{ color: "green" }}>Logged Succesfully , Plese Wait</b> : ""}
          {LoginError ? <b style={{ color: "red" }}>{LoginError}</b> : ""}
        </div>
      </div>
    </div>


  </>)
}

export default AdminLogin