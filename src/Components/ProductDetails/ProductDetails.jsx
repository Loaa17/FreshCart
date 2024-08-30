import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Slider from "react-slick";



export default function ProductDetails() {

    const [product, setproduct] = useState(null )
    const [relatedProducts, setrelatedProducts] = useState([])

let {id , category} = useParams();

var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

function getProduct(id){

axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
.then((res)=>{
    setproduct(res.data.data) ;
})

.catch((res)=>{
    console.log("there is an error");
    
})


}


function getAllProducts(){
  axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  .then((res)=>{

   let related = res.data.data.filter((product) => product.category.name == category);

   setrelatedProducts(related)   
    
  })
}

useEffect(()=>{
  getProduct(id);
  getAllProducts()
} , [id , category])


return (
  <>
  <div className="row items-center">
  <div className="w-1/4">

  <Slider {...settings}>

{product?.images.map( (src)=> <img src={src} className='w-full' alt="" /> )}

  </Slider>
  
  
  
  </div>

  <div className="w-3/4 p-4">

  <h2 className='font-semibold capitalize text-2xl'>{product?.title}</h2>
  <p className='text-gray-500 my-4'>{product?.description}</p>

  <span className='text-emerald-500 capitalize text-lg '>{product?.category.name}</span>


  <div className='flex justify-between my-5 '>
  <span>{product?.price} EGP</span>
  <span><i className='fas fa-star text-yellow-300'></i> {product?.ratingsAverage}</span>
</div>
<span className='float-right text-3xl mt-2 hover:text-red-600'><i className="fa-solid fa-heart"></i></span>


<button className='btn w-3/4  '>+ Add to Cart</button>

  
  
  </div>
  </div>
  
  
  <div className="row mt-32">
   {relatedProducts.length > 0 ? relatedProducts.map((product)=> (
   <div key={product.id} className=' md:w-1/3 lg:w-1/6'>
 
 <div className="card hover:shadow-emerald-500 m-1 hover:rounded-lg hover:shadow-md ">
   <div className="product mb-3">
   <Link to={`/productdetails/${product.id}/${product.category.name}`}>
<img src={product.imageCover} className='w-full' alt="" />
<h4 className='mb-1 text-emerald-500'>{product.category.name}</h4>
<h3 className='font-semibold mb-4'>{product.title.split(" ").slice(0,2).join(" ")}</h3>
<div className='flex justify-between'>
    <span>{product.price} EGP</span>
    <span><i className='fas fa-star text-yellow-300'></i> {product.ratingsAverage}</span>
</div>
<span className='float-right mr-1 text-lg hover:text-red-600'><i className="fa-solid fa-heart"></i></span>
</Link>

<button className='btn w-3/4'>+ Add to Cart</button>
   </div>
   </div>
 
   </div>
   )):<div className="spinner">
   <div className="double-bounce1"></div>
   <div className="double-bounce2"></div>
 </div>}
   </div>
  
  </>
)
}