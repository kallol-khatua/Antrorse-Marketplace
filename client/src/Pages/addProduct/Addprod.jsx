import { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";

import "react-tagsinput/react-tagsinput.css";
import ProductType from "../../components/ProductType/ProductType";
import axios from "axios";

const AddProd = () => {
  const [imagesPreview, setImagesPreview] = useState([]);
  const [product, setProduct] = useState({
    description: "",
    tags: [],
    images: [],
    name: "",
    productType: "",
    price: "",
    discount: "",
    stock: "",
    dimensions: {
      height: "",
      width: "",
      length: "",
      weight: "",
    },
    variation: {
      category_selection: "",
      brand_name: "",
      Material: [],
      sizes: [],
      color: [],
      camera_pixel: "",
      screen_size: "",
      model_number: "",
      warranty: "",
    },
  });

  const maxAllowedImages = 5;

  const [suggestions, setSuggestions] = useState([
    { value: "shirt", label: "Shirt" },
    { value: "jeans", label: "Jeans" },
    { value: "mobile", label: "Mobile" },
    { value: "laptop", label: "Laotop" },
    { value: "watch", label: "Watch" },
    { value: "jacket", label: "Jeans" },
    { value: "joggers", label: "Joogers" },
    // Add more suggestions as needed
  ]);

  const handleMultiImageChange = (e) => {
    const files = e.target.files;

    setProduct((prev) => ({
      ...prev,
      images: [...prev.images, ...Array.from(files)],
    }));

    Array.from(files).forEach((file) => {
      if (imagesPreview.length < maxAllowedImages) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setImagesPreview((prev) => [...prev, reader.result]);
        };
      }
    });
  };


  const handleRemoveImage = (index) => {
    const updatedImages = [...product.images];
    updatedImages.splice(index, 1);

    setProduct((prev) => ({ ...prev, images: updatedImages }));
  };

  const handleChangetag = (selectedOptions) => {
    const selectedOptionsValue = selectedOptions.map((tag) => tag.value);

    const newTags = selectedOptionsValue.filter((tagValue) => {
      return !product.tags.find(
        (tag) => tag.value.toLowerCase() === tagValue.toLowerCase()
      );
    });

    newTags.forEach((tagValue) => {
      setProduct((prevProduct) => ({
        ...prevProduct,
        tags: [...prevProduct.tags, { value: tagValue, label: tagValue }],
      }));
    });
  };

  const handleCreateTag = (inputValue) => {
    const lowerCaseInputValue = inputValue.toLowerCase();

    if (
      !suggestions.some(
        (suggestion) => suggestion.label.toLowerCase() === lowerCaseInputValue
      )
    ) {
      const newTag = { value: lowerCaseInputValue, label: inputValue };

      setSuggestions((prevSuggestions) => [...prevSuggestions, newTag]);

      setProduct((prevProduct) => ({
        ...prevProduct,
        tags: [...prevProduct.tags, newTag],
      }));
    }
  };

  const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    option: (styles) => {
      return {
        ...styles,
        color: "gray",
      };
    },
    multiValue: (styles) => {
      return {
        ...styles,
        backgroundColor: "#A3EBB1", // Change the background color of selected tags here
      };
    },
    multiValueLabel: (styles) => ({
      ...styles,
      color: "black", // Change the text color of selected tags here
    }),
  };

  const handleVariation = (type, value) => {
    setProduct((prev) => ({
      ...prev,
      variation: {
        ...prev.variation,
        [type]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/app/product/AddProduct`,
      product,
      {
        headers: {
          token:
            localStorage.getItem("sellerauthToken"),
          "Content-Type": "multipart/form-data",
          // "Content-Type": "application/json",
        },
      }
    );
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
              <label
                className="block text-gray-700 text-md font-bold   mb-2"
                htmlFor="name"
              >
                Product Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={product.name}
                onChange={(e) => {
                  setProduct((prev) => {
                    return { ...prev, name: e.target.value };
                  });
                }}
                className="w-full border border-gray-300 p-2 rounded-md placeholder:text-ls"
                placeholder="Enter product Name"
              />

              {/* //multiple image */}
              <div className="">
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
              </div>

              <div className="flex gap-x-2">
                <div className="text-start flex flex-col">
                  <label
                    className="block text-gray-700 text-md   mb-2"
                    htmlFor="price"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={product.price}
                    onChange={(e) => {
                      setProduct((prev) => {
                        return { ...prev, price: Number(e.target.value) };
                      });
                    }}
                    className="w-full border border-gray-300 p-2 rounded-sm"
                    required
                  />
                </div>
                <div className="text-start flex flex-col">
                  <label
                    className="block text-gray-700 text-md whitespace-nowrap  mb-2"
                    htmlFor="discount"
                  >
                    Discount Percent
                  </label>
                  <input
                    type="number"
                    id="discount"
                    name="discount"
                    value={product.discount}
                    onChange={(e) => {
                      setProduct((prev) => {
                        return {
                          ...prev,
                          discount: Number(e.target.value),
                        };
                      });
                    }}
                    className="w-full border border-gray-300 p-2 rounded-md"
                    required
                  />
                </div>

                <div className="text-start flex flex-col">
                  <label
                    className="block text-gray-700 text-md   mb-2"
                    htmlFor="stock"
                  >
                    Stock
                  </label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={product.stock}
                    onChange={(e) => {
                      setProduct((prev) => {
                        return { ...prev, stock: Number(e.target.value) };
                      });
                    }}
                    className="w-full border border-gray-300 p-2 rounded-md"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-x-2">
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
              </div>

              {/* //Description */}
              <div className="">
                <div>
                  <h1 className="font-bold text-gray-700 text-lg mt-3 text-start">
                    Product Description
                  </h1>
                </div>

                <hr />

                <textarea
                  name="description"
                  id="description"
                  cols="30"
                  rows="8"
                  className="bg-gray-50 border-2 border-gray-400 rounded-md p-2 w-full"
                  placeholder="Write product description"
                  value={product.description}
                  onChange={(e) => {
                    setProduct((prev) => {
                      return { ...prev, description: e.target.value };
                    });
                  }}
                ></textarea>
              </div>

              {/* tags */}
              <div>
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
              </div>
            </div>
          </div>
        </div>

        {/* right section */}
        <div className="w-1/2">
          <div className="">
            <ProductType handleVariation={handleVariation} />
          </div>

          <div className="">
            <div className="m-6 flex justify-center">
              <button
                onClick={handleSubmit}
                type="submit"
                className="w-1/3 bg-green-500 text-white p-2 rounded-md hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
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