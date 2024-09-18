import React from 'react'
import video from '../../assets/images/video.mp4'
import video1 from '../../assets/images/video2.mp4'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const FooterBanner = () => {
  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: true,
  };
  return (
    <div className='mb-10 mt-8 sm:mt-0 sm:mb-24 p-8 flex flex-col justify-center items-center bg-[#EFF2F5]'>
      <div>
        <h3 className='text-sm sm:text-2xl font-bold sm:px-8 pb-8 text-center'>Good For You, Good For The Planet & Good For The People Who Make It.</h3>
      </div>
      <Slider {...settings} className='w-[90vw] lg:w-[70vw] video'>
        <video className=" w-[95vw] lg:w-[75vw] rounded-[15px] "  autoPlay loop muted>
          <source src={video} type="video/mp4" />
        </video>
        <video className=" w-[95vw] lg:w-[75vw] rounded-[15px] " autoPlay loop muted>
          <source src={video1} type="video/mp4" />
        </video>
      </Slider>
    </div>
  )
}
export default FooterBanner;