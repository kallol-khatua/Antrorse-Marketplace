// import { useEffect, useState } from "react";
// import ProductDetailBody from "./ProductDetailBody";
// import ProductDescription from "./ProductDescription";
// import ProductMergeReview from "./ProductMergeReview";
// import RelatedProducts from "../RelatedProducts/RelatedProducts";
// import { useParams } from "react-router-dom";

// const ProductDetail = () => {
//   const [product, setproduct] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const { productId } = useParams();

//   // console.log(productId)
//   useEffect(() => {
//     console.log(productId+" knfih13") ;
//     // Fetch data when the component mounts or productId changes
//     async function fetchData() {
//       try {
//         const response = await fetch(
//           `http://localhost:3687/app/product/getProductByIdWithRating/${productId}`
//         );

//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         } else {
//           const data = await response.json();
//           setproduct(() => data.result); // Set product data in state
//           setIsLoading(false);
//           // setisLoadingReview(false);
//           // console.log(product);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     }

//     console.log("inside the useEffect");
//     fetchData(); // Call the fetch function

//     // Specify the dependency on productId
//   }, [productId]);
//   useEffect(() => {
//     // console.log(product);
// }, [product]);
//   //for review

//   const [productReview, setproductReview] = useState(null);
//   // const [isLoadingReview, setisLoadingReview] = useState(true);

//   //   // Fetch data when the component mounts
//   //   async function fetchData() {
//   //     try {
//   //       const response = await fetch(

//   //        " http://localhost:3000/app/product/review-ratings/65d83626ab9bd17215bf6368"

//   //       );

//   //       if (!response.ok) {
//   //         throw new Error("Network response was not ok");
//   //       }
//   //       const data = await response.json();
//   //       setproductReview(() => data.result); // Set product data in state
//   //       setisLoadingReview(() => false);
//   //     } catch (error) {
//   //       console.error("Error fetching data:", error);
//   //     }
//   //   }
//   //   console.log("inside the usefeefect");
//   //   fetchData(); // Call the fetch function
//   // }, []);

//   // useEffect(() => {
//   //   fetchData();
//   // }, []);

//   // const fetchData = async () => {
//   //   try {
//   //     const response = await fetch(
//   //       "http://localhost:3000/app/product/review-ratings/65d83626ab9bd17215bf6368"
//   //     );

//   //     if (!response.ok) {
//   //       throw new Error("Network response was not ok");
//   //     }
//   //     const data = await response.json();
//   //     setproductReview(data.result);
//   //     setisLoadingReview(false);
//   //   } catch (error) {
//   //     console.error("Error fetching data:", error);
//   //   }
//   // };

//   return (
//     <div >
//       {isLoading ?
//         <div> hi </div>
//       : (
//         <div className="flex  flex-col gap-4">
//           {/* {console.log(product)} */}
//           <ProductDetailBody product={product} productId={productId} />
//           {/* <ProductDetailBody product={product}  productReview={productReview} /> */}

//           <div className=" flex flex-col gap-2 ">
//             <h2 className="text-center text-4xl font-bold mt-4">
//               Product Details
//             </h2>
//             <ProductDescription product={product} />
//           </div>

//              <div className=" flex flex-col gap-2">
//              <h2 className="text-center text-4xl font-bold">Reviews</h2>
//              <ProductMergeReview productReview={product} />
//            </div>

//           <div className=" flex flex-col gap-2">
//             <h2 className="text-center text-4xl font-bold">
//               Similar Products{" "}
//             </h2>
//             <RelatedProducts />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductDetail;

import { useEffect, useState } from "react";
import ProductDetailBody from "./ProductDetailBody";
import ProductDescription from "./ProductDescription";
import ProductMergeReview from "./ProductMergeReview";
import RelatedProducts from "../RelatedProducts/RelatedProducts";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { productId } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/app/product/getProductByIdWithRating/${productId}`,
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProduct(data.result);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [productId]);

  return (
    <div>
      {isLoading ? (
        <div> Loading... </div>
      ) : (
        <div className="flex flex-col gap-4">
          <ProductDetailBody product={product} productId={productId} />
          <div className="flex flex-col gap-2">
            <h2 className="text-center text-4xl font-bold mt-4">
              Product Details
            </h2>
            <ProductDescription product={product} />
          </div>
          <div className="flex flex-col gap-2">
            {/* <h2 className="text-center text-4xl font-bold">Reviews</h2> */}
            {/* Uncomment the line below if you want to display product reviews */}
            {/* <ProductMergeReview productReview={product} /> */}
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-center text-4xl font-bold">Similar Products</h2>
            <RelatedProducts />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
