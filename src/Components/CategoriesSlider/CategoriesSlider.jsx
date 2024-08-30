import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";


export default function CategoriesSlider() {

    const [categories, setcategories] = useState([] )



        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 7,
            slidesToScroll: 2   ,
            autoplay:true,
            autoplaySpeed: 1000,
        };



function getCategories(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    .then((res)=>{
        setcategories(res.data.data);
        
    })
}

useEffect(()=>{
    getCategories()
} , [])


  return (
    <>
<h2 className='capatalize my-3 text-gray-600 text-lg font-semibold'>shop popular products</h2>

     <Slider {...settings}>
        {categories.map((category)=> <div key={category.name}> 
            <img src={category.image} className='w-full h-[200px] object-cover' alt="" />
            <h4>{category.name}</h4>
        </div>   )}
     </Slider>
    </>
  )
}
