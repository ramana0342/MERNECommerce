import React from 'react'

import { useState } from 'react'
import axios from "axios"
import "./uploadproduct.scss";
import { store } from './EApp';
import { useContext } from 'react';

function UploadProduct() {


  const { adminproductData, setAdminProductData } = useContext(store)


  const [productData, setProductData] = useState({ Title: "", Description: "", Price: null, Rating: null, Photo: [], Category: "", subCategory: "", Brand: "" })
  const [imageFile, setImageFiles] = useState({ Photo: [] })
  const [fileSizeError, setFileSizeError] = useState()
  const [uploadBtnStatus, setUploadBtnStatus] = useState()



  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadBtnStatus("Loading...");

    let token = JSON.parse(sessionStorage.getItem("adminToken"));
    if (!token) return window.alert("You are not Admin");

    const formData = new FormData();
    formData.append("Title", productData.Title);
    formData.append("Description", productData.Description);
    formData.append("Price", productData.Price);
    formData.append("Rating", productData.Rating);
    formData.append("Category", productData.Category);
    formData.append("subCategory", productData.subCategory);
    formData.append("Brand", productData.Brand);

    imageFile.Photo.forEach(file => formData.append("Photo", file));

    try {
      const res = await axios.post(
        //"http://localhost:8080/upload/product",
        "https://mernecommerce-22ox.onrender.com/upload/product",
        formData,
        {
          headers: {
            Authorization: token,
          }
        }
      );

      if (res.data.messege === "Success") {
        setAdminProductData([...adminproductData, res.data.responseData]);

        setProductData({ Title: "", Description: "", Price: "", Rating: "", Photo: [], Category: "", subCategory: "", Brand: "" });
        setImageFiles({ Photo: [] });
        setUploadBtnStatus("");
      }

    } catch (error) {
      console.log(error);
      setUploadBtnStatus("");
    }
  };




  const handleChangeImage = (field, files) => {
    setFileSizeError(false);

    const validFiles = [];
    let valid = true;

    Array.from(files).forEach(file => {
      if (file.size <= 262144) {  // Max File Size 256 KB
        validFiles.push(file);
      } else {
        valid = false;
      }
    });

    if (!valid) {
      setFileSizeError(true);
      setImageFiles({ Photo: [] });
    } else {
      setImageFiles(prev => ({ Photo: [...prev.Photo, ...validFiles] }));
    }
  };




  const handleChaneg = (field, value) => {

    setProductData({ ...productData, [field]: value })

  }



  return (
    <>
      <section id="uploadProductSection">
        <form onSubmit={handleSubmit} className='upload-product-form'>
          <div>
            <label>Upload Image:</label>

            <input
              type="file"
              name="Photo"
              accept="image/*"
              multiple
              className='upload-file-input-field'
              required
              onChange={(e) => handleChangeImage("Photo", e.target.files)}
            />


            {fileSizeError ? <b>Min File Size 256KB</b> : ""}
          </div>

          <div>
            <label>Title:</label>
            <input value={productData.Title} type='text' placeholder='Enter Product Title' required onChange={(e) => { handleChaneg("Title", e.target.value) }} />
          </div>

          <div>
            <label>Description:</label>
            <textarea value={productData.Description} placeholder='Enter Product Description' required onChange={(e) => { handleChaneg("Description", e.target.value) }} />
          </div>

          <div>
            <label>Price:</label>
            <input value={productData.Price} type='number' placeholder='Enter Product Price' onChange={(e) => { handleChaneg("Price", e.target.value) }} />
          </div>


          <div>
            <label>Rating:</label>
            <input value={productData.Rating} type="number" step="0.1" min="0" max="5" required onChange={(e) => { handleChaneg("Rating", e.target.value) }} />
          </div>

          <div>
            <label>Category:</label>
            <input value={productData.Category} type='text' placeholder='Enter Product Category' onChange={(e) => { handleChaneg("Category", e.target.value) }} />
          </div>

          <div>
            <label>Sub Category:</label>
            <input value={productData.subCategory} type='text' placeholder='Enter Product Sub Category' onChange={(e) => { handleChaneg("subCategory", e.target.value) }} />
          </div>

          <div>
            <label>Brand:</label>
            <input value={productData.Brand} type='text' placeholder='Enter Product Brand' onChange={(e) => { handleChaneg("Brand", e.target.value) }} />
          </div>



          <div style={{ textAlign: "center", padding: "6px" }}>{uploadBtnStatus ? <button class="btn btn-info" type="button" disabled>
            <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
            <span role="status">Uploading...</span>
          </button> : <button type="submit button" class="btn btn-primary">Upload</button>}</div>
        </form>
      </section>
    </>
  )
}

export default UploadProduct;


