import { useState } from "react";
import "react-tagsinput/react-tagsinput.css";
import ProductType from "../../components/ProductType/ProductType";

const AddProd = () => {
  // const [imagesPreview, setImagesPreview] = useState([]);
  const [product, setProduct] = useState({
    product_name: "",
    description: "",
    quantity: "",
    min_order_quantity: "",
    actual_price: "",
    offered_price: "",
    unit_of_measurement: "piece",
    location: "",
  });

  // const maxAllowedImages = 5;

  // const [suggestions, setSuggestions] = useState([
  //   { value: "shirt", label: "Shirt" },
  //   { value: "jeans", label: "Jeans" },
  //   { value: "mobile", label: "Mobile" },
  //   { value: "laptop", label: "Laotop" },
  //   { value: "watch", label: "Watch" },
  //   { value: "jacket", label: "Jeans" },
  //   { value: "joggers", label: "Joogers" },
  //   // Add more suggestions as needed
  // ]);

  // const handleMultiImageChange = (e) => {
  //   const files = e.target.files;

  //   setProduct((prev) => ({
  //     ...prev,
  //     images: [...prev.images, ...Array.from(files)],
  //   }));

  //   Array.from(files).forEach((file) => {
  //     if (imagesPreview.length < maxAllowedImages) {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file);
  //       reader.onload = () => {
  //         setImagesPreview((prev) => [...prev, reader.result]);
  //       };
  //     }
  //   });
  // };

  // const handleRemoveImage = (index) => {
  //   const updatedImages = [...product.images];
  //   updatedImages.splice(index, 1);

  //   setProduct((prev) => ({ ...prev, images: updatedImages }));
  // };

  // const handleChangetag = (selectedOptions) => {
  //   const selectedOptionsValue = selectedOptions.map((tag) => tag.value);

  //   const newTags = selectedOptionsValue.filter((tagValue) => {
  //     return !product.tags.find(
  //       (tag) => tag.value.toLowerCase() === tagValue.toLowerCase()
  //     );
  //   });

  //   newTags.forEach((tagValue) => {
  //     setProduct((prevProduct) => ({
  //       ...prevProduct,
  //       tags: [...prevProduct.tags, { value: tagValue, label: tagValue }],
  //     }));
  //   });
  // };

  // const handleCreateTag = (inputValue) => {
  //   const lowerCaseInputValue = inputValue.toLowerCase();

  //   if (
  //     !suggestions.some(
  //       (suggestion) => suggestion.label.toLowerCase() === lowerCaseInputValue
  //     )
  //   ) {
  //     const newTag = { value: lowerCaseInputValue, label: inputValue };

  //     setSuggestions((prevSuggestions) => [...prevSuggestions, newTag]);

  //     setProduct((prevProduct) => ({
  //       ...prevProduct,
  //       tags: [...prevProduct.tags, newTag],
  //     }));
  //   }
  // };

  // const colourStyles = {
  //   control: (styles) => ({ ...styles, backgroundColor: "white" }),
  //   option: (styles) => {
  //     return {
  //       ...styles,
  //       color: "gray",
  //     };
  //   },
  //   multiValue: (styles) => {
  //     return {
  //       ...styles,
  //       backgroundColor: "#A3EBB1", // Change the background color of selected tags here
  //     };
  //   },
  //   multiValueLabel: (styles) => ({
  //     ...styles,
  //     color: "black", // Change the text color of selected tags here
  //   }),
  // };

  const handleVariation = (type, value) => {
    setProduct((prev) => ({
      ...prev,
      variation: {
        ...prev.variation,
        [type]: value,
      },
    }));
  };

  const resetProduct = () => {
    setProduct({
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

  const handleProductDetailsChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h2 className=" text-2xl shadow-sm font-bold text-center border-b mb-2 pb-4">
        Add Product
      </h2>
      <div className="flex  w-full">
        <div className="w-1/2">
          {/* topsection */}

          <div className="flex w-full justify-between p-2">
            <div className="w-full  bg-white  flex flex-col p-6 gap-y-2 border shadow-lg rounded-md ">
              <div className="flex gap-x-2 w-full">
                {/* Product name */}
                <div className="text-start flex flex-col w-1/2">
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
                    value={product.product_name}
                    onChange={(e) => handleProductDetailsChange(e)}
                    className="w-full border border-gray-300 p-2 rounded-md placeholder:text-base"
                    placeholder="Enter product name"
                  />
                </div>
                {/* Quantity of product */}
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
                    value={product.quantity}
                    onChange={(e) => handleProductDetailsChange(e)}
                    placeholder="Enter quantity"
                    className="w-full border border-gray-300 p-2 rounded-md"
                    required
                  />
                </div>
              </div>

              {/* //multiple image */}
              {/* <div className="">
                <div>
                  <h1 className="font-bold text-gray-700 text-lg text-start">
                    Product Image
                  </h1>
                </div>

                {product.images.length > 0 && (
                  <div className="flex flex-wrap  border-dashed border-2 border-gray-300 rounded-md ">
                    {imagesPreview.map((image, index) => (
                      <div key={index} className=" w-1/6 m-2 relative">
                        <img
                          src={image}
                          alt={`Product Image ${index + 1}`}
                          className="w-full h-32 object-cover rounded-md"
                        />
                        <button
                          className="absolute -top-2 -right-2 bg-red-500 text-white px-2 rounded-full cursor-pointer hover:bg-red-700"
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div
                  className={`flex ${
                    product.images.length >= maxAllowedImages ? "hidden" : ""
                  }`}
                >
                  <div
                    className="text-start flex py-3 h-full w-full"
                    disabled={product.images.length >= maxAllowedImages}
                  >
                    <label
                      htmlFor="multipleImages"
                      className="cursor-pointer w-full block bg-gray-100 border-dashed border-2 border-gray-300 p-4 rounded-md text-center "
                    >
                      <h2 className="mb-2 text-ls font-semibold">
                        Select Multiple images here
                      </h2>
                      <span className="text-sm text-gray-600">
                        or click to select
                      </span>
                      <input
                        type="file"
                        id="multipleImages"
                        name="multipleImages"
                        accept="image/*"
                        multiple
                        onChange={handleMultiImageChange}
                        disabled={product.images.length >= maxAllowedImages}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div> */}

              <div className="flex gap-x-2 w-full">
                {/* Quantity of product */}
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
                    value={product.min_order_quantity}
                    onChange={(e) => handleProductDetailsChange(e)}
                    placeholder="Enter minimum order quantity"
                    className="w-full border border-gray-300 p-2 rounded-md"
                    required
                  />
                </div>
                {/* unit of measurement  */}
                <div className="text-start flex flex-col w-1/2">
                  <label
                    className="block text-gray-700 text-md font-bold mb-2"
                    htmlFor="stock"
                  >
                    Unit of measurement
                  </label>
                  <select
                    id="custom-select"
                    name="unit_of_measurement"
                    value={product.unit_of_measurement}
                    onChange={(e) => handleProductDetailsChange(e)}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="piece">Piece</option>
                    <option value="kg">Kilogram (kg)</option>
                    <option value="g">Gram (g)</option>
                    <option value="L">Liter (L)</option>
                    <option value="ml">Milliliter (ml)</option>
                  </select>
                </div>
              </div>

              {/* price */}
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
                    value={product.actual_price}
                    onChange={(e) => handleProductDetailsChange(e)}
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
                    value={product.offered_price}
                    onChange={(e) => handleProductDetailsChange(e)}
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
                    htmlFor="location"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={product.location}
                    onChange={(e) => handleProductDetailsChange(e)}
                    className="w-full border border-gray-300 p-2 rounded-md"
                    // placeholder={`Enter actual price per ${product.unit_of_measurement}`}
                    placeholder="Enter location of the product"
                    required
                  />
                </div>
              </div>

              {/* Dimension */}
              {/* <div className="flex gap-x-2">
                <div className="text-start flex flex-col">
                  <label
                    className="block text-gray-700 text-md   mb-2"
                    htmlFor="price"
                  >
                    Height
                  </label>
                  <input
                    type="number"
                    id="height"
                    name="height"
                    className="w-full border border-gray-300 p-2 rounded-sm"
                    required
                    value={product.dimensions.height}
                    onChange={(e) => {
                      setProduct((prev) => ({
                        ...prev,
                        dimensions: {
                          ...prev.dimensions,
                          height: Number(e.target.value),
                        },
                      }));
                    }}
                  />
                </div>
                <div className="text-start flex flex-col">
                  <label
                    className="block text-gray-700 text-md whitespace-nowrap  mb-2"
                    htmlFor="discount"
                  >
                    Width
                  </label>
                  <input
                    type="number"
                    id="width"
                    name="width"
                    className="w-full border border-gray-300 p-2 rounded-md"
                    required
                    value={product.dimensions.width}
                    onChange={(e) => {
                      setProduct((prev) => ({
                        ...prev,
                        dimensions: {
                          ...prev.dimensions,
                          width: Number(e.target.value),
                        },
                      }));
                    }}
                  />
                </div>

                <div className="text-start flex flex-col">
                  <label
                    className="block text-gray-700 text-md   mb-2"
                    htmlFor="stock"
                  >
                    Length
                  </label>
                  <input
                    type="number"
                    id="weight"
                    name="weight"
                    className="w-full border border-gray-300 p-2 rounded-md"
                    required
                    value={product.dimensions.length}
                    onChange={(e) => {
                      setProduct((prev) => ({
                        ...prev,
                        dimensions: {
                          ...prev.dimensions,
                          length: Number(e.target.value),
                        },
                      }));
                    }}
                  />
                </div>
                <div className="text-start flex flex-col">
                  <label
                    className="block text-gray-700 text-md   mb-2"
                    htmlFor="stock"
                  >
                    Weight
                  </label>
                  <input
                    type="number"
                    id="weight"
                    name="weight"
                    className="w-full border border-gray-300 p-2 rounded-md"
                    required
                    value={product.dimensions.weight}
                    onChange={(e) => {
                      setProduct((prev) => ({
                        ...prev,
                        dimensions: {
                          ...prev.dimensions,
                          weight: Number(e.target.value),
                        },
                      }));
                    }}
                  />
                </div>
              </div> */}

              {/* //Description */}
              <div className="">
                <div>
                  <h1 className="font-bold text-gray-700 text-lg mt-3 text-start">
                    Product Description
                  </h1>
                </div>

                <hr />

                <textarea
                  id="description"
                  name="description"
                  cols="30"
                  rows="4"
                  className="bg-gray-50 border-2 border-gray-400 rounded-md p-2 w-full"
                  placeholder="Write product description"
                  value={product.description}
                  onChange={(e) => handleProductDetailsChange(e)}
                ></textarea>
              </div>

              {/* tags */}
              {/* <div>
                <label
                  className="block text-gray-700 text-md font-bold mb-2"
                  htmlFor="tags"
                >
                  Tags
                </label>
                <CreatableSelect
                  isMulti
                  options={suggestions}
                  value={product.tags || product.tags.value}
                  styles={colourStyles}
                  onChange={(selectedOptions) =>
                    handleChangetag(selectedOptions)
                  }
                  onCreateOption={handleCreateTag}
                />
              </div> */}
            </div>
          </div>
        </div>

        {/* right section */}

        <ProductType
          handleVariation={handleVariation}
          basicProductInfo={product}
          resetProduct={resetProduct}
        />
      </div>
    </div>
  );
};

export default AddProd;

// const handleChange = (e) => {
//   const { name, value } = e.target;
//   if (
//     name === "productName" ||
//     name === "productType" ||
//     name === "description"
//   ) {
//     // String validation
//     if (!/^[a-zA-Z\s]*$/.test(value)) {
//       alert(
//         `Please enter a valid ${name}. Only letters and spaces are allowed.`
//       );
//       return;
//     }
//   } else if (
//     name === "price" ||
//     name === "discountPrice" ||
//     name === "stock"
//   ) {
//     // Number validation
//     if (!/^\d+$/.test(value)) {
//       alert(`Please enter a valid ${name}. Only numbers are allowed.`);
//       return;
//     }
//   }

//   setProduct((prevProduct) => ({
//     ...prevProduct,
//     [name]: value,
//   }));
// };
