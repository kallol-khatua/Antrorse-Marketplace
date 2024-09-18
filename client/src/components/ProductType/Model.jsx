import React, { useState } from "react";
import { CiMobile3 } from "react-icons/ci";

const Model = ({ setModalVisible, handleAddProductCategory }) => {
  const [newCategory, setNewCategory] = useState({
    name: "",
    logo: <CiMobile3 />,
  });

  const handleChange = (e) => {
    const newCategoryName = e.target.value;
    setNewCategory((prev) => ({ ...prev, name: newCategoryName }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddProductCategory(newCategory);
    setModalVisible(false);
  };

  return (
    <>
      {/* ... (existing modal code) */}

      {/* Modal body */}
      <div className="p-4 md:p-5">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Category Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Category Name"
              value={newCategory.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* You can add more input fields for additional category details */}
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add Category
          </button>
        </form>
      </div>
    </>
  );
};

export default Model;
