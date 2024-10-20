/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { CiMobile3 } from "react-icons/ci";

import ClothingForm from "./ClothingForm";
import ElectronicsForm from "./ElectronicsForm";
import DefaultForm from "./Defaultform";
// import GroceryForm from "./GroceryForm";
import FoodsAndBeverages from "./FoodsAndBeverages";
import Footwears from "./Footwears";

const ProductType = () => {
  const [selectedCategory, setSelectedCategory] = useState("Foods & Beverages");

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const [productCategories, setProductCategories] = useState([
    "Foods & Beverages",
    "Clothings",
    // "Footwears",
    // "Electronics",
    "Default",
  ]);

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

            {selectedCategory === "Clothings" && <ClothingForm />}

            {/* {selectedCategory === "Footwears" && <Footwears />} */}

            {/* {selectedCategory === "Electronics" && <ElectronicsForm />} */}

            {/* {selectedCategory === "Grocery" && (
              <GroceryForm
                product={product}
                handleVariation={handleVariation}
                handleSubmit={handleSubmit}
              />
            )} */}

            {selectedCategory === "Default" && <DefaultForm />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductType;
