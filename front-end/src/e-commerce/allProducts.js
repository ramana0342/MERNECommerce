import React from 'react'
import { useContext } from 'react'
import { store } from './EApp'
import SheimerEffect from './sheimerEffect'

function AllProducts({CartButton,AddtoCartFun}) {
   
   const {adminproductData,setAdminProductData} = useContext(store)
  return (
    <div class="row row-cols-1 row-cols-md-3 g-4">
     {adminproductData.length>0 ? adminproductData.map((product,index)=>{
       //    {console.log(product)}
                            return(<>
                                             
  <div class="col" style={{padding:"0px 50px"}}>
    <div class="productCard card h-100">
      <img className="productImg" src={product.Photo[0]}  />
      <div class="card-body">
        <h5 class="card-title">{product.Title.slice(0,101)}...</h5>
        <p class="card-text" style={{margin:"0px",padding:"0px",display:"flex" , alignItems:"center"}}>
        <span className="circle-star-logo">
        <svg style={{color:"white"}} className='star-logo' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
</svg></span>
<span><b>{product.Rating}</b></span>
</p>
        <p style={{margin:"0px",padding:"0px"}} className='card-text'>Price : <b>{product.Price}</b><i style={{fontSize:"13px",margin:"0px 3px"}} class="fa-solid fa-indian-rupee-sign"></i></p>
        <p class="card-text">{product.Description.slice(0,200)}...</p>
        <div style={{textAlign:"center"}}>{CartButton(product)}</div>
      </div>
    </div>
  </div>
  
                            </>)
     }): <SheimerEffect/> }

     </div>
  )
}

export default AllProducts