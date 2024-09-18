import React, { useState } from "react";
import axios from "axios"; // Import Axios for making HTTP requests

const ProductReviewForm = ({ toggleForm, fetchData }) => {
  const [Rating, setRating] = useState("");
  const [Review, setReview] = useState("");

  const handleCancel = () => {
    setRating("");
    setReview("");
    toggleForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      // Make POST request to the specified URL with the provided data and token
      const response = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/app/product//add-review-ratings/65d83626ab9bd17215bf6368`,
        {
          rating: Rating, // Assuming 'name' corresponds to the rating
          review: Review, // Assuming 'desc' corresponds to the review description
        },
        {
          headers: {
            token: localStorage.getItem("authToken"),
            // Include the token in the request headers
          },
        }
      );

      console.log("Response:", response.data); // Log the response data
      fetchData();
      toggleForm();
    } catch (error) {
      console.error("Error:", error); // Log any errors that occur during the request
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow sm:max-w-md mt-6">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
          Write Review
        </h1>

        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm font-medium text-gray-900">
              Rating
            </label>
            <input
              type="text"
              name="Rating"
              id="Rating"
              className="bg-gray-50 border text-gray-900 sm:text-sm rounded-md focus:ring-2 focus:outline-none focus:ring-slate-600 block w-full p-2.5"
              placeholder="Rating"
              value={Rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="Review"
              className="text-sm font-medium text-gray-900"
            >
              Review
            </label>
            <textarea
              type="textarea"
              name="Review"
              id="Review"
              className="bg-gray-50 border text-gray-900 sm:text-sm rounded-md focus:ring-2 focus:outline-none focus:ring-slate-600 block w-full p-2.5"
              placeholder="Write review here"
              value={Review}
              onChange={(e) => setReview(e.target.value)}
            />
          </div>
          <div className="flex justify-center mb-3 gap-4">
            <div className="">
              <button
                type="submit"
                className="w-full text-slate-200 bg-blue-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md text-sm px-5  py-2.5 text-center"
                // onClick={()=>toggleForm()}
              >
                Submit
              </button>
            </div>
            <div className="">
              <button
                type="button"
                className="text-black bg-gray-200 focus:ring-3 focus:outline-none focus:ring-primary-300 font-medium rounded-md text-sm px-5 py-2.5"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductReviewForm;
