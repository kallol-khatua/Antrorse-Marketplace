import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/features/Cart/CartSlice";
import { removeFromWishlist } from "../../redux/features/Wishlist/WishlistSlice";
import toast, { Toaster } from "react-hot-toast";
import StarRating from "../../components/StartRating/StartRating";
import axios from "axios";

const Wishlist = () => {
  const dispatch = useDispatch();
  const [wishlistItems, setWishlistItems] = useState([]);

  function formatPrice(price) {
    return "₹" + price;
  }

  const addItemToCart = async (product) => {
    await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/app/cart/createCart`,
      { product_id: product._id },

      {
        headers: {
          token: localStorage.getItem("authToken"),
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(addToCart(product._id));

    await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/app/user/removeFromWishlist/${
        product._id
      }`,
      {},
      {
        headers: {
          token: localStorage.getItem("authToken"),
        },
      }
    );
    dispatch(removeFromWishlist(product._id));
    toast.success("Moved to the cart");
    fetchWishlistData();
  };

  const removeItemFromWishlist = async (product) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/app/user/removeFromWishlist/${
          product._id
        }`,
        {},
        {
          headers: {
            token: localStorage.getItem("authToken"),
          },
        }
      );
      dispatch(removeFromWishlist(product._id));
      toast.success("Item removed from the wishlist");

      // Fetch updated wishlist data after removal
      fetchWishlistData();
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
      toast.error("Failed to remove item from wishlist");
    }
  };

  const fetchWishlistData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/app/user/getWishList`,
        {
          headers: {
            token: localStorage.getItem("authToken"),
          },
        }
      );
      setWishlistItems(response.data.result);
    } catch (error) {
      console.error("Error fetching wishlist data:", error);
    }
  };

  useEffect(() => {
    fetchWishlistData();
  }, []);

  return (
    <div className="container mx-auto p-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold my-4 sm:text-3xl">
        My Wishlist {wishlistItems[0]?.productDetails.length} items
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {wishlistItems.map((wishlistItem) =>
          wishlistItem.productDetails.map((product) => (
            <div
              className="border border-gray-200 rounded-md"
              key={product._id}
            >
              <div className="">
                <a href="#" className="object-contain">
                  <img
                    src={product.images[0]}
                    alt=""
                    className="object-fill w-[100%] h-52 "
                  />
                </a>
              </div>
              <div className="p-3 bg-gray-50">
                <h5 className="text-lg font-bold tracking-tight h-16 line-clamp-2">
                  {product.description}
                </h5>
                <div className="mb-2 flex justify-between">
                  <h2 className="text-sm overflow-hidden overflow-ellipsis whitespace-nowrap">
                    {product.subCategory
                      ? product.subCategory
                      : "Not Available"}
                  </h2>
                </div>
                <div className="mb-2 flex justify-between">
                  <StarRating rating={3} />
                  <p className="text-md font-semibold text-green-600">
                    <span>{formatPrice(product.price)}</span>
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    className="flex justify-center px-2 py-2 text-blue-600 border border-blue-300 rounded-md hover:bg-blue-700 hover:text-gray-100 dark:hover:bg-gray-800 dark:hover:border-gray-900"
                    onClick={() => addItemToCart(product)}
                  >
                    Move to cart
                  </button>
                  <button
                    className="flex justify-center px-4 py-2 bg-blue-100 text-blue-600 border border-blue-300 rounded-md hover:bg-blue-700 hover:border-none hover:text-gray-100 dark:hover:bg-red-600"
                    onClick={() => removeItemFromWishlist(product)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <Toaster position="top-right" containerStyle={{ zIndex: "99999" }} />
    </div>
  );
};

export default Wishlist;
