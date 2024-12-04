import React from 'react'

import { useState } from 'react'
import axios from "axios"
import "./uploadproduct.css";

function UploadProduct() {
  
        
 
    
      
        const [productData,setProductData] = useState({Title:"",Description:"",Price:null, Rating:null, Photo:[],Category:"",subCategory:"",Brand:""})
        const [imageFile,setImageFiles] = useState({Photo:[]})
        const [fileSizeError,setFileSizeError] = useState()
    
    
        const  handleSubmit=async(e)=>{
             
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
                  console.log(imageURLS)
        
              setProductData((prevData)=> ({...prevData,Photo:imageURLS}))
    
          //    console.log(productData)
       
               
            
            const headers = {
                   "Authorization": `${token}`
            }
    
    
             axios.post("http://localhost:8080/uploadImage", { ...productData, Photo: imageURLS } , {headers}).then((res)=>{
                  console.log(res)
             }).catch((err)=>{
                   console.log(err)
             })
            }else{
               window.alert("Your Not Admin")
            }
            
          
        }
    
    
        const handleChangeImage = (field,value)=>{
          setFileSizeError()
          console.log(value)
          if(value.size <= 262144){
               
          console.log(value)
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
          <input type='text' required  onChange={(e)=>{ handleChaneg("Title",e.target.value)}}/>
        </div>
    
        <div>
          <label>Description:</label>
          <textarea required  onChange={(e)=>{ handleChaneg("Description",e.target.value)}} />
        </div>
    
        <div>
          <label>Price:</label>
          <input type='number'  onChange={(e)=>{ handleChaneg("Price",e.target.value)}} />
        </div>
    
    
        <div>
          <label>Rating:</label>
          <input type="number" step="0.1" min="0" max="5" required  onChange={(e)=>{ handleChaneg("Rating",e.target.value)}}/>
        </div>

        <div>
          <label>Category:</label>
          <input type='text'  onChange={(e)=>{ handleChaneg("Category",e.target.value)}} />
        </div>

        <div>
          <label>Sub Category:</label>
          <input type='text'  onChange={(e)=>{ handleChaneg("subCategory",e.target.value)}} />
        </div>

        <div>
          <label>Brand:</label>
          <input type='text'  onChange={(e)=>{ handleChaneg("Brand",e.target.value)}} />
        </div>
    
    
      
        <div style={{textAlign:"center",padding:"6px"}}><button type='submit'>Upload</button></div>
        </form>
        </section>
        </>
      )
    }
    
    export default UploadProduct;


