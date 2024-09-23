import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import useProducts from '../../Hooks/useProducts';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';





export default function Products(props) {

 let {data , isError  , isLoading } = useProducts()


 let {addProductCart} = useContext(CartContext);

async function addToCart(id){
 let response = await addProductCart(id);

 if(response.data.status == "success"){

  toast.success(response.data.message);  

 }
 else{
  toast.error(response.data.message);  

 }
}
  
  if (isError){
    return <h2>error</h2>
  }
  
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

<h2 className=' font-bold text-emerald-500 text-4xl text-center py-4'>Our Products</h2>

     
     <div className="row">

     {data?.data?.data?.map((product)=> (
     <div key={product.id} className=' md:w-1/3 lg:w-1/4'>
   
   <div className="card hover:shadow-emerald-500 m-1 hover:rounded-lg hover:shadow-md ">
     <div className="product mb-3">
     <Link to={`productdetails/${product.id}/${product.category.name}`}>
  <img src={product.imageCover} className='w-full' alt="" />
  <h4 className='mb-1 text-emerald-500'>{product.category.name}</h4>
  <h3 className='font-semibold mb-4'>{product.title.split(" ").slice(0,2).join(" ")}</h3>
  <div className='flex justify-between'>
      <span>{product.price} EGP</span>
      <span><i className='fas fa-star text-yellow-300'></i> {product.ratingsAverage}</span>
  </div>
  </Link>
  <span className='float-right mr-1 text-lg hover:text-red-600 mt-3'><i className="fa-solid fa-heart"></i></span>

  <button className='btn ml-16 w-3/5' onClick={()=>addToCart(product.id)}>+ Add to Cart</button>
     </div>
     </div>
   
     </div>
     ))}
     </div>
  
     </>
    )
}
