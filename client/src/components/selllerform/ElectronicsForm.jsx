import React from "react";

function ElectronicsForm({ handleVariation }) {
  return (
    <div>
      <div className=" mx-auto mt-6 p-6   bg-white rounded-md shadow-sm  border ">
        <h2 className="text-lg text-start font-bold mb-6">
          Product Information
        </h2>
        <form>
          <label
            className="text-start block text-gray-700 text-md    mb-2"
            htmlFor="productName"
          >
            Product Catagory
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
            required
          />

          <div className="flex gap-x-2">
            <div className="text-start w-1/2">
              <label
                className="block text-gray-700 text-md mb-2"
                htmlFor="color"
              >
                Camera pixel
              </label>
              <input
                type="text"
                id="color"
                name="color"
                // value={product.productName}
                onChange={(e) =>
                  handleVariation("camera_pixel", e.target.value)
                }
                className="w-full border border-gray-300 p-2 rounded-md"
                required
              />
            </div>

            <div className="text-start w-1/2">
              <label
                className="block text-gray-700 text-md mb-2"
                htmlFor="material"
              >
                Screen Size
              </label>
              <input
                type="text"
                id="material"
                name="material"
                // value={product.productName}
                onChange={(e) => handleVariation("screen_size", e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-md"
                required
              />
            </div>
          </div>

          <div className="flex gap-x-2">
            <div className="text-start w-1/2">
              <label
                className="text-start block text-gray-700 text-md    mb-2"
                htmlFor="productName"
              >
                Brand Name
              </label>
              <input
                type="text"
                id="productType"
                name="productType"
                // value={product.productType}
                onChange={(e) => handleVariation("brand_name", e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-md placeholder:text-xs"
                required
              />
            </div>
            <div className="text-start w-1/2">
              <label
                className="text-start block text-gray-700 text-md    mb-2"
                htmlFor="productName"
              >
                Model Number
              </label>
              <input
                type="text"
                id="productType"
                name="productType"
                // value={product.productType}
                onChange={(e) =>
                  handleVariation("model_number", e.target.value)
                }
                className="w-full border border-gray-300 p-2 rounded-md placeholder:text-xs"
                required
              />
            </div>
          </div>

          <div className="flex gap-x-2">
            <div className="text-start w-full">
              <label
                className="block text-gray-700 text-md mb-2"
                htmlFor="warrantyStatus"
              >
                Warranty Information
              </label>
              <input
                type="text"
                id="warrantyStatus"
                name="warrantyStatus"
                // value={product.warrantyStatus}
                onChange={(e) => handleVariation("warranty", e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-md placeholder:text-xs"
                required
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ElectronicsForm;
