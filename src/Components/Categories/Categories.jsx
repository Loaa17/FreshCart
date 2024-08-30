import axios from 'axios'
import React, {  useEffect, useState } from 'react'
import useProducts from '../../Hooks/useProducts';




export default function Categories() {

  let { isLoading } = useProducts()


const [categories, setcategories] = useState([])
  function getCategories(){

axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
.then((res)=>{
  setcategories(res.data.data)
})
.catch((res)=>{
})


  }

  useEffect(()=>{
    getCategories()
  } , [])


  if (isLoading){
    return (
    <>
    <div className="spinner">
    <div className="double-bounce1"></div>
    <div className="double-bounce2"></div>
  </div>
    </>
    )
  }


  return (
   <>

   <h1 className='text-center my-10 text-emerald-500 text-4xl font-bold'>Categories</h1>
   
   <div className="row">
   {categories.map((category)=> (
   <div key={category.id} className='w-1/3'>
 
 <div className="card hover:shadow-emerald-500 m-1 hover:rounded-lg hover:shadow-md duration-75">
   <div className="product mb-3">
  
<img src={category.image} className='w-full h-[350px] object-cover' alt="" />
<h4 className='mb-1 text-emerald-500 text-center text-2xl font-semibold'>{category.name}</h4>



   </div>
   </div>
 
   </div>
   ))}
   </div>

   </>
  )
}
