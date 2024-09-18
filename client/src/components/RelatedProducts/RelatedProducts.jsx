import React from "react";
import image1 from "../../assets/images/product-1.jpg";
import image2 from "../../assets/images/product-2.jpg";
import image3 from "../../assets/images/product-3.jpg";
import image4 from "../../assets/images/product-4.jpg";
import image5 from "../../assets/images/product-15.png";
import image6 from "../../assets/images/product-16.png";
import image7 from "../../assets/images/product-17.png";
import image8 from "../../assets/images/product-18.png";

const RelatedProducts = () => {
  const location = window.location.pathname;
  return (
    <section
      id="Projects"
      className="w-fit mx-auto grid grid-cols-1  xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
    >
      {/* <!--   ✅ Product card 1 - Starts Here 👇 --> */}
      <div className="sm:w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
        <a href="/viewproducts">
          <img
            src={image1}
            alt="Product"
            className="h-72 w-72 object-cover rounded-t-xl"
          />
          <div className="px-4 py-3 w-72">
            <span className="text-gray-400 mr-3 uppercase text-xs">
              Metallic Agarbatti(100GM)
            </span>
            <p className="text-lg font-bold text-black truncate block capitalize">
              Raatrani
            </p>
            <div className="flex items-center">
              <p className="text-lg font-semibold text-black cursor-auto my-3">
                ₹175
              </p>
              <del>
                <p className="text-sm text-gray-600 cursor-auto ml-2">₹199</p>
              </del>
              {location === "/" ? null : (
                <div className="ml-auto">
                  <a
                    href="#"
                    className="flex justify-center px-2 py-2 text-blue-600 border border-blue-300 rounded-md hover:bg-blue-700 hover:text-gray-100 dark:hover:bg-gray-800 dark:hover:border-gray-900"
                  >
                    Add to cart
                  </a>
                </div>
              )}
            </div>
          </div>
        </a>
      </div>
      {/* <!--   🛑 Product card 1 - Ends Here  --> */}

      {/* <!--   ✅ Product card 2 - Starts Here 👇 --> */}
      <div className="sm:w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
        <a href="/viewproducts">
          <img
            src={image2}
            alt="Product"
            className="h-72 w-72 object-cover rounded-t-xl"
          />
          <div className="px-4 py-3 w-72">
            <span className="text-gray-400 mr-3 uppercase text-xs">
              Metallic Dhoop Stick(100GM)
            </span>
            <p className="text-lg font-bold text-black truncate block capitalize">
              Lavender
            </p>
            <div className="flex items-center">
              <p className="text-lg font-semibold text-black cursor-auto my-3">
                ₹175
              </p>
              <del>
                <p className="text-sm text-gray-600 cursor-auto ml-2">₹199</p>
              </del>
              {location === "/" ? null : (
                <div className="ml-auto">
                  <a
                    href="#"
                    className="flex justify-center px-2 py-2 text-blue-600 border border-blue-300 rounded-md hover:bg-blue-700 hover:text-gray-100 dark:hover:bg-gray-800 dark:hover:border-gray-900"
                  >
                    Add to cart
                  </a>
                </div>
              )}
            </div>
          </div>
        </a>
      </div>
      {/* <!--   🛑 Product card 2- Ends Here  --> */}

      {/* <!--   ✅ Product card 3 - Starts Here 👇 --> */}
      <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
        <a href="/viewproducts">
          <img
            src={image3}
            alt="Product"
            className="h-72 w-72 object-cover rounded-t-xl"
          />
          <div className="px-4 py-3 w-72">
            <span className="text-gray-400 mr-3 uppercase text-xs">
              Metallic Dhoop Stick(100GM)
            </span>
            <p className="text-lg font-bold text-black truncate block capitalize">
              Rose
            </p>
            <div className="flex items-center">
              <p className="text-lg font-semibold text-black cursor-auto my-3">
                ₹175
              </p>
              <del>
                <p className="text-sm text-gray-600 cursor-auto ml-2">₹199</p>
              </del>
              {location === "/" ? null : (
                <div className="ml-auto">
                  <a
                    href="#"
                    className="flex justify-center px-2 py-2 text-blue-600 border border-blue-300 rounded-md hover:bg-blue-700 hover:text-gray-100 dark:hover:bg-gray-800 dark:hover:border-gray-900"
                  >
                    Add to cart
                  </a>
                </div>
              )}
            </div>
          </div>
        </a>
      </div>
      {/* <!--   🛑 Product card 3 - Ends Here  --> */}

      {/* <!--   ✅ Product card 4 - Starts Here 👇 --> */}
      <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
        <a href="/viewproducts">
          <img
            src={image4}
            alt="Product"
            className="h-72 w-72 object-cover rounded-t-xl"
          />
          <div className="px-4 py-3 w-72">
            <span className="text-gray-400 mr-3 uppercase text-xs">
              Metallic Dhoop Cone(100GM)
            </span>
            <p className="text-lg font-bold text-black truncate block capitalize">
              Dhoop Cone
            </p>
            <div className="flex items-center">
              <p className="text-lg font-semibold text-black cursor-auto my-3">
                ₹175
              </p>
              <del>
                <p className="text-sm text-gray-600 cursor-auto ml-2">₹199</p>
              </del>
              {location === "/" ? null : (
                <div className="ml-auto">
                  <a
                    href="#"
                    className="flex justify-center px-2 py-2 text-blue-600 border border-blue-300 rounded-md hover:bg-blue-700 hover:text-gray-100 dark:hover:bg-gray-800 dark:hover:border-gray-900"
                  >
                    Add to cart
                  </a>
                </div>
              )}
            </div>
          </div>
        </a>
      </div>
      <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
        <a href="/viewproducts">
          <img
            src={image5}
            alt="Product"
            className="h-72 w-72 object-cover rounded-t-xl"
          />
          <div className="px-4 py-3 w-72">
            <span className="text-gray-400 mr-3 uppercase text-xs">
              Metallic Agarbatti(100GM)
            </span>
            <p className="text-lg font-bold text-black truncate block capitalize">
              Metallic Agarbatti
            </p>
            <div className="flex items-center">
              <p className="text-lg font-semibold text-black cursor-auto my-3">
                ₹175
              </p>
              <del>
                <p className="text-sm text-gray-600 cursor-auto ml-2">₹199</p>
              </del>
              {location === "/" ? null : (
                <div className="ml-auto">
                  <a
                    href="#"
                    className="flex justify-center px-2 py-2 text-blue-600 border border-blue-300 rounded-md hover:bg-blue-700 hover:text-gray-100 dark:hover:bg-gray-800 dark:hover:border-gray-900"
                  >
                    Add to cart
                  </a>
                </div>
              )}
            </div>
          </div>
        </a>
      </div>
      {/* <!--   🛑 Product card 1 - Ends Here  --> */}

      {/* <!--   ✅ Product card 2 - Starts Here 👇 --> */}
      <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
        <a href="/viewproducts">
          <img
            src={image6}
            alt="Product"
            className="h-72 w-72 object-cover rounded-t-xl"
          />
          <div className="px-4 py-3 w-72">
            <span className="text-gray-400 mr-3 uppercase text-xs">
              Metallic Agarbatti(100GM)
            </span>
            <p className="text-lg font-bold text-black truncate block capitalize">
              Mogra
            </p>
            <div className="flex items-center">
              <p className="text-lg font-semibold text-black cursor-auto my-3">
                ₹175
              </p>
              <del>
                <p className="text-sm text-gray-600 cursor-auto ml-2">₹199</p>
              </del>
              {location === "/" ? null : (
                <div className="ml-auto">
                  <a
                    href="/viewproducts"
                    className="flex justify-center px-2 py-2 text-blue-600 border border-blue-300 rounded-md hover:bg-blue-700 hover:text-gray-100 dark:hover:bg-gray-800 dark:hover:border-gray-900"
                  >
                    Add to cart
                  </a>
                </div>
              )}
            </div>
          </div>
        </a>
      </div>
      {/* <!--   🛑 Product card 2- Ends Here  --> */}

      {/* <!--   ✅ Product card 3 - Starts Here 👇 --> */}
      <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
        <a href="/viewproducts">
          <img
            src={image7}
            alt="Product"
            className="h-72 w-72 object-cover rounded-t-xl"
          />
          <div className="px-4 py-3 w-72">
            <span className="text-gray-400 mr-3 uppercase text-xs">
              Metallic Agarbatti(100GM)
            </span>
            <p className="text-lg font-bold text-black truncate block capitalize">
             Metallic Agarbaati
            </p>
            <div className="flex items-center">
              <p className="text-lg font-semibold text-black cursor-auto my-3">
                ₹175
              </p>
              <del>
                <p className="text-sm text-gray-600 cursor-auto ml-2">₹199</p>
              </del>
              {location === "/" ? null : (
                <div className="ml-auto">
                  <a
                    href="#"
                    className="flex justify-center px-2 py-2 text-blue-600 border border-blue-300 rounded-md hover:bg-blue-700 hover:text-gray-100 dark:hover:bg-gray-800 dark:hover:border-gray-900"
                  >
                    Add to cart
                  </a>
                </div>
              )}
            </div>
          </div>
        </a>
      </div>
      {/* <!--   🛑 Product card 3 - Ends Here  --> */}

      {/* <!--   ✅ Product card 4 - Starts Here 👇 --> */}
      <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
        <a href="/viewproducts">
          <img
            src={image8}
            alt="Product"
            className="h-72 w-72 object-cover rounded-t-xl"
          />
          <div className="px-4 py-3 w-72">
            <span className="text-gray-400 mr-3 uppercase text-xs">
              Metallic Dhoop Cone(100GM)
            </span>
            <p className="text-lg font-bold text-black truncate block capitalize">
              Dhoop Cone
            </p>
            <div className="flex items-center">
              <p className="text-lg font-semibold text-black cursor-auto my-3">
                ₹175
              </p>
              <del>
                <p className="text-sm text-gray-600 cursor-auto ml-2">₹199</p>
              </del>
              {location === "/" ? null : (
                <div className="ml-auto">
                  <a
                    href="#"
                    className="flex justify-center px-2 py-2 text-blue-600 border border-blue-300 rounded-md hover:bg-blue-700 hover:text-gray-100 dark:hover:bg-gray-800 dark:hover:border-gray-900"
                  >
                    Add to cart
                  </a>
                </div>
              )}
            </div>
          </div>
        </a>
      </div>
      {/* <!--   🛑 Product card 4 - Ends Here  --> */}
    </section>
  );
};

export default RelatedProducts;
