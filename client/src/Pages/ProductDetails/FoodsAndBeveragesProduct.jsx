import { useEffect, useState } from "react";
import { IoHeartOutline } from "react-icons/io5";
import StarRating from "../../components/StartRating/StartRating";
import Ribbon from "../../utils/Ribbon/Ribbon";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { FaCartShopping } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import UserAxiosInstance from "../../UserAxiosInstance";

function FoodsAndBeveragesProduct() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const [productDetails, setProductDetails] = useState([]);
  const [productvariant, setproductVariant] = useState([]);

  const [quantity, setQuantity] = useState(1);
  const [minOrderQuantity, setMinOrderQuantity] = useState(1);

  const navigate = useNavigate();
  const isUserLoggedIn = useSelector((state) => state.user.authorized);

  const images = [
    "https://rukminim2.flixcart.com/image/416/416/xif0q/shopsy-rice-light/b/n/a/star-nc-n5610-glowtronix-original-imag84fwe9wvzezu.jpeg",
    "https://rukminim2.flixcart.com/image/416/416/xif0q/rice-light/k/l/v/140-star-249-1-rl002-winkal-original-imagtdvxuheguqgb.jpeg",
    "https://rukminim2.flixcart.com/image/416/416/xif0q/shopsy-rice-light/f/9/8/star-nc-n5610-glowtronix-original-imafvm5huyuaj2f6.jpeg",
    "https://rukminim2.flixcart.com/image/416/416/k1nw9zk0/rice-light/y/w/f/1-8084-jiyan-enterprise-original-imafh6k3rbagrz3b.jpeg",
    "https://rukminim2.flixcart.com/image/416/416/xif0q/rice-light/e/y/a/138-star-2-5-1-12-stars-138-led-curtain-string-lights-window-original-imafveecgvgzggnf.jpeg",
    "https://rukminim2.flixcart.com/image/416/416/xif0q/shopsy-rice-light/b/n/a/star-nc-n5610-glowtronix-original-imag84fwe9wvzezu.jpeg",
  ];

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const productId = searchParams.get("productId");
        const variantId = searchParams.get("variantId");

        const url = `${
          import.meta.env.VITE_BACKEND_URL
        }/search-product/default/view-details?productId=${productId}`;

        const response = await axios.get(url);
        // console.log(response.data.productDetails[0]);

        if (response.status === 200) {
          setProductDetails(response.data.productDetails[0]);

          for (
            let i = 0;
            i < response.data.productDetails[0].variantDetails.length;
            i++
          ) {
            if (
              response.data.productDetails[0].variantDetails[i]._id ===
              variantId
            ) {
              setproductVariant(
                response.data.productDetails[0].variantDetails[i]
              );
              break;
            }
          }
        }
      } catch (error) {
        console.log("Error while fetching product details");
      }
    };
    getProductDetails();
  }, [searchParams]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const calculateDiscount = (actualPrice, offeredPrice) => {
    let discount;
    discount = Math.round(((actualPrice - offeredPrice) / actualPrice) * 100);
    return discount;
  };

  const handleAddToWishList = () => {
    if (!isUserLoggedIn) {
      toast.error("Please login to your account");
      navigate("/login");

      return;
    }

    toast.success("Added to wishlist");
  };

  const handleAddToCart = async () => {
    if (!isUserLoggedIn) {
      toast.error("Please login to your account");
      navigate("/login");

      return;
    }

    try {
      const data = {
        product_type: productDetails.product_type,
        quantity: quantity,
        product_id: productDetails._id,
      };
      const url = "/cart/createCart";
      const response = await UserAxiosInstance.post(url, data);

      if (response.status === 201) {
        toast.success("Item added to cart");
      }
    } catch (error) {
      console.log(error);
      console.log("Error while adding product to cart");
      toast.error("Failed while adding product to cart");
    }
  };

  // const handleIncreaseQuantity = () => {
  //   if (
  //     quantity < sizeVariant?.sizeVariants?.inventory[0]?.available_quantity
  //   ) {
  //     setQuantity((prev) => prev + 1);
  //   }
  // };

  const handleDecreaseQuantity = () => {
    if (quantity > minOrderQuantity) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleBuynow = () => {
    if (!isUserLoggedIn) {
      navigate("/login");
      toast.error("You are not logged in");
      return;
    }

    const productId = searchParams.get("productId");
    const variantId = searchParams.get("variantId");

    navigate(
      `/foods-and-beverages/view-details/buy-now?productId=${productId}&variantId=${variantId}&quantity=${quantity}`
    );
  };

  useEffect(() => {
    if (productvariant?.min_order_quantity) {
      setQuantity(productvariant.min_order_quantity);
      setMinOrderQuantity(productvariant.min_order_quantity);
    }
  }, [minOrderQuantity, productvariant.min_order_quantity]);

  return (
    <div>
      <section className="">
        <div className="px-4 mx-auto">
          <div className="flex mb-24 lg:flex-row flex-col">
            {/* Left section - image */}
            <div className="w-full px-4 mb-8 lg:w-1/2 md:mb-0  lg:sticky top-0">
              <div className="lg:sticky lg:flex-wrap-reverse lg:top-0 w-full flex overflow-hidden  m-4 flex-col flex-col-reverse lg:flex-row items-center">
                <div className=" w-full lg:w-1/4 lg:flex-col lg:mx-2 flex flex-row overflow-x-scroll scrollbar-hide">
                  {images.map((imageUrl, index) => (
                    <div
                      key={index}
                      className="lg:grid lg:grid-cols-2 p-2 lg:w-full"
                      onClick={() => setCurrentIndex(index)}
                    >
                      <a className="block border border-gray-200 hover:border-sky-400">
                        <img className="object-contain" src={imageUrl} alt="" />
                      </a>
                    </div>
                  ))}
                </div>
                <div className="relative mb-6 lg:ml-4   lg:h-[90vh] w-2/3 flex lg:mb-10 ">
                  <a
                    className="absolute left-0 transform lg:ml-2 top-1/2 translate-1/2 border-2 rounded-full p-2 bg-white shadow-md"
                    // href="#"
                    onClick={prevImage}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="w-5 h-5 bi bi-chevron-left "
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                      ></path>
                    </svg>
                  </a>
                  <img
                    className="  object-contain "
                    src={images[currentIndex]}
                    alt=""
                  />
                  <a
                    className="absolute right-0 transform lg:mr-2 top-1/2 translate-1/2 border-2 rounded-full p-2 bg-white shadow-md"
                    // href="#"
                    onClick={nextImage}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="w-5 h-5  bi bi-chevron-right "
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* right section */}
            <div className="w-full px-4 lg:w-1/2 lg:mt-8  lg:h-screen lg:overflow-y-scroll scrollbar-hide ">
              <div className="lg:pl-8">
                <div className="mb-6 ">
                  <h2 className="mb-3 text-xl font-semibold leading-loose tracking-wide  md:text-2xl ">
                    {productDetails.product_name}
                  </h2>

                  {/* Product pricing detail */}
                  <p className="inline-block text-2xl font-semibold text-red-800  ">
                    <span>Rs {productvariant?.offered_price}</span>
                    {productvariant?.offered_price !=
                      productvariant?.actual_price && (
                      <>
                        <span className="ml-3 text-base font-normal text-gray-500 line-through ">
                          Rs {productvariant?.actual_price}
                        </span>{" "}
                        <span className="text-base">
                          (
                          {calculateDiscount(
                            productvariant?.actual_price,
                            productvariant?.offered_price
                          )}
                          % OFF)
                        </span>
                      </>
                    )}
                  </p>
                </div>

                <div className="mb-6 "></div>
                <div className="flex flex-wrap items-center mb-6 flex justify-between">
                  <div className="flex items-center w-1/2">
                    <h2 className="text-lg mr-3">Quantity :</h2>
                    <div className="mb-4 mr-4 lg:mb-0">
                      <div className="w-28">
                        <div className="relative flex flex-row w-full h-10 bg-transparent rounded-lg">
                          <button
                            className="w-20 h-full text-gray-600 bg-gray-100 border rounded-l outline-none cursor-pointer    hover:text-gray-700  hover:bg-gray-300"
                            onClick={handleDecreaseQuantity}
                          >
                            <span className="m-auto text-2xl font-thin">-</span>
                          </button>
                          <input
                            type="number"
                            className="flex items-center  w-full font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-100 outline-none  border  focus:outline-none text-md hover:text-black"
                            placeholder={quantity}
                          />
                          <button
                            className="w-20 h-full text-gray-600 bg-gray-100 border rounded-r outline-none cursor-pointer    hover:text-gray-700 hover:bg-gray-300"
                            onClick={handleIncreaseQuantity}
                          >
                            <span className="m-auto text-2xl font-thin">+</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <div className="mb-4 lg:mb-0">
                    <button
                      className="flex items-center justify-center w-full h-10  mr-2 text-gray-700  lg:w-11 hover:text-red-500  border rounded-full   "
                      onClick={handleAddToWishList}
                    >
                      <IoHeartOutline className="text-xl w-6 h-7  " />
                    </button>
                  </div> */}

                  {/* <div
                    className="w-full cursor-pointer px-4 py-3 text-center text-white  border border-600    bg-red-600 hover:text-gray-100 lg:w-1/3 rounded-xl flex justify-center items-center gap-3"
                    onClick={handleAddToCart}
                  >
                    <FaCartShopping className="text-lg" />
                    Add to cart
                  </div> */}
                </div>

                <div className="flex gap-4 mb-6 w-full">
                  <button
                    className="w-[90%] px-4 py-3 w-full border-2 text-center bg-red-600 text-white rounded-xl flex justify-center items-center gap-3 text-lg"
                    onClick={handleBuynow}
                  >
                    Buy now
                  </button>
                </div>

                {/* last */}

                {productDetails?.product_description && (
                  <div className="flex mb-4 ">
                    <span className="font-semibold w-1/4">Description :</span>
                    <span className="text-gray-600 w-3/4">
                      {productDetails?.product_description}
                    </span>
                  </div>
                )}

                {productDetails?.specifications && (
                  <div className="flex mb-4 ">
                    <span className="font-semibold w-1/4">
                      Specifications :
                    </span>
                    <span className="text-gray-600 w-3/4">
                      {productDetails?.specifications}
                    </span>
                  </div>
                )}

                {productDetails?.country_of_origin && (
                  <div className="flex mb-4 gap-4">
                    <span className="font-semibold w-1/4">
                      Country of origin:
                    </span>
                    <span className="text-gray-600 w-3/4">
                      {productDetails?.country_of_origin}
                    </span>
                  </div>
                )}

                {productDetails?.brand_name && (
                  <div className="flex mb-4">
                    <span className="font-semibold w-1/4">Brand name :</span>
                    <span className="text-gray-600 w-3/4">
                      {productDetails?.brand_name}
                    </span>
                  </div>
                )}

                {productDetails?.generic_name && (
                  <div className="flex mb-4">
                    <span className="font-semibold w-1/4">Generic name :</span>
                    <span className="text-gray-600 w-3/4">
                      {productDetails?.generic_name}
                    </span>
                  </div>
                )}

                {productDetails?.model_name && (
                  <div className="flex mb-4 ">
                    <span className="font-semibold w-1/4">Model name :</span>
                    <span className="text-gray-600 w-3/4">
                      {productDetails?.model_name}
                    </span>
                  </div>
                )}

                {productDetails?.type && (
                  <div className="flex mb-4 ">
                    <span className="font-semibold w-1/4">Type :</span>
                    <span className="text-gray-600 w-3/4">
                      {productDetails?.type}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FoodsAndBeveragesProduct;
