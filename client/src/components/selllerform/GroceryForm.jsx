import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";


function GroceryForm({ product, handleChange, handleSubmit }) {
  const [tags, setTags] = useState([]);
  const [suggestions, setSuggestions] = useState([
    { value: "Rice", label: "Rice" },
    { value: "soap", label: "soap" },
    { value: "Oil", label: "Oil" },
    { value: "Spices", label: "Spices" },
    { value: "others", label: "others" },

    // Add more suggestions as needed
  ]);
  const handleChangetag = (selectedTags) => {
    setTags(selectedTags);
  };
  const handleCreateTag = (inputValue) => {
    // Create a new tag if it doesn't exist in suggestions
    if (
      !suggestions.some(
        (suggestion) =>
          suggestion.label.toLowerCase() === inputValue.toLowerCase()
      )
    ) {
      setSuggestions((prevSuggestions) => [
        ...prevSuggestions,
        { value: inputValue.toLowerCase(), label: inputValue },
      ]);
    }
    // Add the newly created tag to the selected tags
    setTags((prevTags) => [
      ...prevTags,
      { value: inputValue.toLowerCase(), label: inputValue },
    ]);
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

  return (
    <div>
      <div className=" mx-auto mt-6 p-6   bg-white rounded-md shadow-sm  border ">
        <h2 className="text-lg text-start font-bold mb-6">
          Product Information
        </h2>
        <form onSubmit={handleSubmit}>
          {/* tags */}
          <div>
            <label
              className="block text-gray-700 text-md  mb-2"
              htmlFor="productName"
            >
              Select category
            </label>

            <CreatableSelect
              isMulti
              options={suggestions}
              value={tags}
              styles={colourStyles}
              onChange={handleChangetag}
              onCreateOption={handleCreateTag}
            />
          </div>

          <div className="flex gap-x-2">
            <div className="text-start w-1/2">
              <label
                className="block text-gray-700 text-md mb-2"
                htmlFor="color"
              >
                Quantity
              </label>
              <input
                type="text"
                id="color"
                name="color"
                // value={product.productName}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
                required
              />
            </div>

            <div className="text-start w-1/2">
              <label
                className="block text-gray-700 text-md mb-2"
                htmlFor="material"
              >
                Weight
              </label>
              <input
                type="text"
                id="material"
                name="material"
                // value={product.productName}
                onChange={handleChange}
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
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md placeholder:text-xs"
                required
              />
            </div>
            <div className="text-start w-1/2">
              <label
                className="text-start block text-gray-700 text-md    mb-2"
                htmlFor="productName"
              >
                Packaging
              </label>
              <input
                type="text"
                id="productType"
                name="productType"
                // value={product.productType}
                onChange={handleChange}
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
                Best Before
              </label>
              <input
                type="date"
                id="warrantyStatus"
                name="warrantyStatus"
                // value={product.warrantyStatus}
                onChange={handleChange}
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

export default GroceryForm;
