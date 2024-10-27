import { useState } from "react";
import AdminAxiosInstance from "../../AdminAxiosInstance";
import { toast } from "react-toastify";

function Defaultform() {
  const [productData, setproductData] = useState({
    product_name: "",
    product_description: "",
    product_type: "Default",
    generic_name: "",
    inventory_location: "",
    model_name: "",
    type: "",
    specifications: "",
    brand_name: "",
    country_of_origin: "",

    // Variants
    variants: [
      {
        actual_price: "",
        offered_price: "",

        quantity: "",
        min_order_quantity: "",

        length: "",
        breadth: "",
        height: "",
        weight: "",
      },
    ],
  });

  // handle data change
  const handleProductDataChange = (e) => {
    const { name, value } = e.target;
    setproductData((prev) => ({ ...prev, [name]: value }));
  };

  // add a new variant
  const addNewVariant = () => {
    const newVariant = [...productData.variants];
    newVariant.push({
      actual_price: "",
      offered_price: "",

      quantity: "",
      min_order_quantity: "",

      length: "",
      breadth: "",
      height: "",
      weight: "",
    });

    setproductData((prev) => ({ ...prev, variants: newVariant }));
  };

  // handle indivisual variant data change
  const handleVariantDataChange = (e, variantIndex) => {
    const { name, value } = e.target;

    const updatedVariant = [...productData.variants];
    updatedVariant[variantIndex][name] = value;

    setproductData((prev) => ({ ...prev, variants: updatedVariant }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(productData);
    try {
      const url = `/product/admin/add-product/defaults`;
      const response = await AdminAxiosInstance.post(url, productData);

      if (response.status === 201) {
        toast.success(response.data.message);
        setproductData({
          product_name: "",
          product_description: "",
          product_type: "Default",
          generic_name: "",
          inventory_location: "",
          model_name: "",
          type: "",
          specifications: "",
          brand_name: "",
          country_of_origin: "",

          // Variants
          variants: [
            {
              actual_price: "",
              offered_price: "",

              quantity: "",
              min_order_quantity: "",

              length: "",
              breadth: "",
              height: "",
              weight: "",
            },
          ],
        });
      }
    } catch (error) {
      console.log("Error while adding product");
    }
  };

  const handleCancel = () => {};

  return (
    <div>
      <div className=" mx-auto p-6  pt-2 bg-white rounded-md shadow-sm  border ">
        <h2 className="text-lg text-start font-bold m-3">
          Product Information
        </h2>
        <form onSubmit={handleSubmit}>
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

          {/* description */}
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
            {/* generic_name */}
            <div className="text-start w-1/2">
              <label
                className="text-start block text-gray-700 text-md font-bold mb-2"
                htmlFor="generic_name"
              >
                Generic name
              </label>
              <input
                type="text"
                id="generic_name"
                name="generic_name"
                value={productData.generic_name}
                onChange={(e) => handleProductDataChange(e)}
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholder="Enter generic name here"
              />
            </div>
            {/* inventory_location */}
            <div className="text-start w-1/2">
              <label
                className="text-start block text-gray-700 text-md font-bold mb-2"
                htmlFor="inventory_location"
              >
                Inventory location
              </label>
              <input
                type="text"
                id="inventory_location"
                name="inventory_location"
                value={productData.inventory_location}
                onChange={(e) => handleProductDataChange(e)}
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholder="Enter inventory location here"
                required
              />
            </div>
          </div>

          <div className="flex gap-x-2 w-full">
            {/* model_name */}
            <div className="text-start w-1/2">
              <label
                className="text-start block text-gray-700 text-md font-bold mb-2"
                htmlFor="model_name"
              >
                Model name
              </label>
              <input
                type="text"
                id="model_name"
                name="model_name"
                value={productData.model_name}
                onChange={(e) => handleProductDataChange(e)}
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholder="Enter model name here"
              />
            </div>
            {/* type */}
            <div className="text-start w-1/2">
              <label
                className="text-start block text-gray-700 text-md font-bold mb-2"
                htmlFor="type"
              >
                Type
              </label>
              <input
                type="text"
                id="type"
                name="type"
                value={productData.type}
                onChange={(e) => handleProductDataChange(e)}
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholder="Enter type here"
              />
            </div>
          </div>

          <div className="">
            <label
              className="text-start block text-gray-700 text-md font-bold mb-2"
              htmlFor="specifications"
            >
              Specifications
            </label>
            <input
              type="text"
              id="specifications"
              name="specifications"
              value={productData.specifications}
              onChange={(e) => handleProductDataChange(e)}
              className="w-full border border-gray-300 p-2 rounded-md"
              placeholder="Enter specifications here"
            />
          </div>

          <div className="flex gap-x-2 w-full">
            {/* brand_name */}
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
              />
            </div>
            {/* country_of_origin */}
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
                placeholder="Enter country of origin here"
              />
            </div>
          </div>

          {productData.variants.map((variant, variantIndex) => {
            return (
              <div key={variantIndex} className="mt-8">
                {/* variant depending upon pack of quantity */}
                <h2 className="text-xl text-start font-bold m-3">
                  Product variant - {variantIndex + 1}
                </h2>

                <div className="flex gap-x-2 w-full">
                  {/* actual_price */}
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
                      value={variant.actual_price}
                      onChange={(e) => handleVariantDataChange(e, variantIndex)}
                      className="w-full border border-gray-300 p-2 rounded-md"
                      // placeholder={`Enter actual price per ${product.unit_of_measurement}`}
                      placeholder="Enter actual price"
                      required
                    />
                  </div>
                  {/* offered_price */}
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
                      value={variant.offered_price}
                      onChange={(e) => handleVariantDataChange(e, variantIndex)}
                      className="w-full border border-gray-300 p-2 rounded-md"
                      placeholder="Enter offered price"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-x-2 w-full">
                  {/* quantity */}
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
                      value={variant.quantity}
                      onChange={(e) => handleVariantDataChange(e, variantIndex)}
                      placeholder="Enter stock quantity"
                      className="w-full border border-gray-300 p-2 rounded-md"
                      required
                    />
                  </div>
                  {/* min_order_quantity */}
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
                      value={variant.min_order_quantity}
                      onChange={(e) => handleVariantDataChange(e, variantIndex)}
                      placeholder="Enter minimum order quantity"
                      className="w-full border border-gray-300 p-2 rounded-md"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-x-2">
                  {/* length */}
                  <div className="text-start w-1/2">
                    <label
                      className="text-start block text-gray-700 text-md font-bold mb-2"
                      htmlFor="length"
                    >
                      After package length
                    </label>
                    <input
                      type="number"
                      id="length"
                      name="length"
                      value={productData.length}
                      onChange={(e) => handleVariantDataChange(e, variantIndex)}
                      className="w-full border border-gray-300 p-2 rounded-md"
                      placeholder="Enter length in cm"
                      required
                    />
                  </div>
                  {/* breadth */}
                  <div className="text-start w-1/2">
                    <label
                      className="text-start block text-gray-700 text-md font-bold mb-2"
                      htmlFor="breadth"
                    >
                      After package breadth
                    </label>
                    <input
                      type="number"
                      id="breadth"
                      name="breadth"
                      value={productData.breadth}
                      onChange={(e) => handleVariantDataChange(e, variantIndex)}
                      className="w-full border border-gray-300 p-2 rounded-md"
                      placeholder="Enter breadth in cm"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-x-2">
                  {/* height */}
                  <div className="text-start w-1/2">
                    <label
                      className="text-start block text-gray-700 text-md font-bold mb-2"
                      htmlFor="height"
                    >
                      After package height
                    </label>
                    <input
                      type="number"
                      id="height"
                      name="height"
                      value={productData.height}
                      onChange={(e) => handleVariantDataChange(e, variantIndex)}
                      className="w-full border border-gray-300 p-2 rounded-md"
                      placeholder="Enter height in cm"
                      required
                    />
                  </div>
                  {/* breadth */}
                  <div className="text-start w-1/2">
                    <label
                      className="text-start block text-gray-700 text-md font-bold mb-2"
                      htmlFor="weight"
                    >
                      After package weight
                    </label>
                    <input
                      type="number"
                      id="weight"
                      name="weight"
                      value={productData.weight}
                      onChange={(e) => handleVariantDataChange(e, variantIndex)}
                      className="w-full border border-gray-300 p-2 rounded-md"
                      placeholder="Enter weight in kg"
                      required
                    />
                  </div>
                </div>
              </div>
            );
          })}

          <button
            className="flex items-center px-4 py-2 bg-slate-300 text-black font-bold rounded-md hover:bg-slate-400 transition duration-300 mt-3"
            type="button"
            onClick={addNewVariant}
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
              onClick={handleCancel}
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
}

export default Defaultform;
