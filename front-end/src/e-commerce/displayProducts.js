import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import "./App.css"
import { store } from './EApp';
import { useContext } from 'react';
import AllProducts from './allProducts';
import FilterProducts from './filterProducts';


function DisplayProducts() {

  const [filterData, setFilterData] = useState([])
  const [searchInput, setSearchInput] = useState("")
  const { userCartData, setUserCartData , adminproductData } = useContext(store)

  const [cartBtnStatus, setCartBtnStatus] = useState({});


  function CartButton(product) {
    const userToken = JSON.parse(sessionStorage.getItem("Token"))
    const buttonStatus = cartBtnStatus[product._id]

    if (!userToken) {
      return (
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => window.alert("Please Login First")}
        >
          Add To Cart
        </button>
      )
    }

    // FIRST CHECK LOADING
    if (buttonStatus === "loading") {
      return (
        <button className="btn btn-danger" type="button" disabled>
          <span className="spinner-border spinner-border-sm"></span>
          Loading...
        </button>
      )
    }

    // THEN CHECK IF ALREADY IN CART
    const isExist = userCartData?.find(
      item => product._id === item.productId
    )
    if (isExist) {
      return (
        <button type="button" className="btn btn-success">
          Added To Cart
        </button>
      )
    }

    // DEFAULT BUTTON
    return (
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => AddtoCartFun(product)}
      >
        Add To Cart
      </button>
    )
  }


  function AddtoCartFun(productItem) {
    setCartBtnStatus(prev => ({
      ...prev,
      [productItem._id]: "loading"
    }));
    let token = JSON.parse(sessionStorage.getItem("Token"))
    if (token) {
      const headers = {
        "Authorization": `${token}`
      }
      axios.put(`https://mernecommerce-22ox.onrender.com/addCartItem/${productItem._id}`, productItem, { headers }).then((res) => {

        if (res.data.result) {
          setUserCartData(prevCartData => [
            ...prevCartData,
            res.data.result.CartItems[res.data.result.CartItems.length - 1]

          ]);
          setCartBtnStatus(prev => ({
            ...prev,
            [productItem._id]: "added"
          })); // After success, set status to "added"
        }
      })
    }
  }

  const filterProductsFun = (e) => {
    setSearchInput(e.target.value)
    let filterProducts = adminproductData.filter((product) => {
      if (`${product.Title}${product.Description}${product.Category}${product.subCategory}${product.Brand}`.toLowerCase().includes(e.target.value.toLowerCase())) {
        return true
      }
    })
    setFilterData(filterProducts)
  }

  const displayProductsFun = () => {
    if (searchInput != "" && filterData.length > 0) {
      return <FilterProducts filterData={filterData} CartButton={CartButton} />
    } else if (searchInput != "" && filterData.length === 0) {
      return <div style={{ display: "flex", height: "70vh", justifyContent: "center", alignItems: "center" }}><h1>No Product Found</h1></div>
    } else if (searchInput === "") {
      return <AllProducts CartButton={CartButton} />
    }
  }


  return (<>
    <div className='container-fluid' style={{ margin: "50px 0px" }}>
      <div style={{ textAlign: "center" }}><input style={{ margin: "20px", width: "30%", border: "2px solid black" }} type='text' placeholder='Search Any Product or Brand or Category' onChange={(e) => { filterProductsFun(e) }} /></div>
      {displayProductsFun()}
    </div>

  </>)

}

export default DisplayProducts