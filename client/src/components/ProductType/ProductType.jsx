import React, { useState } from "react";
// import Model from './Model';
import Model from "./Model";
import { CiMobile3 } from "react-icons/ci";
import { MdLaptopMac } from "react-icons/md";
import { IoShirtOutline, IoWatchOutline } from "react-icons/io5";
import { IoMdCloseCircle } from "react-icons/io";
import { MdLocalGroceryStore } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";

import ClothingForm from "../selllerform/ClothingForm";
import ElectronicsForm from "../selllerform/ElectronicsForm";
import DefaultForm from "../selllerform/Defaultform";
import GroceryForm from "../selllerform/GroceryForm";

// ProductType.jsx

// ... (import statements)

const ProductType = ({ handleVariation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [category, setCategory] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product:", product);
  };
  const handleAddProductCategory = (newCategory) => {
    setCategory(newCategory);
  };
  const handleDelete = () => {
    setCategory(() => category.pop());
  };

  const [selectedCategory, setSelectedCategory] = useState("Clothing");

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const [product, setProduct] = useState({
    description: "",
    tags: [],
    coverimage: "",
    photos: [],
  });

  // const handleVariation = (e) => {
  //   const { name, value } = e.target;
  //   setProduct((prevProduct) => ({
  //     ...prevProduct,
  //     [name]: value,
  //   }));
  // };

  return (
    <div className="rounded-md shadow-md m-2 mr-20 w-full border p-2 bg-white ">
      <div className="flex justify-between border-b-2 mb-2 ">
        <h1 className="font-bold text-lg m-3">Product Type</h1>
        <div className="text-blue-900 "></div>
      </div>
      <div className="flex gap-2  flex-wrap   items-center cursor-pointer">
        <div
          className={`px-2 py-1  flex items-center justify-center rounded-md shadow-sm gap-2 ${
            selectedCategory === "Electronics" ? "bg-blue-500" : "bg-slate-200"
          }`}
          onClick={() => handleCategoryClick("Electronics")}
        >
          <div className="font-bold w-6 h-8 flex items-center justify-center rounded-sm">
            <CiMobile3 />
          </div>
          <div>
            <h1 className="text-md font-bold pr-4">Electronics</h1>
          </div>
        </div>

        <div
          className={`px-2 py-1 flex items-center justify-center rounded-md shadow-sm gap-2 ${
            selectedCategory === "Clothing" ? "bg-blue-500" : "bg-slate-200"
          }`}
          onClick={() => handleCategoryClick("Clothing")}
        >
          <div className="font-bold w-6 h-8 flex items-center justify-center rounded-sm">
            <IoShirtOutline />
          </div>
          <div>
            <h1 className="text-md font-bold pr-4">Clothing</h1>
          </div>
        </div>
        {/* <div
          className={`px-2 py-1 flex items-center justify-center rounded-md shadow-sm gap-2 ${
            selectedCategory === "Grocery" ? "bg-blue-500" : "bg-slate-200"
          }`}
          onClick={() => handleCategoryClick("Grocery")}
        >
          <div className="font-bold w-6 h-8 flex items-center justify-center rounded-sm">
            <MdLocalGroceryStore />
          </div>
          <div>
            <h1 className="text-md font-bold pr-4">Grocery</h1>
          </div>
        </div> */}

        {category.name ? (
          <div
            className={`px-2 py-1  flex items-center justify-center rounded-md shadow-sm gap-2 ${
              selectedCategory === "default" ? "bg-blue-500" : "bg-slate-200"
            }`}
            onClick={() => handleCategoryClick("default")}
          >
            <div className="font-bold  w-6 h-8 flex items-center justify-center rounded-sm">
              {category.logo}
            </div>
            <div>
              <h1 className="text-md font-bold ">{category.name}</h1>
            </div>
            <IoMdCloseCircle
              size={"1.5rem"}
              className="text-red-600 "
              onClick={() => setCategory({})}
            />
          </div>
        ) : null}

        {!category.name ? (
          <button
            className="flex gap-2 text-center font-semibold text-lg m-3 cursor-pointer "
            onClick={() => setModalVisible(true)}
          >
            <FaPlus className="mt-1" /> Add Category
          </button>
        ) : null}
      </div>
      {isModalVisible && (
        <Model
          setModalVisible={setModalVisible}
          handleAddProductCategory={handleAddProductCategory}
        />
      )}

      {/* new */}
      <div>
        {selectedCategory === "Clothing" && (
          <ClothingForm product={product} handleVariation={handleVariation} />
        )}

        {selectedCategory === "Electronics" && (
          <ElectronicsForm
            product={product}
            handleVariation={handleVariation}
          />
        )}

        {selectedCategory === "Grocery" && (
          <GroceryForm
            product={product}
            handleVariation={handleVariation}
            handleSubmit={handleSubmit}
          />
        )}

        {selectedCategory === "default" && (
          <DefaultForm
            product={product}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default ProductType;
