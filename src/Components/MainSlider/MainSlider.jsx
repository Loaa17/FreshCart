import React from 'react'
import slider1 from '../../assets/slider-image-1.jpeg'
import slider2 from '../../assets/slider-image-2.jpeg'
import slider3 from '../../assets/slider-image-3.jpeg'
import slider4 from '../../assets/grocery-banner.png'
import slider5 from '../../assets/grocery-banner-2.jpeg'

import Slider from "react-slick";


export default function MainSlider() {



    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
       
    };


  return (
<>

<div className="row mb-20 object-cover">

<div className="w-3/4">

<Slider {...settings}>
<img src={slider1} className='w-full h-[400px]' alt="" />
<img src={slider3} className='w-full h-[400px]' alt="" />
<img src={slider5} className='w-full h-[400px]' alt="" />
</Slider>

</div>

<div className="w-1/4">

<img src={slider2} className='w-full h-[200px]' alt="" />

<img src={slider3} className='w-full h-[200px]' alt="" />

</div>

</div>


</>

)
}
