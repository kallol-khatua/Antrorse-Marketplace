import React, { useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";
import ProductCard from "../ProductCard/ProductCard";
import axios from "axios";
import ProductCardSkeleton from "../ProductCard/ProductCardSkeleton";
import { useSelector } from "react-redux";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [itemsInCartId, setItemsInCartId] = useState([]);
  const [itemsInWishlistId, setItemsInWishlistId] = useState([]);

  const itemsInCart = useSelector((state) => state.cart.cartItems);
  const itemsInWishlist = useSelector((state) => state.wishlist.wishlistItems);
  const sorting = useSelector((state) => state.sort.sorting);

  const fetchCartItemsId = () => {
    const cartItemIds = itemsInCart?.map((item) => item) || [];
    const wishlistItemIds = itemsInWishlist?.map((item) => item) || [];
    setItemsInCartId(() => cartItemIds);
    setItemsInWishlistId(() => wishlistItemIds);


    console.log(cartItemIds,wishlistItemIds)
  };

  const fetchData = async () => {
    try {
      const response = await axios(
        `${import.meta.env.VITE_BACKEND_URL}/app/product/searchProducts`
      );

      console.log(response.data.result);
      console.log(
        `${import.meta.env.VITE_BACKEND_URL}/app/product/searchProducts`
      );
      setProducts(() => response.data.result);
      setIsLoading(false);
    } catch (error) {
      console.log(
        `${import.meta.env.VITE_BACKEND_URL}/app/product/searchProducts`
      );
      console.error("Error fetching data:", error);
    }
  };

  const sortProducts = () => {
    const sortedProducts = [...products];

    switch (sorting) {
      case 1:
        // sortedProducts.sort((a, b) => b.rating.count - a.rating.count);
        break;
      case 2:
        sortedProducts.sort((a, b) => {
          if (b.rating.rate === a.rating.rate) {
            return b.rating.count - a.rating.count;
          } else {
            return b.rating.rate - a.rating.rate;
          }
        });
        break;
      case 3:
        // sortedProducts.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 4:
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 5:
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setProducts(sortedProducts);
  };

  const handleSort = () => {
    sortProducts();
  };

  useEffect(() => {
    fetchData();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetchCartItemsId();
    handleSort();
  }, [itemsInCart, itemsInWishlist]);

  useEffect(() => {
    handleSort();
  }, [sorting]);

  return (
    <>
      <section className="bg-white  text-gray-700 p-0">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:grid-cols-4  p-4 bg-gray-100 ">
          {isLoading
            ? Array.from({ length: 9 }, (_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            : products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  inCart={itemsInCartId.includes(product._id)}
                  inWishlist={itemsInWishlistId.includes(product._id)}
                />
              ))}
        </div>
      </section>

      <Pagination />
    </>
  );
};

export default ProductList;
