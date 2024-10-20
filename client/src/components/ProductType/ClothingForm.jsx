  import { useEffect, useState } from "react";
import axiosInstanceSeller from "../../axiosInstanceSeller";
import { toast } from "react-toastify";

function ClothingForm() {
  const [productData, setproductData] = useState({
    product_name: "",
    product_description: "",
    product_type: "Clothings",
    unit_of_measurement: "piece",

    // Common for all
    generic_name: "Formal Shirts",
    pack_of: "1", // add multi color for pack of more than 1
    fit: "",
    fabric: "",
    fabric_care: "",
    suitable_for: "",
    brand_name: "",
    country_of_origin: "",
    ideal_for: "Men",
    is_returnable: "true",
    return_within_days: "7", // when submit if returnable false then clear days, and condition
    returnable_condition: "",
    min_order_quantity: "",
    inventory_location: "",

    // Common for Shity and T Shirt
    sleeve: "",
    pattern: "",
    reversible: "No",

    // Specific for shirt
    closure: "",
    collar: "",
    hem: "",

    // Specific for T shirt
    neck_type: "",

    // variant and size variant for Shirt and T Shirt
    variants: [
      {
        primary_color: "",
        secondary_color: "",
        // An array of size variants within each variant
        size_variants: [
          {
            size: "S",
            actual_price: "",
            offered_price: "",
            quantity: "",
          },
          {
            size: "M",
            actual_price: "",
            offered_price: "",
            quantity: "",
          },
          {
            size: "L",
            actual_price: "",
            offered_price: "",
            quantity: "",
          },
          {
            size: "XL",
            actual_price: "",
            offered_price: "",
            quantity: "",
          },
          {
            size: "XXL",
            actual_price: "",
            offered_price: "",
            quantity: "",
          },
        ],
      },
    ],
  });

  const GenericNameForIdealFor = {
    Men: ["Formal Shirts", "Casual Shirts", "T-Shirts"], // "Kurta"
    Women: ["Formal Shirts", "Casual Shirts", "T-Shirts"], // "Saare"
    Boys: [],
    Girls: [],
  };

  // handle data change
  const handleProductDataChange = (e) => {
    const { name, value } = e.target;
    setproductData((prev) => ({ ...prev, [name]: value }));
  };

  // handle indivisual variant data change
  const handleVariantDataChange = (e, variantIndex) => {
    const { name, value } = e.target;

    const updatedVariant = [...productData.variants];
    updatedVariant[variantIndex][name] = value;

    setproductData((prev) => ({ ...prev, variants: updatedVariant }));
  };

  // handle variant size data change
  const handleVariantSizeDataChange = (e, variantIndex, sizeVariantIndex) => {
    const { name, value } = e.target;

    const updatedVariantSize = [...productData.variants];
    updatedVariantSize[variantIndex].size_variants[sizeVariantIndex][name] =
      value;

    setproductData((prev) => ({ ...prev, variants: updatedVariantSize }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    // console.log(productData);
    try {
      // console.log(productData);
      const url = `/product/seller/add-product/clothings`;
      const response = await axiosInstanceSeller.post(url, productData);

      // console.log(response.data);
      if (response.status === 201) {
        toast.success(response.data.message);
        setproductData({
          product_name: "",
          product_description: "",
          product_type: "Clothings",
          unit_of_measurement: "piece",

          // Common for all
          generic_name: "Formal Shirts",
          pack_of: "1", // add multi color for pack of more than 1
          fit: "",
          fabric: "",
          fabric_care: "",
          suitable_for: "",
          brand_name: "",
          country_of_origin: "",
          ideal_for: "Men",
          is_returnable: "true",
          return_within_days: "7", // when submit if returnable false then clear days, and condition
          returnable_condition: "",
          min_order_quantity: "",
          inventory_location: "",

          // Common for Shirt and T Shirt
          sleeve: "",
          pattern: "",
          reversible: "No",

          // Specific for shirt
          closure: "",
          collar: "",
          hem: "",

          // Specific for T shirt
          neck_type: "",

          // variant and size variant for Shirt and T Shirt
          variants: [
            {
              primary_color: "",
              secondary_color: "",
              // An array of size variants within each variant
              size_variants: [
                {
                  size: "S",
                  actual_price: "",
                  offered_price: "",
                  quantity: "",
                },
                {
                  size: "M",
                  actual_price: "",
                  offered_price: "",
                  quantity: "",
                },
                {
                  size: "L",
                  actual_price: "",
                  offered_price: "",
                  quantity: "",
                },
                {
                  size: "XL",
                  actual_price: "",
                  offered_price: "",
                  quantity: "",
                },
                {
                  size: "XXL",
                  actual_price: "",
                  offered_price: "",
                  quantity: "",
                },
              ],
            },
          ],
        });
      }
    } catch (error) {
      console.log("Error while adding Clothings product");
    }
  };

  const handleCancel = () => {};

  const addNewVariant = () => {
    const newVariant = [...productData.variants];
    newVariant.push({
      primary_color: "",
      secondary_color: "",
      size_variants: [
        {
          size: "S",
          actual_price: "",
          offered_price: "",
          quantity: "",
        },
        {
          size: "M",
          actual_price: "",
          offered_price: "",
          quantity: "",
        },
        {
          size: "L",
          actual_price: "",
          offered_price: "",
          quantity: "",
        },
        {
          size: "XL",
          actual_price: "",
          offered_price: "",
          quantity: "",
        },
        {
          size: "XXL",
          actual_price: "",
          offered_price: "",
          quantity: "",
        },
      ],
    });

    setproductData((prev) => ({ ...prev, variants: newVariant }));
  };

  // to set retunable_conditin and return_within_days while ching is_returnable
  useEffect(() => {
    if (productData.is_returnable === "false") {
      setproductData((prev) => ({
        ...prev,
        returnable_condition: "",
        return_within_days: "",
      }));
    } else {
      setproductData((prev) => ({
        ...prev,
        returnable_condition: "",
        return_within_days: "7",
      }));
    }
  }, [productData.is_returnable]);

  // while changing productData.ideal_for change pre select productData.generic_name
  useEffect(() => {
    setproductData((prev) => ({
      ...prev,
      generic_name: GenericNameForIdealFor[prev.ideal_for][0],
    }));
  }, [productData.ideal_for]);

  return (
    <div>
      <div className=" mx-auto p-6  pt-2 bg-white rounded-md shadow-sm  border ">
        <h2 className="text-lg text-start font-bold m-3">
          Product Information
        </h2>
        <form>
          {/* Generic Name, Pack of */}
          <div className="flex gap-x-2 w-full my-1">
            <div className="text-start flex flex-col w-1/2">
              <label
                className="block text-gray-700 text-md font-bold mb-1 "
                htmlFor="ideal_for"
              >
                Ideal for
              </label>
              <select
                id="ideal_for"
                name="ideal_for"
                value={productData.ideal_for}
                onChange={(e) => handleProductDataChange(e)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                {/* <option value="Boys">Boys</option>
                <option value="Girls">Girls</option> */}
              </select>
            </div>
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
                {/* <option value="Formal Shirts">Formal Shirts</option>
                <option value="Casual Shirts">Casual Shirts</option>
                <option value="T-Shirts">T-Shirts</option> */}

                {GenericNameForIdealFor[productData.ideal_for].map(
                  (genericName, index) => {
                    return (
                      <option key={index} value={genericName}>
                        {genericName}
                      </option>
                    );
                  }
                )}
              </select>
            </div>

            {/* <div className="text-start flex flex-col w-1/3">
              <label
                className="block text-gray-700 text-md font-bold mb-1 "
                htmlFor="pack_of"
              >
                Pack of
              </label>
              <select
                id="pack_of"
                name="pack_of"
                value={productData.pack_of}
                onChange={(e) => handleProductDataChange(e)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div> */}
          </div>

          {/* Product name */}
          <div className="flex gap-x-2 w-full my-1">
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

          {/* {Product Description} */}
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

          {/* fit, fabric */}
          <div className="flex gap-x-2 w-full my-1">
            <div className="text-start flex flex-col w-1/2">
              <label
                className="block text-gray-700 text-md font-bold mb-1 "
                htmlFor="fit"
              >
                Fit
              </label>
              <input
                type="text"
                id="fit"
                name="fit"
                value={productData.fit}
                onChange={(e) => handleProductDataChange(e)}
                className="w-full border border-gray-300 p-2 rounded-md placeholder:text-base"
                placeholder="e.g. Regular / Slim"
              />
            </div>

            <div className="text-start flex flex-col w-1/2">
              <label
                className="block text-gray-700 text-md font-bold mb-1 "
                htmlFor="fabric"
              >
                Fabric
              </label>
              <input
                type="text"
                id="fabric"
                name="fabric"
                value={productData.fabric}
                onChange={(e) => handleProductDataChange(e)}
                className="w-full border border-gray-300 p-2 rounded-md placeholder:text-base"
                placeholder="Enter fabric type here"
              />
            </div>
          </div>

          {/* fabric_care, suitable_for */}
          <div className="flex gap-x-2 w-full my-1">
            <div className="text-start flex flex-col w-1/2">
              <label
                className="block text-gray-700 text-md font-bold mb-1 "
                htmlFor="fabric_care"
              >
                Fabric care
              </label>
              <input
                type="text"
                id="fabric_care"
                name="fabric_care"
                value={productData.fabric_care}
                onChange={(e) => handleProductDataChange(e)}
                className="w-full border border-gray-300 p-2 rounded-md placeholder:text-base"
                placeholder="Enter fabric care here"
              />
            </div>

            <div className="text-start flex flex-col w-1/2">
              <label
                className="block text-gray-700 text-md font-bold mb-1 "
                htmlFor="suitable_for"
              >
                Suitable for
              </label>
              <input
                type="text"
                id="suitable_for"
                name="suitable_for"
                value={productData.suitable_for}
                onChange={(e) => handleProductDataChange(e)}
                className="w-full border border-gray-300 p-2 rounded-md placeholder:text-base"
                placeholder="e.g. Western wear"
              />
            </div>
          </div>

          {/* brand_name, country_of_origin */}
          <div className="flex gap-x-2 w-full my-1">
            <div className="text-start flex flex-col w-1/2">
              <label
                className="block text-gray-700 text-md font-bold mb-1 "
                htmlFor="brand_name"
              >
                Brand name
              </label>
              <input
                type="text"
                id="brand_name"
                name="brand_name"
                value={productData.brand_name}
                onChange={(e) => handleProductDataChange(e)}
                className="w-full border border-gray-300 p-2 rounded-md placeholder:text-base"
                placeholder="Enter brand name here"
              />
            </div>

            <div className="text-start flex flex-col w-1/2">
              <label
                className="block text-gray-700 text-md font-bold mb-1 "
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
                className="w-full border border-gray-300 p-2 rounded-md placeholder:text-base"
                placeholder="Enter country name here"
              />
            </div>
          </div>

          {/* min_order_quantity, is_returnable */}
          <div className="flex gap-x-2 w-full my-1">
            <div className="text-start flex flex-col w-1/2">
              <label
                className="block text-gray-700 text-md font-bold mb-1 "
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
                className="w-full border border-gray-300 p-2 rounded-md placeholder:text-base"
                placeholder="Enter minimum order quantity"
              />
            </div>

            <div className="text-start flex flex-col w-1/2">
              <label
                className="block text-gray-700 text-md font-bold mb-1 "
                htmlFor="is_returnable"
              >
                Allow return ?
              </label>
              <select
                id="is_returnable"
                name="is_returnable"
                value={productData.is_returnable}
                onChange={(e) => handleProductDataChange(e)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>

          {/* return_within_days, returnable_condition */}
          {productData.is_returnable === "true" && (
            <div className="flex gap-x-2 w-full my-1">
              <div className="text-start flex flex-col w-1/2">
                <label
                  className="block text-gray-700 text-md font-bold mb-1 "
                  htmlFor="return_within_days"
                >
                  Number of days allowed for return
                </label>
                <select
                  id="return_within_days"
                  name="return_within_days"
                  value={productData.return_within_days}
                  onChange={(e) => handleProductDataChange(e)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>

              <div className="text-start flex flex-col w-1/2">
                <label
                  className="block text-gray-700 text-md font-bold mb-1 "
                  htmlFor="returnable_condition"
                >
                  Condition for return
                </label>
                <input
                  type="text"
                  id="returnable_condition"
                  name="returnable_condition"
                  value={productData.returnable_condition}
                  onChange={(e) => handleProductDataChange(e)}
                  className="w-full border border-gray-300 p-2 rounded-md placeholder:text-base"
                  placeholder="Enter returnable condition here"
                />
              </div>
            </div>
          )}

          {/* Shirt and T Shirt similar data */}
          {(productData.generic_name === "Casual Shirts" ||
            productData.generic_name === "Formal Shirts" ||
            productData.generic_name === "T-Shirts") && (
            <>
              {/* pattern, sleeve */}
              <div className="flex gap-x-2 w-full my-1">
                <div className="text-start flex flex-col w-1/2">
                  <label
                    className="block text-gray-700 text-md font-bold mb-1 "
                    htmlFor="pattern"
                  >
                    Pattern
                  </label>
                  <input
                    type="text"
                    id="pattern"
                    name="pattern"
                    value={productData.pattern}
                    onChange={(e) => handleProductDataChange(e)}
                    className="w-full border border-gray-300 p-2 rounded-md placeholder:text-base"
                    placeholder="Enter pattern type here, e.g. Solid / Checkered"
                  />
                </div>

                <div className="text-start flex flex-col w-1/2">
                  <label
                    className="block text-gray-700 text-md font-bold mb-1 "
                    htmlFor="sleeve"
                  >
                    Sleeve
                  </label>
                  <input
                    type="text"
                    id="sleeve"
                    name="sleeve"
                    value={productData.sleeve}
                    onChange={(e) => handleProductDataChange(e)}
                    className="w-full border border-gray-300 p-2 rounded-md placeholder:text-base"
                    placeholder="Enter sleeve type here, e.g. Full sleeve / Half sleeve"
                  />
                </div>
              </div>
            </>
          )}

          {(productData.generic_name === "Casual Shirts" ||
            productData.generic_name === "Formal Shirts") && (
            <>
              {/* closure, collar */}
              <div className="flex gap-x-2 w-full my-1">
                <div className="text-start flex flex-col w-1/2">
                  <label
                    className="block text-gray-700 text-md font-bold mb-1 "
                    htmlFor="closure"
                  >
                    Closure
                  </label>
                  <input
                    type="text"
                    id="closure"
                    name="closure"
                    value={productData.closure}
                    onChange={(e) => handleProductDataChange(e)}
                    className="w-full border border-gray-300 p-2 rounded-md placeholder:text-base"
                    placeholder="Enter closure type here, e.g. Button"
                  />
                </div>

                <div className="text-start flex flex-col w-1/2">
                  <label
                    className="block text-gray-700 text-md font-bold mb-1 "
                    htmlFor="collar"
                  >
                    Collar
                  </label>
                  <input
                    type="text"
                    id="collar"
                    name="collar"
                    value={productData.collar}
                    onChange={(e) => handleProductDataChange(e)}
                    className="w-full border border-gray-300 p-2 rounded-md placeholder:text-base"
                    placeholder="Enter collar type here, e.g. Spread / Lapel / Cut Away"
                  />
                </div>
              </div>

              {/* reversible, hem */}
              <div className="flex gap-x-2 w-full my-1">
                <div className="text-start flex flex-col w-1/2">
                  <label
                    className="block text-gray-700 text-md font-bold mb-1 "
                    htmlFor="reversible"
                  >
                    Reversible ?
                  </label>
                  <select
                    id="reversible"
                    name="reversible"
                    value={productData.reversible}
                    onChange={(e) => handleProductDataChange(e)}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>

                <div className="text-start flex flex-col w-1/2">
                  <label
                    className="block text-gray-700 text-md font-bold mb-1 "
                    htmlFor="hem"
                  >
                    Hem type
                  </label>
                  <input
                    type="text"
                    id="hem"
                    name="hem"
                    value={productData.hem}
                    onChange={(e) => handleProductDataChange(e)}
                    className="w-full border border-gray-300 p-2 rounded-md placeholder:text-base"
                    placeholder="Enter hem type here, e.g. Curved / Straight"
                  />
                </div>
              </div>
            </>
          )}

          {productData.generic_name === "T-Shirts" && (
            <>
              {/* reversible, hem */}
              <div className="flex gap-x-2 w-full my-1">
                <div className="text-start flex flex-col w-1/2">
                  <label
                    className="block text-gray-700 text-md font-bold mb-1 "
                    htmlFor="reversible"
                  >
                    Reversible ?
                  </label>
                  <select
                    id="reversible"
                    name="reversible"
                    value={productData.reversible}
                    onChange={(e) => handleProductDataChange(e)}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>

                <div className="text-start flex flex-col w-1/2">
                  <label
                    className="block text-gray-700 text-md font-bold mb-1 "
                    htmlFor="neck_type"
                  >
                    Neck type
                  </label>
                  <input
                    type="text"
                    id="neck_type"
                    name="neck_type"
                    value={productData.neck_type}
                    onChange={(e) => handleProductDataChange(e)}
                    className="w-full border border-gray-300 p-2 rounded-md placeholder:text-base"
                    placeholder="Enter neck type here, e.g. Polo neck"
                  />
                </div>
              </div>
            </>
          )}

          {/*  inventory_location */}
          <div className="flex gap-x-2 w-full my-1">
            <div className="text-start flex flex-col w-full">
              <label
                className="block text-gray-700 text-md font-bold mb-1 "
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
                className="w-full border border-gray-300 p-2 rounded-md placeholder:text-base"
                placeholder="Enter location of the product here"
              />
            </div>
          </div>

          {/* variant depending upon pack of quantity */}
          {/* <h2 className="text-lg text-start font-bold m-3">Variant - 1</h2> */}

          {/* primary_color, secondary_color */}
          {/* <div className="flex gap-x-2 w-full my-1">
            <div className="text-start flex flex-col w-1/2">
              <label
                className="block text-gray-700 text-md font-bold mb-1 "
                htmlFor="primary_color"
              >
                Primary color
              </label>
              <input
                type="text"
                id="primary_color"
                name="primary_color"
                value={productData.primary_color}
                onChange={(e) => handleProductDataChange(e)}
                className="w-full border border-gray-300 p-2 rounded-md placeholder:text-base"
                placeholder="Enter primary color here"
              />
            </div>

            <div className="text-start flex flex-col w-1/2">
              <label
                className="block text-gray-700 text-md font-bold mb-1 "
                htmlFor="secondary_color"
              >
                Secondary color
              </label>
              <input
                type="text"
                id="secondary_color"
                name="secondary_color"
                value={productData.secondary_color}
                onChange={(e) => handleProductDataChange(e)}
                className="w-full border border-gray-300 p-2 rounded-md placeholder:text-base"
                placeholder="Enter secondary color here"
              />
            </div>
          </div> */}

          {/* inventory_location */}
          {/* <div className="flex gap-x-2 w-full my-1">
            <div className="text-start flex flex-col w-1/2">
              <label
                className="block text-gray-700 text-md font-bold mb-1 "
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
                className="w-full border border-gray-300 p-2 rounded-md placeholder:text-base"
                placeholder="Enter location of the product here"
              />
            </div>
          </div> */}

          {productData.variants.map((variant, variantIndex) => {
            // console.log(index)
            return (
              <div key={variantIndex} className="mt-8">
                {/* variant depending upon pack of quantity */}
                <h2 className="text-xl text-start font-bold m-3">
                  Product variant - {variantIndex + 1}
                </h2>
                {/* primary_color, secondary_color */}
                <div className="flex gap-x-2 w-full my-1">
                  {/* primary_color */}
                  <div className="text-start flex flex-col w-1/2">
                    <label
                      className="block text-gray-700 text-md font-bold mb-1 "
                      htmlFor="primary_color"
                    >
                      Primary color
                    </label>
                    <input
                      type="text"
                      id="primary_color"
                      name="primary_color"
                      value={productData.primary_color}
                      onChange={(e) => handleVariantDataChange(e, variantIndex)}
                      className="w-full border border-gray-300 p-2 rounded-md placeholder:text-base"
                      placeholder="Enter primary color here"
                    />
                  </div>

                  {/* secondary_color */}
                  <div className="text-start flex flex-col w-1/2">
                    <label
                      className="block text-gray-700 text-md font-bold mb-1 "
                      htmlFor="secondary_color"
                    >
                      Secondary color
                    </label>
                    <input
                      type="text"
                      id="secondary_color"
                      name="secondary_color"
                      value={productData.secondary_color}
                      onChange={(e) => handleVariantDataChange(e, variantIndex)}
                      className="w-full border border-gray-300 p-2 rounded-md placeholder:text-base"
                      placeholder="Enter secondary color here"
                    />
                  </div>
                </div>

                {/* 
                sizes for shirt
                {
                  size: "S",
                  actual_price: "",
                  offered_price: "",
                  quantity: "",
                }, 
                */}

                {variant.size_variants.map((sizeVariant, sizeVariantIndex) => {
                  // console.log("size ", index )
                  return (
                    <div key={sizeVariantIndex} className="flex w-full gap-x-2">
                      {/* size */}
                      <div className="flex gap-x-2 w-1/5 my-1">
                        {/* size */}
                        <div className="text-start flex flex-col w-full">
                          <label
                            className="block text-gray-700 text-md font-bold mb-1 "
                            htmlFor="primary_color"
                          >
                            Size
                          </label>
                          <input
                            type="text"
                            id="primary_color"
                            name="primary_color"
                            value={sizeVariant.size}
                            onChange={(e) => handleProductDataChange(e)}
                            className="w-full border border-gray-300 p-2 rounded-md placeholder:text-base"
                            placeholder="Enter primary color here"
                            disabled
                          />
                        </div>
                      </div>

                      {/* quantity, actual_price, offered_price */}
                      <div className="flex gap-x-2 w-4/5 my-1">
                        {/* quantity */}
                        <div className="text-start flex flex-col w-1/3">
                          <label
                            className="block text-gray-700 text-md font-bold mb-1 "
                            htmlFor={`quantity_${sizeVariantIndex}`}
                          >
                            Quantity
                          </label>
                          <input
                            type="number"
                            id={`quantity_${sizeVariantIndex}`}
                            name="quantity"
                            value={sizeVariant.quantity}
                            onChange={(e) =>
                              handleVariantSizeDataChange(
                                e,
                                variantIndex,
                                sizeVariantIndex
                              )
                            }
                            className="w-full border border-gray-300 p-2 rounded-md placeholder:text-base"
                            placeholder="Enter quantity here"
                          />
                        </div>

                        {/* actual_price */}
                        <div className="text-start flex flex-col w-1/3">
                          <label
                            className="block text-gray-700 text-md font-bold mb-1 "
                            htmlFor={`actual_price_${sizeVariantIndex}`}
                          >
                            Actual price
                          </label>
                          <input
                            type="number"
                            id={`actual_price_${sizeVariantIndex}`}
                            name="actual_price"
                            value={sizeVariant.actual_price}
                            onChange={(e) =>
                              handleVariantSizeDataChange(
                                e,
                                variantIndex,
                                sizeVariantIndex
                              )
                            }
                            className="w-full border border-gray-300 p-2 rounded-md placeholder:text-base"
                            placeholder="Enter actual price here"
                          />
                        </div>

                        {/* offered_price */}
                        <div className="text-start flex flex-col w-1/3">
                          <label
                            className="block text-gray-700 text-md font-bold mb-1 "
                            htmlFor={`offered_price_${sizeVariantIndex}`}
                          >
                            Offered price
                          </label>
                          <input
                            type="number"
                            id={`offered_price_${sizeVariantIndex}`}
                            name="offered_price"
                            value={sizeVariant.offered_price}
                            onChange={(e) =>
                              handleVariantSizeDataChange(
                                e,
                                variantIndex,
                                sizeVariantIndex
                              )
                            }
                            className="w-full border border-gray-300 p-2 rounded-md placeholder:text-base"
                            placeholder="Enter offered price here"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
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
              onClick={(e) => handleAddProduct(e)}
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

export default ClothingForm;
