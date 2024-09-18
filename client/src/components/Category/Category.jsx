import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import banner1 from '../../assets/images/product-19.png'
import banner2 from '../../assets/images/product-16.png'
import banner3 from '../../assets/images/product-6.jpg'
import banner4 from '../../assets/images/product-2.jpg'
import banner5 from '../../assets/images/product-3.jpg'
import banner6 from '../../assets/images/product-4.jpg'


const Category = () => {
  const categoryList = [
    {
      id: 1,
      img: banner1,
      title: "CAMPHOR DIFUSER",
    },
    {
      id: 2,
      img:banner2,
      title: "METALLIC AGARBATTI ",
    },
    {
      id: 3,
      img: banner3,
      title: "BHEEMSENI CAMPHOR",
    },
    {
      id: 4,
      img:banner4,
      title: "METALLIC DHOOP STICK ",
    },
    {
      id: 5,
      img: banner5,
      title: "METALLIC DHOOP STICK ",
    },
    {
      id: 6,
      img:banner6,
      title: " METALLIC DHOOP CONE ",
    },
    {
      id: 7,
      img: banner3,
      title: "BHEEMSENI CAMPHOR",
    },
    {
      id: 8,
      img: banner2,
      title: "METALLIC AGARBATTI",
    },
  ];

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 800,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: true,
  };

  if (window.innerWidth >= 320 && window.innerWidth <= 640) {
    settings.slidesToShow = 2;
  } else if (window.innerWidth > 640 && window.innerWidth <= 1024) {
    settings.slidesToShow = 4;
  } else {
    settings.slidesToShow = 7;
  }

  return (
    <div className="flex  flex-col items-center justify-center gap-4  py-6  ">
      <h3 className="text-lg md:text-xl lg:text-2xl 2xl:text-3xl font-bold text-left w-full pt-5 lg:pl-20 md:pl-14 pl-4">
        Shop By Category
      </h3>

      <Slider {...settings} className="w-[90vw] h-fit slide ">
        {categoryList.map((category) => (
          <Link
            to="/viewproducts"
            key={category.id}
            className=" w-[15rem] h-[15rem]  cursor-pointer transition-opacity duration-300 group-hover:bg-opacity-0"
          >
            <div className="opacity-80 flex mr-3 items-center justify-center  hover:opacity-100 rounded-md h-full">
              <img
                alt={category.title}
                src={category.img}
                className="rounded-md w-[12rem] bg-gray-200 object-cover h-full"
              />
            </div>
            <h4 className="text-heading pl-4 mt-2 text-sm font-semibold capitalize">
              {category.title}
            </h4>
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default Category;