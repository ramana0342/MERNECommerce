import React from "react";
import "./App.css";
import { useState} from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";



const UserRegister = () => {

  let navigte = useNavigate();
  const [userData, setUserData] = useState({ Name: "", Email: "", Password: "" })
  const [RegisterStatus, setRegisterStatus] = useState(null)
  const [Error, setError] = useState(null)
  const [btnStatus,setBtnStatus]=useState()


  const handleChange = (field, value) => {
    setRegisterStatus(null)
        setError(null)
    setUserData({ ...userData, [field]: value })
    console.log(value)
  }

  const SignUpBtnEvent = () => {
    setBtnStatus(true)
    axios.post("https://mernecommerce-22ox.onrender.com/register", userData).then((res) => {
      //console.log(res.data)
      if (res.data.Success) {
        setError(null)
        setRegisterStatus(true)
        setBtnStatus()
        alert("User Registered Succesfully")
        navigte("/loginUser")


      } else {
        setRegisterStatus(null)
        console.log(res)
        setError(res.data.ERROR)
        setBtnStatus()
        //console.log(Error)
      }
    }).catch((err) => {
      //console.log(err)
      setBtnStatus()
    })
  }

  return (<>





    <div className="signUpForm">

      <div className="form">
        <div className="mb-3">
          <label for="exampleInputEmail1" class="form-label"><b>Enter Your Name:</b></label>
          <input
            onChange={(e) => { handleChange("Name", e.target.value) }} type="text" class="form-control" id="Name" placeholder="User Name" />
        </div>
        <div className="mb-3">
          <label for="exampleInputEmail1" class="form-label"><b>Email address:</b></label>
          <input
            onChange={(e) => { handleChange("Email", e.target.value) }}
            className="form-control" id="gmail" placeholder="Email ID" />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" class="form-label" ><b>Create Your Password:</b></label>
          <input
            onChange={(e) => { handleChange("Password", e.target.value) }}
            type="password" class="form-control" id="createPassword" placeholder="Password" />
        </div>
        <div className="SignUpBtn">
          {btnStatus ? <button class="btn btn-primary" type="button" disabled><span class="spinner-border spinner-border-sm" aria-hidden="true"></span><span role="status">Loading...</span></button> 
          :<button onClick={() => {SignUpBtnEvent()}} type="submit" class="btn btn-primary signBtn" id="submit">SignUp</button>}
        </div>
        <div style={{ marginTop: "10px", textAlign: "center" }}><b>Already have An Account ?</b><br /> <NavLink to="/loginUser"><b>LOGIN</b></NavLink></div>
        {RegisterStatus == true ? <><br /><b style={{ color: "green", textAlign: "center" }}>User Registered Succesfully</b></> : ""}
        {Error ? <><br/><b style={{ color: "red", textAlign: "center" }}>{Error}</b></> : ""}

      </div>
    </div>


  </>)
}


export default UserRegister;