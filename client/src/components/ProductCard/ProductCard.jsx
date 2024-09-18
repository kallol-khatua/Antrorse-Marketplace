import React, { useState } from "react";
import StarRating from "../StartRating/StartRating";

import { HiOutlineShoppingCart } from "react-icons/hi";
import { IoHeartSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/features/Cart/CartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/features/Wishlist/WishlistSlice";

import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductCard = ({ product, inCart, inWishlist }) => {
  const [cartIconHovered, setCartIconHovered] = useState(false);
  const [wishlistIconHovered, setWishlistIconHovered] = useState(false);
  const dispatch = useDispatch();

  const addItemToCart = async (product) => {
    console.log("clicked");

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
  };
  const removeItemFromCart = async (product) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/app/cart/removeItemsToCart/${
          product._id
        }`,
        {},
        {
          headers: {
            token: localStorage.getItem("authToken"),
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(removeFromCart(product._id));
    } catch (error) {
      console.error("Error removing item from cart:", error);
      // Handle errors here
    }
  };

  const addItemToWishlist = async (product) => {
    await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/app/user/createWishList`,
      { product_id: product._id },

      {
        headers: {
          token: localStorage.getItem("authToken"),
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(addToWishlist(product._id));
  };
  const removeItemFromWishlist = (product) => {
    dispatch(removeFromWishlist(product._id));
  };

  const alertCartItemAdded = (message) => {
    toast.success(message);
  };
  const alertCartItemRemoved = (message) => {
    toast.error(message);
  };

  const handleCartClick = () => {
    if (inCart) {

      if(localStorage.getItem('user')=='true')
      {
        removeItemFromCart(product);
      alertCartItemRemoved("Item removed from cart!");
      }

      else
      {
        toast('Please login First', {
          icon: '❗',
        }); 
      }


    
    } else {
     
      if(localStorage.getItem('user')=='true')
      {
        addItemToCart(product);
        alertCartItemAdded("Item added to cart!");
      }

      else
      {
        // toast.info("Please Login First");

        toast('Please login First', {
          icon: '❗',
        });
        // alertCartItemAdded(""); 
      }
      
    }
  };

  const handleWishlistClick = () => {
    if (inWishlist) {
      
      if(localStorage.getItem('user')=='true')
      {
        toast('Please login First', {
          icon: '❗',
        });
      }
      else
      {
        removeItemFromWishlist(product);
      alertCartItemRemoved("Item removed from whislist!");
      }
    
    } else {
    
      if(localStorage.getItem('user')=='true')
      { 
        addItemToWishlist(product);
        alertCartItemAdded("Item added to wishlist!");
      }
      

      else
      {
        toast('Please login First', {
          icon: '❗',
        });
      }
    }
  };












  return (
    <div className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md group">
      <Link to={`/productdetail/${product._id}`} inWishlist={inWishlist}>
        <div className="flex items-center justify-center h-[11.25rem] p-2 overflow-hidden group-hover:scale-105 transition-transform">
          <img
            className="object-cover w-full h-full rounded-t-sm"
            src={product.images[0] || "https://placehold.co/450x600"}
            alt={product.name}
          />

          <span className="absolute top-1 left-1 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
            {`${product.discount}`}% OFF
          </span>
        </div>
      </Link>

      <div className="mt-4 px-3 pb-4 flex flex-col flex-1  ">
        <h5 className="text-md tracking-tight text-slate-900 h-12 line-clamp-2">
          {product.name}
        </h5>

        <div className=" flex flex-col flex-1 justify-end ">
          <div className="mt-2 mb-5 flex items-center justify-between gap-4 ">
            <p className="flex gap-2 items-end">
              <span className="text-2xl font-bold text-slate-900">
                &#8377;{product?.price}
              </span>
              <span className="text-sm text-slate-900 line-through">
                &#8377;{product?.mrp}
              </span>
            </p>
            <div className=" flex items-center">
              <StarRating rating={product?.ratingAVG} />
              <span>{`${product?.count ?? `(0)`}`}</span>
            </div>
          </div>

          <div className="flex relative  items-center gap-2 group cursor-pointer transition-all ">
            <span
              onMouseEnter={() => setWishlistIconHovered(true)}
              onMouseLeave={() => setWishlistIconHovered(false)}
              onClick={handleWishlistClick}
              className="bg-red-800 w-fit"
            >
              <IoHeartSharp
                size={"2.75rem"}
                className={`absolute -left-20 opacity-0 w-fit scale-1 ${
                  !inWishlist && !wishlistIconHovered
                    ? "text-blue-200"
                    : !inWishlist && wishlistIconHovered
                    ? "text-green-500"
                    : inWishlist && wishlistIconHovered
                    ? "text-red-400"
                    : "text-green-400"
                } group-hover:-left-0 -translate-y-1/2 bg-slate-200 p-2  rounded-md group-hover:opacity-100 group-hover:scale-100  transition-all duration-700 ease-in-out `}
              />
            </span>

            <p
              className={`flex items-center flex-1 justify-center gap-2   ml-12 rounded-md ${
                inCart ? "bg-green-400" : "bg-slate-200"
              }    text-slate-800 font-bold px-5 py-2 text-center text-sm   ${
                inCart && cartIconHovered
                  ? "hover:bg-red-400 "
                  : "hover:bg-blue-200 hover:text-slate-800"
              } hover:text-white`}
              onMouseEnter={() => setCartIconHovered(true)}
              onMouseLeave={() => setCartIconHovered(false)}
              onClick={() => handleCartClick()}
            >
              <HiOutlineShoppingCart size={"1.75rem"} />

              {inCart && cartIconHovered ? (
                <span className="text-nowrap w-fit">Remove from cart</span>
              ) : inCart ? (
                <span>Added to cart</span>
              ) : (
                <span>Add to cart</span>
              )}
            </p>
          </div>
        </div>
      </div>
      <Toaster position="top-right" containerStyle={{ zIndex: "99999" }} />
    </div>
  );
};

export default ProductCard;
