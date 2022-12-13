import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"

const SliderArea = () =>
{
  const settings =
  {
    autoplay:true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
  }

  const sliderImages = [
    {src:`URL('${process.env.PUBLIC_URL}/images/slider_1.jpg')`},
    {src:`URL('${process.env.PUBLIC_URL}/images/slider_2.jpg')`}
  ]

  return(
    <Slider>
      {Array.isArray(sliderImages) && sliderImages.map((sliderImage, i)=>(
        <div className="slider_box" key={i}>
          <div className="slider_item">
            <img src={process.env.PUBLIC_URL + '/images/top-img.jpg'} alt="" />
          </div>
        </div>
      ))}
    </Slider>
  )
}

export default SliderArea