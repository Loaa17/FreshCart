import axios from 'axios'
import React, {  useEffect, useState } from 'react'



export default function Brands() {

const [brands, setbrands] = useState([])
  function getBrands(){

axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
.then((res)=>{
  setbrands(res.data.data)
})
.catch((res)=>res)


  }


  useEffect(()=>{
    getBrands()
  } , [])





  return (
   <>

   <h1 className='text-center my-10 text-emerald-500 text-4xl font-bold'>All Brands</h1>
   
   <div className="row">
   {brands.map((brand)=> (
   <div key={brand.id} className='w-1/3'>
 
 <div className="card hover:shadow-emerald-500 m-1 hover:rounded-lg hover:shadow-md duration-75">
   <div className="product mb-3">
  
<img src={brand.image} className='w-full object-cover' alt="" />
<h4 className='mb-1 text-emerald-500 text-center font-semibold text-2xl'>{brand.name}</h4>



   </div>
   </div>
 
   </div>
   ))}
   </div>

   </>
  )
}

