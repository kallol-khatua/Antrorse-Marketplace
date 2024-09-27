/* eslint-disable react/prop-types */

import { useState } from "react";
import axiosInstanceSeller from "../../axiosInstanceSeller";
import { toast } from "react-toastify";

const FoodsAndBeverages = () => {
  const [productData, setproductData] = useState({
    product_name: "",
    product_description: "",
    product_type: "Foods & Beverages",
    unit_of_measurement: "piece",

    actual_price: "",
    offered_price: "",

    min_order_quantity: "",

    quantity_type: "weight",
    volume_per_unit: "",
    unit_of_volume: "L",
    weight_per_unit: "",
    unit_of_weight: "kg",

    manufactured_date: "",
    expiration_date: "",
    calories: "",
    country_of_origin: "",

    packaging_type: "",
    brand_name: "",
    storage_conditions: "",

    quantity: "",
    inventory_location: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(productData);
      const url = `/product/seller/add-product/foods-and-beverages`;
      const response = await axiosInstanceSeller.post(url, {
        ...productData,
      });
      // console.log(response.data);
      if (response.status === 201) {
        toast.success(response.data.message);
        setproductData({
          product_name: "",
          product_description: "",
          product_type: "Foods & Beverages",
          unit_of_measurement: "piece",

          actual_price: "",
          offered_price: "",

          min_order_quantity: "",

          quantity_type: "weight",
          volume_per_unit: "",
          unit_of_volume: "L",
          weight_per_unit: "",
          unit_of_weight: "kg",

          manufactured_date: "",
          expiration_date: "",
          calories: "",
          country_of_origin: "",

          packaging_type: "",
          brand_name: "",
          storage_conditions: "",

          quantity: "",
          inventory_location: "",
        });
      }
    } catch (error) {
      console.log("Error while adding Foods & Beverages product");
    }
  };

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
          <div className="flex gap-x-2 w-full">
            {/* Product name */}
            <div className="text-start flex flex-col w-full">
              <label
                className="block text-gray-700 text-md font-bold mb-2 "
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
                id="unit_of_measurement"
                name="unit_of_measurement"
                value={productData.unit_of_measurement}
                onChange={(e) => handleProductDataChange(e)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
              >
                <option value="piece">Piece</option>
              </select>
            </div> */}
          </div>

          <div className="">
            <label
              className="block text-gray-700 text-md font-bold   mb-2"
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

          <div className="flex gap-x-2 w-full">
            <div className="text-start w-1/2">
              <label
                className="text-start block text-gray-700 text-md font-bold mb-2"
                htmlFor="brand_name"
              >
                Brand Name
              </label>
              <input
                type="text"
                id="brand_name"
                name="brand_name"
                value={productData.brand_name}
                onChange={(e) => handleProductDataChange(e)}
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholder="Enter brand name"
                required
              />
            </div>
            <div className="text-start w-1/2">
              <label
                className="text-start block text-gray-700 text-md font-bold mb-2"
                htmlFor="quantity_type"
              >
                Quantity type
              </label>
              <select
                id="quantity_type"
                name="quantity_type"
                value={productData.quantity_type}
                onChange={(e) => handleProductDataChange(e)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="weight">Weight</option>
                <option value="volume">Volume</option>
              </select>
            </div>
          </div>

          <h2 className="text-lg text-start font-bold m-3">Variant - 1</h2>

          <div className="flex gap-x-2 w-full">
            <div className="text-start flex flex-col w-1/2">
              <label
                className="block text-gray-700 text-md font-bold   mb-2"
                htmlFor="quantity"
              >
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={productData.quantity}
                onChange={(e) => handleProductDataChange(e)}
                placeholder="Enter quantity"
                className="w-full border border-gray-300 p-2 rounded-md"
                required
              />
            </div>
            <div className="text-start flex flex-col w-1/2">
              <label
                className="block text-gray-700 text-md font-bold   mb-2"
                htmlFor="min_order_quantity"
              >
                Minimum order quantity
              </label>
              <input
                type="number"
                id="min_order_quantity"
                name="min_order_quantity"
                value={productData.min_order_quantity}
                onChange={(e) => handleProductDataChange(e)}
                placeholder="Enter minimum order quantity"
                className="w-full border border-gray-300 p-2 rounded-md"
                required
              />
            </div>
          </div>

          <div className="flex gap-x-2 w-full">
            <div className="text-start flex flex-col w-1/2">
              <label
                className="block text-gray-700 text-md font-bold mb-2"
                htmlFor="actual_price"
              >
                Actual price
              </label>
              <input
                type="number"
                id="actual_price"
                name="actual_price"
                value={productData.actual_price}
                onChange={(e) => handleProductDataChange(e)}
                className="w-full border border-gray-300 p-2 rounded-md"
                // placeholder={`Enter actual price per ${product.unit_of_measurement}`}
                placeholder="Enter actual price"
                required
              />
            </div>
            <div className="text-start flex flex-col w-1/2">
              <label
                className="block text-gray-700 text-md font-bold   mb-2"
                htmlFor="offered_price"
              >
                Offered price
              </label>
              <input
                type="number"
                id="offered_price"
                name="offered_price"
                value={productData.offered_price}
                onChange={(e) => handleProductDataChange(e)}
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholder="Enter offered price"
                required
              />
            </div>
          </div>

          <div className="flex gap-x-2 w-full">
            <div className="text-start flex flex-col w-full">
              <label
                className="block text-gray-700 text-md font-bold mb-2"
                htmlFor="inventory_location"
              >
                Location
              </label>
              <input
                type="text"
                id="inventory_location"
                name="inventory_location"
                value={productData.inventory_location}
                onChange={(e) => handleProductDataChange(e)}
                className="w-full border border-gray-300 p-2 rounded-md"
                // placeholder={`Enter actual price per ${product.unit_of_measurement}`}
                placeholder="Enter location of the product"
                required
              />
            </div>
          </div>

          {productData.quantity_type === "volume" && (
            <div className="flex gap-x-2">
              <div className="text-start w-1/2">
                <label
                  className="text-start block text-gray-700 text-md font-bold mb-2"
                  htmlFor="volume_per_unit"
                >
                  Volume per unit
                </label>
                <input
                  type="number"
                  id="volume_per_unit"
                  name="volume_per_unit"
                  value={productData.volume_per_unit}
                  onChange={(e) => handleProductDataChange(e)}
                  className="w-full border border-gray-300 p-2 rounded-md"
                  placeholder="Enter volume per unit"
                  required
                />
              </div>

              <div className="text-start w-1/2">
                <label
                  className="text-start block text-gray-700 text-md font-bold mb-2"
                  htmlFor="unit_of_volume"
                >
                  Unit of volume
                </label>
                <select
                  id="unit_of_volume"
                  name="unit_of_volume"
                  value={productData.unit_of_volume}
                  onChange={(e) => handleProductDataChange(e)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="L">Liter (L)</option>
                  <option value="ml">Milliliter (ml)</option>
                </select>
              </div>
            </div>
          )}

          {productData.quantity_type === "weight" && (
            <div className="flex gap-x-2">
              <div className="text-start w-1/2">
                <label
                  className="text-start block text-gray-700 text-md font-bold mb-2"
                  htmlFor="weight_per_unit"
                >
                  Weight per unit
                </label>
                <input
                  type="number"
                  id="weight_per_unit"
                  name="weight_per_unit"
                  value={productData.weight_per_unit}
                  onChange={(e) => handleProductDataChange(e)}
                  className="w-full border border-gray-300 p-2 rounded-md"
                  placeholder="Enter weight per unit"
                  required
                />
              </div>

              <div className="text-start w-1/2">
                <label
                  className="text-start block text-gray-700 text-md font-bold mb-2"
                  htmlFor="unit_of_weight"
                >
                  Unit of weight
                </label>
                <select
                  id="unit_of_weight"
                  name="unit_of_weight"
                  value={productData.unit_of_weight}
                  onChange={(e) => handleProductDataChange(e)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="kg">Kilogram (kg)</option>
                  <option value="g">Gram (g)</option>
                </select>
              </div>
            </div>
          )}

          <div className="flex gap-x-2">
            <div className="text-start w-1/2">
              <label
                className="text-start block text-gray-700 text-md font-bold mb-2"
                htmlFor="manufactured_date"
              >
                Manufactured date
              </label>
              <input
                type="date"
                id="manufactured_date"
                name="manufactured_date"
                value={productData.manufactured_date}
                onChange={(e) => handleProductDataChange(e)}
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholder="Enter calories per unit"
                required
              />
            </div>

            <div className="text-start w-1/2">
              <label
                className="text-start block text-gray-700 text-md font-bold mb-2"
                htmlFor="expiration_date"
              >
                Expiration date
              </label>
              <input
                type="date"
                id="expiration_date"
                name="expiration_date"
                value={productData.expiration_date}
                onChange={(e) => handleProductDataChange(e)}
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholder="Enter country of origin"
                required
              />
            </div>
          </div>

          <div className="flex gap-x-2">
            <div className="text-start w-1/2">
              <label
                className="text-start block text-gray-700 text-md font-bold mb-2"
                htmlFor="calories"
              >
                Calories
              </label>
              <input
                type="number"
                id="calories"
                name="calories"
                value={productData.calories}
                onChange={(e) => handleProductDataChange(e)}
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholder="Enter calories per unit"
                required
              />
            </div>

            <div className="text-start w-1/2">
              <label
                className="text-start block text-gray-700 text-md font-bold mb-2"
                htmlFor="country_of_origin"
              >
                Country of origin
              </label>
              <input
                type="text"
                id="country_of_origin"
                name="country_of_origin"
                value={productData.country_of_origin}
                onChange={(e) => handleProductDataChange(e)}
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholder="Enter country of origin"
                required
              />
            </div>
          </div>

          <div className="flex gap-x-2">
            <div className="text-start w-1/2">
              <label
                className="text-start block text-gray-700 text-md font-bold mb-2"
                htmlFor="packaging_type"
              >
                Packaging type
              </label>
              <input
                type="text"
                id="packaging_type"
                name="packaging_type"
                value={productData.packaging_type}
                onChange={(e) => handleProductDataChange(e)}
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholder="e.g. Plastic Bag, Glass Bottle, Vacuum Pack, Carton, Plastic Bottle, Plastic Wrap, Can, Jar, Box, Tin"
                required
              />
            </div>
            <div className="text-start w-1/2">
              <label
                className="text-start block text-gray-700 text-md font-bold mb-2"
                htmlFor="storage_conditions"
              >
                Storage conditions
              </label>
              <input
                type="text"
                id="storage_conditions"
                name="storage_conditions"
                value={productData.storage_conditions}
                onChange={(e) => handleProductDataChange(e)}
                placeholder="e.g. Store in cool and dry place"
                className="w-full border border-gray-300 p-2 rounded-md"
                required
              />
            </div>
          </div>

          <button
            className="flex items-center px-4 py-2 bg-slate-300 text-black font-bold rounded-md hover:bg-slate-400 transition duration-300 mt-3"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add another variant
          </button>

          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={handleSubmit}
              type="submit"
              className="w-1/3 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              Add Product
            </button>
            <button
              onClick={handleSubmit}
              type="button"
              className="w-1/3 bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FoodsAndBeverages;
