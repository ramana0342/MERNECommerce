import React from 'react'

import { useState } from 'react'
import axios from "axios"
import "./uploadproduct.css";
import { store } from './EApp';
import { useContext } from 'react';

function UploadProduct() {
  
        
        const {adminproductData,setAdminProductData} = useContext(store)
    
      
        const [productData,setProductData] = useState({Title:"",Description:"",Price:null, Rating:null, Photo:[],Category:"",subCategory:"",Brand:""})
        const [imageFile,setImageFiles] = useState({Photo:[]})
        const [fileSizeError,setFileSizeError] = useState()
        const [uploadBtnStatus,setUploadBtnStatus] = useState()
    
        const  handleSubmit=async(e)=>{
             setUploadBtnStatus("Loading...")
             e.preventDefault()
             let token = JSON.parse(sessionStorage.getItem("adminToken"))
             if(token){
                        
             let promices = imageFile.Photo.map((file,index)=>{
                    
              const imageFormData = new FormData()
          
              imageFormData.append('file', file);
              imageFormData.append('upload_preset', 'myrr_image_upload');
         
           
              return  axios.post('https://api.cloudinary.com/v1_1/dvfy5rpzk/image/upload', imageFormData)
              
               })
    
               let Responces =await Promise.all(promices)
           
               let imageURLS= Responces.map((responce,index)=>{
                   return responce.data.secure_url
    
                         })
                 // console.log(imageURLS)
        
              setProductData((prevData)=> ({...prevData,Photo:imageURLS}))
    
          //    console.log(productData)
       
               
            
            const headers = {
                   "Authorization": `${token}`
            }
    
    
             axios.post("https://mernecommerce-22ox.onrender.com/uploadImage", { ...productData, Photo: imageURLS } , {headers}).then((res)=>{
                //  console.log(res)
                  if(res.data.Messege=="Success"){
                  setAdminProductData([...adminproductData,res.data.responceData])
                  setUploadBtnStatus()
                 setProductData({Title:"",Description:"",Price:null, Rating:null, Photo:[],Category:"",subCategory:"",Brand:""})
                  }
             }).catch((err)=>{
                   console.log(err)
             })
            }else{
               window.alert("Your Not Admin")
            }
            
          
        }
    
    
        const handleChangeImage = (field,value)=>{
          setFileSizeError()
        //  console.log(value)
          if(value.size <= 262144){
               
       //   console.log(value)
          setImageFiles({...imageFile, [field]:[...imageFile.Photo,value]})
          }else{
             setFileSizeError(true)
             setImageFiles({Photo:[]})
             
          }
        }
               
    
           
      const handleChaneg=(field,value)=>{
           
             setProductData({...productData,[field]:value})
            
        }
    
         
     // console.log(productData)
    
    
    
      return (
        <>
        <section id="uploadProductSection">
        <form onSubmit={handleSubmit}>
        <div>
        <label>Upload Image:</label>
            <input  type="file" accept="image/*" required onChange={(e)=>handleChangeImage("Photo",e.target.files[0])}/>
             {fileSizeError ? <b>Min File Size 256KB</b> :""}
        </div>
    
        <div>
          <label>Title:</label>
          <input value={productData.Title} type='text' required  onChange={(e)=>{ handleChaneg("Title",e.target.value)}}/>
        </div>
    
        <div>
          <label>Description:</label>
          <textarea value={productData.Description} required  onChange={(e)=>{ handleChaneg("Description",e.target.value)}} />
        </div>
    
        <div>
          <label>Price:</label>
          <input value={productData.Price} type='number'  onChange={(e)=>{ handleChaneg("Price",e.target.value)}} />
        </div>
    
    
        <div>
          <label>Rating:</label>
          <input value={productData.Rating} type="number" step="0.1" min="0" max="5" required  onChange={(e)=>{ handleChaneg("Rating",e.target.value)}}/>
        </div>

        <div>
          <label>Category:</label>
          <input value={productData.Category} type='text'  onChange={(e)=>{ handleChaneg("Category",e.target.value)}} />
        </div>

        <div>
          <label>Sub Category:</label>
          <input value={productData.subCategory} type='text'  onChange={(e)=>{ handleChaneg("subCategory",e.target.value)}} />
        </div>

        <div>
          <label>Brand:</label>
          <input value={productData.Brand} type='text'  onChange={(e)=>{ handleChaneg("Brand",e.target.value)}} />
        </div>
    
    
      
        <div style={{textAlign:"center",padding:"6px"}}>{uploadBtnStatus ? <button class="btn btn-info" type="button" disabled>
  <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
  <span role="status">Uploading...</span>
</button> : <button type="submit button" class="btn btn-primary">Upload</button>}</div>
        </form>
        </section>
        </>
      )
    }
    
    export default UploadProduct;


