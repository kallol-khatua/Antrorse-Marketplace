import React, { useState } from "react";

const FooterBottom = () => {
  // const [data,setData]=useState(["Terms & ConditionsShipping", "PolicyCancellation" ,"Policy" ,"Privacy Policy"])
  return (
    <div className="bg-gray-600 flex flex-col justify-items-center text-center text-gray-300 ">
      <div className=" flex justify-evenly mx-90">
        <a href="#">Terms & ConditionsShipping</a>
        <a href="">PolicyCancellation</a>
        <a href="">Policy</a>
        <a href=""></a>
        <a href="">Privacy Policy</a>
      </div>
      <div className="my-5">© 2024 ANTRORSE All Rights Reserved.</div>
    </div>
  );
};

export default FooterBottom;
