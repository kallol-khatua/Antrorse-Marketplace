// import React, { useState } from "react";
// import StarRating from "../StartRating/StartRating";

// const ProductFeedback = ({productReview}) => {

//   console.log("product reviw in feed back comp", productReview);
//   const initialVisibleReviews = 2;
//   const [visibleReviews, setVisibleReviews] = useState(initialVisibleReviews);
//   const [showAllReviews, setShowAllReviews] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [selectedReview, setSelectedReview] = useState(null);
//   const name= "John Lester";

//   const showMoreReviews = () => {
//     setVisibleReviews((prevVisibleReviews) => prevVisibleReviews + 4);
//   };

//   const hideReviews = () => {
//     setVisibleReviews(initialVisibleReviews);
//     setShowAllReviews(false);
//   };

//   const enlargeImage = (image,review) => {
//     setSelectedImage(image);
//     setSelectedReview(review);
//   };

//   const closeImage = () => {
//     setSelectedImage(null);
//     setSelectedReview(null); 
//   };

//   const formatDate = (dateString) => {
//     const options = { day: "numeric", month: "short", year: "numeric" };
//     return new Date(dateString).toLocaleDateString("en-US", options);
//   };


//   const navigateImage = direction => {
//     if (direction === "prev") {
//       setSelectedImageIndex(prevIndex =>
//         prevIndex === 0 ? productReview.length - 1 : prevIndex - 1
//       );
//     } else {
//       setSelectedImageIndex(prevIndex =>
//         prevIndex === productReview.length - 1 ? 0 : prevIndex + 1
//       );
//     }
//   };
//   return (
//     <div>
//       <h2 className="text-blue-900 text-2xl font-bold mt-6">User Reviews</h2>
//       <div className="max-h-96 bg-white overflow-y-auto overflow-x-hidden scrollbar-none">
//         <ul className="">
//           {productReview
//             .slice(0, showAllReviews ? productReview.length : visibleReviews)
//             .map((review, index) => (
//               <li key={index} className="py-8 text-left px-4 m-2 border-b-2">
//                 <div className="flex items-start">
                  
//                   <div className="ml-6">
//                     <p className="text-sm font-bold text-gray-900">
//                       {name}
//                     </p>
//                     <div className="flex items-center">
//                       <StarRating rating={4} />
//                     </div>
                   
//                     <div className="mt-2 flex">
//                       {review.images.map((image, idx) => (
//                         <img
//                           key={idx}
//                           src={image}
//                           alt={`Review Image ${idx + 1}`}
//                           className="w-24 h-24 object-cover mr-2 cursor-pointer"
//                           onClick={() => enlargeImage(image,review)}
//                         />
//                       ))}
//                     </div>

//                     <p className="mt-2 text-base text-gray-900">{review.review}</p>
//                     <p className="mt-1 text-sm text-gray-600">{formatDate(review.createdAt)}</p>
//                   </div>
//                 </div>
//               </li>
//             ))}
//         </ul>
//         {productReview.length > initialVisibleReviews && (
//           <div>
//             {showAllReviews ? (
//               <button
//                 onClick={hideReviews}
//                 className="bg-red-500 text-white px-4 py-2 rounded mt-4"
//               >
//                 Hide
//               </button>
//             ) : (
//               <button
//                 onClick={() => setShowAllReviews(true)}
//                 className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
//               >
//                 Show All
//               </button>
//             )}
//           </div>
//         )}
//       </div>

//       {selectedImageIndex !== null && (
//         <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-75" onClick={closeImage}>
//           <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-4 shadow-lg">
//             <div className="relative w-56 h-56 overflow-hidden rounded-lg mb-4">
//               <img
//                 src={productReview[selectedImageIndex].images[0]}
//                 alt="Enlarged Image"
//                 className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 transform hover:scale-110"
//               />
//               <button
//                 className="absolute top-0 bottom-0 z-10 flex items-center justify-center w-12 bg-black bg-opacity-50 text-white hover:bg-opacity-75"
//                 style={{ left: 0 }}
//                 onClick={() => navigateImage("prev")}
//               >
//                 &lt;
//               </button>
//               <button
//                 className="absolute top-0 bottom-0 z-10 flex items-center justify-center w-12 bg-black bg-opacity-50 text-white hover:bg-opacity-75"
//                 style={{ right: 0 }}
//                 onClick={() => navigateImage("next")}
//               >
//                 &gt;
//               </button>
//             </div>
//             <p className="text-lg text-gray-900">{selectedReview.review}</p>
//             <p className="text-sm text-gray-600 mt-2">{formatDate(selectedReview.createdAt)}</p>
//           </div>
//         </div>
//       )}




//     </div>
//   );
// };

// export default ProductFeedback;


import React, { useState } from "react";
import StarRating from "../StartRating/StartRating";

const ProductFeedback = ({ productReview }) => {
  const initialVisibleReviews = 2;
  const [visibleReviews, setVisibleReviews] = useState(initialVisibleReviews);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);
  const name = "John Lester";
  const rating= productReview[0].productDetails[0];

  const showMoreReviews = () => {
    setVisibleReviews((prevVisibleReviews) => prevVisibleReviews + 4);
  };

  const hideReviews = () => {
    setVisibleReviews(initialVisibleReviews);
    setShowAllReviews(false);
  };

  const enlargeImage = (image, review) => {
    setSelectedImage(image);
    setSelectedReview(review);
  };

  const closeImage = () => {
    setSelectedImage(null);
    setSelectedReview(null);
  };

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const navigateImage = (direction) => {
    // Find the index of the currently selected image in the review's images array
    const currentIndex = selectedReview.images.indexOf(selectedImage);
    let newIndex;

    if (direction === "prev") {
      newIndex = currentIndex === 0 ? selectedReview.images.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === selectedReview.images.length - 1 ? 0 : currentIndex + 1;
    }

    // Set the new selected image
    setSelectedImage(selectedReview.images[newIndex]);
  };

  return (
    <div>
      <h2 className="text-blue-900 text-2xl font-bold mt-6">User Reviews</h2>
      <div className="max-h-96 bg-white overflow-y-auto overflow-x-hidden scrollbar-none">
        <ul className="">
          {productReview
            .slice(0, showAllReviews ? productReview.length : visibleReviews)
            .map((review, index) => (
              <li key={index} className="py-8 text-left px-4 m-2 border-b-2">
                <div className="flex items-start">
                  <div className="ml-6">
                    <p className="text-sm font-bold text-gray-900">{name}</p>
                    <div className="flex items-center">
                      {console.log(review.rating,"bgeg")}
                      <StarRating rating={4} />
                    </div>
                    <div className="mt-2 flex">
                      
                      {review.images && review.images.map((image, idx) => (
                              <img
                                  key={idx}
                                  src={image}
                                  alt={`Review Image ${idx + 1}`}
                                  className="w-24 h-24 object-cover mr-2 cursor-pointer"
                                  onClick={() => enlargeImage(image, review)}
                              />
                          ))}

                    </div>
                    <p className="mt-2 text-base text-gray-900">{rating.description}</p>
                    <p className="mt-1 text-sm text-gray-600">{formatDate(review.createdAt)}</p>
                  </div>
                </div>
              </li>
            ))}
        </ul>
        {productReview.length > initialVisibleReviews && (
          <div>
            {showAllReviews ? (
              <button
                onClick={hideReviews}
                className="bg-red-500 text-white px-4 py-2 rounded mt-4"
              >
                Hide
              </button>
            ) : (
              <button
                onClick={() => setShowAllReviews(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
              >
                Show All
              </button>
            )}
          </div>
        )}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-75" onClick={closeImage}>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-4 shadow-lg">
            <div className="relative w-56 h-56 overflow-hidden rounded-lg mb-4">
              <img
                src={selectedImage}
                alt="Enlarged Image"
                className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 transform hover:scale-110"
              />
             
            
            </div>
            <p className="text-lg text-gray-900">{selectedReview.review}</p>
            <p className="text-sm text-gray-600 mt-2">{formatDate(selectedReview.createdAt)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductFeedback;

