import React from "react";
import image from "../../assets/images/banner-1.png"
import image1 from "../../assets/images/banner-3.png"
import image2 from "../../assets/images/banner-2.png"
import { Link } from "react-router-dom";

const item = [
  {
    id: 1,
    img:image
  },
  {
    id: 2,
    img:image1
  },
  {
    id: 3,
    img:image2
  },
];
const Banner = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  mt-10 ">
      {item &&
        item.map((item) => (
          <div
            key={item.id}
            className="banner-box relative h-80 w-full sm:w-1/2 md:w-full p-4 flex justify-end"
          >
            <img
              className="w-full h-full object-cover rounded-sm"
              src={item.img}
            />
            <div className="absolute top-0 left-0 w-full h-full flex justify-end flex-col text-white p-8">
              <h4 className="text-xl font-semibold">Special Deals</h4>
              <h2 className="text-2xl font-extrabold">Don't Miss Out!</h2>
              <span className="font-medium pb-10">
                Limited-time offers on top fashion items
              </span>
<Link to={"/404"}>
              <button className="white-button w-1/3 p-2 border rounded-sm  transition duration-200 ease-in-out hover:bg-teal-600 hover:border-teal-600  sm:w-1/2 md:w-1/3">
                Learn more
              </button> </Link>
            </div>
          </div>
        ))}
    </section>
  );
};

export default Banner;
