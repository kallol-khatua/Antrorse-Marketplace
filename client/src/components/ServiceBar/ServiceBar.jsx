import React from "react";
import { Ri24HoursFill } from "react-icons/ri";
import { BsBoxSeam } from "react-icons/bs";
import { BiSupport } from "react-icons/bi";
import { FaWallet } from "react-icons/fa";

const ServiceBar = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 xl:gap-8 py-5 md:py-8 xl:px-20 gap-2 p-2 md:gap-4 md:px-4 ">
      <div className="div bg-gray-200 rounded-lg flex p-3 xl:py-4 xl:pl-6 gap-4 xl:gap-8 items-center">
        <Ri24HoursFill className="xl:text-4xl md:text-2xl text-xl" />
        <div>
          <p className="xl:text-lg md:text-sm text-[12px] font-semibold md:font-bold">
            Super Fast
          </p>
          <p className="text-[12px] ">Free Delivery</p>
        </div>
      </div>
      <div className="div bg-gray-200 rounded-lg flex p-3 xl:py-4 xl:pl-6 gap-4 xl:gap-8 items-center">
        <BsBoxSeam className="xl:text-4xl md:text-2xl text-xl" />
        <div>
          <p className="xl:text-lg md:text-sm text-[12px] font-semibold md:font-bold">
            Non Contact{" "}
          </p>
          <p className="text-[12px] ">Shipping</p>
        </div>
      </div>
      <div className="div bg-gray-200 rounded-lg flex p-3 xl:py-4 xl:pl-6 gap-4 xl:gap-8 items-center">
        <BiSupport className="xl:text-4xl md:text-2xl text-xl" />
        <div>
          <p className="xl:text-lg md:text-sm text-[12px] font-semibold md:font-bold">
            Support 24/7{" "}
          </p>
          <p className="text-[12px]">Shop with expert</p>
        </div>
      </div>
      <div className="div bg-gray-200 rounded-lg flex p-3 xl:py-4 xl:pl-6 gap-4 xl:gap-8 items-center">
        <FaWallet className="xl:text-4xl md:text-2xl text-xl" />
        <div>
          <p className="xl:text-lg md:text-sm text-[12px] font-semibold md:font-bold">
            Super Secure
          </p>
          <p className="text-[12px] ">Payment System</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceBar;
