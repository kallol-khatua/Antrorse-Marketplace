/* eslint-disable react/prop-types */
import React, { useState } from "react";
// import Model from './Model';
import Model from "./Model";
import { CiMobile3 } from "react-icons/ci";
import { MdLaptopMac } from "react-icons/md";
import { IoShirtOutline, IoWatchOutline } from "react-icons/io5";
import { IoMdCloseCircle } from "react-icons/io";
import { MdLocalGroceryStore } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";

import ClothingForm from "./ClothingForm";
import ElectronicsForm from "./ElectronicsForm";
// import DefaultForm from "./Defaultform";
// import GroceryForm from "./GroceryForm";
import FoodsAndBeverages from "./FoodsAndBeverages";

// ProductType.jsx

// ... (import statements)

const ProductType = () => {
  const [category, setCategory] = useState({});
  const [basicProductInfo, setBasicProductInfo] = useState({
    product_name: "",
    description: "",
    quantity: "",
    min_order_quantity: "",
    actual_price: "",
    offered_price: "",
    unit_of_measurement: "piece",
    location: "",
  });

  const handleVariation = (type, value) => {
    setBasicProductInfo((prev) => ({
      ...prev,
    }));
  };

  const resetProduct = () => {
    setBasicProductInfo({
      product_name: "",
      description: "",
      quantity: "",
      min_order_quantity: "",
      actual_price: "",
      offered_price: "",
      unit_of_measurement: "piece",
      location: "",
    });
  };

  const handleSubmit = (e) => {
    console.log(basicProductInfo);
    e.preventDefault();
    console.log("Product:", product);
  };
  const handleAddProductCategory = (newCategory) => {
    setCategory(newCategory);
  };
  const handleDelete = () => {
    setCategory(() => category.pop());
  };

  const [selectedCategory, setSelectedCategory] = useState("Foods & Beverages");

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const [product, setProduct] = useState({
    description: "",
    tags: [],
    coverimage: "",
    photos: [],
  });

  const [productCategories, setProductCategories] = useState([
    "Foods & Beverages",
    "Clothings",
    "Footwears",
    "Electronics",
  ]);

  // const handleVariation = (e) => {
  //   const { name, value } = e.target;
  //   setProduct((prevProduct) => ({
  //     ...prevProduct,
  //     [name]: value,
  //   }));
  // };

  const handleChange = () => {};

  return (
    <div className="w-full">
      <div className="">
        <div className="rounded-md shadow-md m-2 mr-20 w-full border p-2 bg-white ">
          <div className="flex justify-between border-b-2 mb-2 ">
            <h1 className="font-bold text-lg m-3">Product Type</h1>
            <div className="text-blue-900 "></div>
          </div>
          <div className="flex gap-2 items-center cursor-pointer overflow-x-auto whitespace-nowrap py-2">
            {productCategories.map((productCategory, index) => {
              return (
                <div
                  key={index}
                  className={`px-2 py-1 flex items-center justify-center rounded-md shadow-sm gap-2 ${
                    selectedCategory === productCategory
                      ? "bg-blue-500"
                      : "bg-slate-200"
                  }`}
                  onClick={() => handleCategoryClick(productCategory)}
                >
                  <div className="font-bold w-6 h-8 flex items-center justify-center rounded-sm">
                    <CiMobile3 />
                  </div>
                  <div>
                    <h1 className="text-md font-bold pr-4">
                      {productCategory}
                    </h1>
                  </div>
                </div>
              );
            })}
          </div>

          {/* new */}
          <div>
            {selectedCategory === "Foods & Beverages" && <FoodsAndBeverages />}

            {selectedCategory === "Electronics" && (
              <ElectronicsForm
                product={product}
                handleVariation={handleVariation}
              />
            )}

            {selectedCategory === "Clothings" && (
              <ClothingForm
                product={product}
                handleVariation={handleVariation}
              />
            )}

            {/* {selectedCategory === "Grocery" && (
              <GroceryForm
                product={product}
                handleVariation={handleVariation}
                handleSubmit={handleSubmit}
              />
            )} */}

            {/* {selectedCategory === "default" && (
              <DefaultForm
                product={product}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              />
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductType;
