import { useState } from "react";
import TagsInput from "react-tagsinput";
import { FaUpload } from "react-icons/fa";
import "react-tagsinput/react-tagsinput.css";

const AddProduct = () => {
  const [productImages, setProductImages] = useState([]);

  const handleMultiImageChange = (e) => {
    const files = e.target.files;

    if (files.length > 0) {
      const newImages = Array.from(files).map((file) => ({
        url: URL.createObjectURL(file),
        file: file,
      }));

      setProductImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const [product, setProduct] = useState({
    productName: "",
    productType: "",
    price: "",
    discount: "",
    discountPrice: "",
    description: "",
    Stockkeepingunit: "",
    stock: "",
    minimumstock: "",
    tags: [],
    coverimage: "",
    photos: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleTagsChange = (tags) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      tags: tags,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        coverimage: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product:", product);
  };

  return (
    <div className="w-full">
      {/* topsection */}

      <div>
        <h2 className="px-28  pt-20 mr-6 font-semibold text-2xl">
          Add New Product
        </h2>
      </div>

      <div className="flex w-full justify-between p-10">
        <div className="w-1/3 max-w-md mx-auto mt-24 flex flex-col  gap-y-4  border   h-full  shadow-lg p-6 bg-gray rounded-md">
          <div>
            <h1 className="font-semibold text-lg text-start">Product Image</h1>
          </div>
          <hr />

          <div className="mb-4  w-full text-start">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="tags"
            >
              Tags
            </label>
            <TagsInput
              className="border border-gray-400 focus:border-black active:border-black outline-none p-2"
              id="tags"
              name="tags"
              value={product.tags}
              onChange={handleTagsChange}
            />
          </div>

          <div className="gap-y-4">
            {product.coverimage && (
              <div className="mb-4 flex">
                <img
                  src={product.coverimage}
                  alt="Cover Image"
                  className="w-full h-32 rounded-md mb-2 "
                />
              </div>
            )}
            <div className="text-start flex py-3">
              <h2>Add cover photo</h2>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
                className="hidden"
              />
              <label
                htmlFor="image"
                className="cursor-pointer text-sm text-gray-600 px-3 py-2 "
              >
                {<FaUpload />}
              </label>
            </div>

            {productImages.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {productImages.map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    alt={`Product Image ${index + 1}`}
                    className="w-20 h-12 object-contain rounded-md mb-2"
                  />
                ))}
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              <label htmlFor="multipleImages" className=" ">
                Add Multiple Images
              </label>
              <input
                type="file"
                id="multipleImages"
                name="multipleImages"
                accept="image/*"
                multiple
                onChange={handleMultiImageChange}
                className="hidden"
              />
              <label
                htmlFor="multipleImages"
                className="cursor-pointer text-sm text-gray-600  py-2 rounded-md "
              >
                {<FaUpload />}
              </label>
            </div>
          </div>
        </div>

        {/* right section */}
        <div className=" mr-20">
          <div>
            <div className="max-w-md mx-auto mt-10 p-6  rounded-md  border shadow-lg  bg-gray ">
              <h2 className="text-md text-start font-semibold mb-6">
                Product Information
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="shadow-lg p-6 bg-gray rounded-md">
                  <div>
                    <label
                      className="text-start block text-gray-700 text-xs   mb-2"
                      htmlFor="productName"
                    >
                      Product Name
                    </label>
                    <input
                      type="text"
                      id="productName"
                      name="productName"
                      value={product.productName}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded-sm"
                      required
                    />
                  </div>
                  <label
                    className="text-start block text-gray-700 text-xs    mb-2"
                    htmlFor="productName"
                  >
                    Product Type
                  </label>
                  <input
                    type="text"
                    id="productType"
                    name="productType"
                    value={product.productType}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-md placeholder:text-xs"
                    required
                  />
                  <div className="flex gap-x-2">
                    <div className="text-start flex flex-col">
                      <label
                        className="block text-gray-700 text-xs   mb-2"
                        htmlFor="productName"
                      >
                        Price
                      </label>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded-sm"
                        required
                      />
                    </div>
                    <div className="text-start flex flex-col">
                      <label
                        className="block text-gray-700 text-sm  mb-2"
                        htmlFor="productName"
                      >
                        Discount
                      </label>
                      <input
                        type="text"
                        id="discount"
                        name="discount"
                        value={product.discount}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded-md"
                        required
                      />
                    </div>
                    <div className="text-start flex flex-col">
                      <label
                        className="block text-gray-700 text-sm  mb-2"
                        htmlFor="productName"
                      >
                        Discount Price
                      </label>
                      <input
                        type="text"
                        id="discountPrice"
                        name="discountPrice"
                        value={product.discountPrice}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded-md"
                        required
                      />
                    </div>
                  </div>
                  <label
                    className="block text-gray-700 text-sm mb-2"
                    htmlFor="productName"
                  >
                    Product Description
                  </label>

                  <input
                    type="text"
                    id="description"
                    name="description"
                    value={product.productName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-md"
                    required
                  />
                  <div className="flex gap-x-2">
                    <div className="text-start flex flex-col">
                      <label
                        className="block text-gray-700 text-xs   mb-2"
                        htmlFor="productName"
                      >
                        Stock
                      </label>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded-md"
                        required
                      />
                    </div>
                    <div className="text-start flex flex-col">
                      <label
                        className="block text-gray-700 text-sm  mb-2"
                        htmlFor="productName"
                      >
                        minimumstock
                      </label>
                      <input
                        type="text"
                        id="discount"
                        name="discount"
                        value={product.discount}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded-md"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* <div className="flex items-center gap-x-2  ">
                  <label
                    className="block text-gray-700 text-sm  mb-2"
                    htmlFor="productName"
                    >
                    Stock
                  </label>
                  <input
                    type="number"
                    id=""
                    name="stock"
                    value={product.productName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-md"
                    required
                    />
                  <label
                    className="block text-gray-700 text-sm  mb-2"
                    htmlFor="productName"
                    >
                    minimum stock
                  </label>
                  <input
                    type="number"
                    id="productName"
                    name="minimumstock"
                    value={product.productName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-md"
                    required
                    />
                </div> */}
                <div className="m-6 flex justify-center">
                  <button
                    type="submit"
                    className="w-1/3 bg-green-500 text-white p-2 rounded-md hover:bg-blue-600"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
