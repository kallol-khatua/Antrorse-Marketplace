import { useEffect, useState } from "react";
import axiosInstanceSeller from "../../axiosInstanceSeller";
import { toast } from "react-toastify";

function Footwears() {
  return (
    <div>
      <div className=" mx-auto p-6  pt-2 bg-white rounded-md shadow-sm  border ">
        <h2 className="text-lg text-start font-bold m-3">
          Product Information
        </h2>
      </div>
    </div>
  );
}

export default Footwears;
