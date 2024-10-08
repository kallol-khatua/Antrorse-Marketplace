import React, { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
function ClothingForm({ handleVariation }) {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [material, setmaterial] = useState([]);

  const [color, setColor] = useState("");
  const [colors, setColors] = useState([]);

  const [productData, setproductData] = useState({
    product_name: "",
    product_description: "",
    product_type: "Clothings",
    unit_of_measurement: "piece",

    generic_name: "Shirt",
    pack_of: "1",
  });

  const [sizes, setSizes] = useState([
    { label: "XS", value: 0 },
    { label: "S", value: 0 },
    { label: "M", value: 0 },
    { label: "L", value: 0 },
    { label: "XL", value: 0 },
  ]);

  const handleSizeClick = (label, value) => {
    setSizes((prevSizes) =>
      prevSizes.map((size) =>
        size.label === label ? { ...size, value: parseInt(value, 10) } : size
      )
    );
  };

  const handleAddSizeClick = (newSize) => {
    if (
      !sizes.find((size) => size.label.toLowerCase() === newSize.toLowerCase())
    ) {
      setSizes((prevSizes) => [...prevSizes, { label: newSize, value: 0 }]);
    }
  };

  const handleChangecolor = (e) => {
    setColor(e.target.value);
  };

  const handleColorKeydown = (e) => {
    if (e.key === "Enter") {
      const hexRegex = /^#([0-9A-F]{3}){1,2}$/i;

      const newColor = e.target.value.trim().toLowerCase();

      if (hexRegex.test(newColor) && newColor && !colors.includes(newColor)) {
        setColors((prev) => [...prev, newColor]);
        setColor("");
      }
    }
  };

  const handleMaterialKeydown = (e) => {
    if (e.key === "Enter") {
      const newMaterial = e.target.value.trim().toLowerCase();

      if (newMaterial && !material.includes(newMaterial)) {
        setmaterial((prev) => [...prev, newMaterial]);
      }

      e.target.value = "";
    }
  };

  const onCancel = () => {
    setIsInputVisible(false);
  };

  useEffect(() => {
    handleVariation("Material", material);
    handleVariation("colors", colors);
    handleVariation("sizes", sizes);
  }, [material, color, sizes]);

  const handleProductDataChange = (e) => {
    const { name, value } = e.target;
    setproductData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <div className=" mx-auto p-6  pt-2 bg-white rounded-md shadow-sm  border ">
        <h2 className="text-lg text-start font-bold m-3">
          Product Information
        </h2>
        <form>
          <div className="flex gap-x-2 w-full my-1">
            {/* Product name */}
            <div className="text-start flex flex-col w-1/2">
              <label
                className="block text-gray-700 text-md font-bold mb-1 "
                htmlFor="generic_name"
              >
                Generic Name
              </label>
              <select
                id="generic_name"
                name="generic_name"
                value={productData.generic_name}
                onChange={(e) => handleProductDataChange(e)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
              >
                <option value="Shirt">Shirt</option>
                <option value="T Shirt">T Shirt</option>
              </select>
            </div>

            <div className="text-start flex flex-col w-1/2">
              <label
                className="block text-gray-700 text-md font-bold mb-1 "
                htmlFor="pack_of"
              >
                Pack of
              </label>
              <input
                type="number"
                id="pack_of"
                name="pack_of"
                value={productData.pack_of}
                onChange={(e) => handleProductDataChange(e)}
                className="w-full border border-gray-300 p-2 rounded-md placeholder:text-base"
                placeholder="Enter product name here"
              />
            </div>
          </div>

          <div className="flex gap-x-2 w-full my-1">
            {/* Product name */}
            <div className="text-start flex flex-col w-full">
              <label
                className="block text-gray-700 text-md font-bold mb-1 "
                htmlFor="product_name"
              >
                Product Name
              </label>
              <input
                type="text"
                id="product_name"
                name="product_name"
                value={productData.product_name}
                onChange={(e) => handleProductDataChange(e)}
                className="w-full border border-gray-300 p-2 rounded-md placeholder:text-base"
                placeholder="Enter product name here"
              />
            </div>

            {/* <div className="text-start flex flex-col w-1/2">
              <label
                className="block text-gray-700 text-md font-bold mb-2"
                htmlFor="stock"
              >
                Unit of measurement
              </label>
              <select
                id="custom-select"
                name="unit_of_measurement"
                value={productData.unit_of_measurement}
                onChange={(e) => handleProductDataChange(e)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
              >
                <option value="piece">Piece</option>
              </select>
            </div> */}
          </div>

          <div className="w-full my-1">
            <label
              className="block text-gray-700 text-md font-bold mb-1 "
              htmlFor="product_description"
            >
              Product Description
            </label>

            <textarea
              id="product_description"
              name="product_description"
              cols="30"
              rows="3"
              className="bg-gray-50 border-2 border-gray-400 rounded-md p-2 w-full"
              placeholder="Write product description"
              value={productData.product_description}
              onChange={(e) => handleProductDataChange(e)}
            ></textarea>
          </div>
          <div className="">
            <label
              className="text-start block text-gray-700 text-md    mb-2"
              htmlFor="productName"
            >
              Product Category
            </label>
            <input
              type="text"
              id="productType"
              name="productType"
              // value={product.productType}
              onChange={(e) =>
                handleVariation("category_selection", e.target.value)
              }
              className="w-full border border-gray-300 p-2 rounded-md placeholder:text-xs"
            />
            <div className="flex gap-x-2">
              <div className="text-start flex flex-col w-full">
                <label
                  className="block text-gray-700 text-md  mb-2"
                  htmlFor="productName"
                >
                  Brand Name
                </label>
                <input
                  type="text"
                  id="discount"
                  name="discount"
                  onChange={(e) =>
                    handleVariation("brand_name", e.target.value)
                  }
                  className="w-full border border-gray-300 p-2 rounded-md"
                />
              </div>
            </div>

            <div className="flex gap-x-2">
              <div className="text-start w-full">
                <label
                  className="block text-gray-700 text-md mb-2"
                  htmlFor="material"
                >
                  Material
                </label>
                <input
                  type="text"
                  id="material"
                  name="material"
                  // value={product.productName}
                  // onChange={handleMaterial}
                  onKeyDown={handleMaterialKeydown}
                  className="w-full border border-gray-300 p-2 rounded-md"
                />

                {/* Display selected material */}
                <div className="my-2">
                  {material.map((mats, index) => (
                    <span
                      key={mats}
                      className="px-2 py-1 mr-2 gap-2 rounded-md ring-1 ring-slate-200 text-black color-square bg-slate-100"
                    >
                      {mats}
                    </span>
                  ))}
                </div>

                {/* <CreatableSelect
                  isMulti
                  options={suggestions}
                  value={product.tags || product.tags.value}
                  styles={colourStyles}
                  onChange={(selectedOptions) =>
                    handleChangetag(selectedOptions)
                  }
                  onCreateOption={handleCreateTag}
                /> */}
              </div>
            </div>

            {/* //size */}

            <div>
              <p className="block text-gray-700 text-md mb-2">Select Size</p>

              {/* Size buttons */}
              <div className="flex flex-col justify-start gap-2 w-full my-2">
                {sizes.map((size, index) => (
                  <div
                    className="w-full flex gap-2"
                    key={`${size.label} - ${index}`}
                  >
                    <span
                      className={`p-1 text-center cursor-pointer w-12 border rounded-md bg-gray-200`}
                    >
                      {size.label}
                    </span>
                    <input
                      type="number"
                      value={size.value}
                      onChange={(e) =>
                        handleSizeClick(size.label, e.target.value)
                      }
                      className={`px-2 ring-2 ring-gray-200 bg-gray-200 rounded-md`}
                    />
                  </div>
                ))}
              </div>

              {/* Button to add a new size */}
              <span
                onClick={() => setIsInputVisible(true)}
                className="py-1 px-2 bg-red-300  text-black rounded-md"
              >
                + Add Size
              </span>

              {isInputVisible ? (
                <Modal
                  onCancel={onCancel}
                  onClose={onCancel}
                  heading="custom size"
                  placeholderText="Enter custom size"
                  customSize={handleAddSizeClick}
                />
              ) : null}
              {/* Input box to add a new size */}
              {/* {isInputVisible && (
                <div className="mt-2 flex">
                  <input
                    type="text"
                    placeholder=""
                    value={newSize}
                    onChange={(e) => setNewSize(e.target.value)}
                    className="p-2 border rounded-md mr-2 w-1/2"
                  />
                  <button
                    onClick={handleAddSizeClick}
                    className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600  w-1/2 "
                  >
                    Add Size
                  </button>
                </div>
              )} */}
            </div>

            <div className="text-start w-full mt-2">
              <label
                className="block text-gray-700 text-md mb-2"
                htmlFor="color"
              >
                Color
              </label>

              <div className="flex items-center justify-center gap-4">
                {/* Text input for entering color */}
                <input
                  type="text"
                  id="color"
                  name="color"
                  value={color}
                  onChange={handleChangecolor}
                  onKeyDown={handleColorKeydown}
                  placeholder="Enter hex code or use color picker and then press enter"
                  className="w-full border border-gray-300 p-2 rounded-md"
                />

                {/* Color picker */}
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="p-1 h-14 w-14 rounded-md block bg-white border border-gray-800 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                />
              </div>
              {/* Display selected colors */}
              <div className="mt-2 ml-2">
                {colors.map((c, index) => (
                  <div key={index} className="inline-block relative">
                    <div
                      className="p-2 w-8 h-8 rounded-md ring-2 m-1 color-square"
                      style={{
                        backgroundColor: `${c}`,
                      }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              // onClick={handleSubmit}
              type="submit"
              className="w-1/3 bg-green-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ClothingForm;
