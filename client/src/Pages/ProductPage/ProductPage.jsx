import React, { useState } from "react";
import { IoHeartOutline } from "react-icons/io5";
import StarRating from "../../components/StartRating/StartRating";
import Ribbon from "../../utils/Ribbon/Ribbon";
import { Accordion, AccordionTab } from "primereact/accordion";

const ProductPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "https://themewagon.github.io/ashion/img/product/details/thumb-3.jpg",
    "https://rukminim2.flixcart.com/image/832/832/xif0q/jacket/u/5/3/l-1-no-asaejk4717-arrow-original-imaghad62rg9rhhq.jpeg?q=70&crop=false",
    "https://rukminim2.flixcart.com/image/832/832/xif0q/jacket/9/3/c/l-1-no-asaejk4717-arrow-original-imaghad6yzp4gnbx.jpeg?q=70&crop=false",
    "https://rukminim2.flixcart.com/image/832/832/xif0q/jacket/4/e/m/l-1-no-asaejk4717-arrow-original-imaghad69hy4bhht.jpeg?q=70&crop=false",
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
  return (
    <div>
      <section className="">
        <div className="max-w-7xl px-4 mx-auto">
          <div className="flex flex-wrap mb-24 -mx-6">
            <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0 ">
              <div className="sticky flex-wrap-reverse top-0 w-full flex overflow-hidden  m-4">
                <div className="flex-wrap w-full md:w-1/4 lg:flex-col mx-2 flex">
                  {images.map((imageUrl, index) => (
                    <div key={index} className="grid grid-cols-4 p-2 sm:w-full">
                      <a
                        className="block border border-gray-200 hover:border-sky-400"
                        href="#"
                      >
                        <img
                          className="object-contain w-full h-16 lg:h-28"
                          src={imageUrl}
                          alt=""
                        />
                      </a>
                    </div>
                  ))}
                </div>
                <div className="relative mb-6 ml-4   h-[90vh] w-2/3 flex lg:mb-10 ">
                  <a
                    className="absolute left-0 transform lg:ml-2 top-1/2 translate-1/2 border-2 rounded-full p-2 bg-white shadow-md"
                    href="#"
                    onClick={prevImage}
                  >
                    {/* Left arrow SVG */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="w-5 h-5 bi bi-chevron-left "
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                      ></path>
                    </svg>
                  </a>
                  <img
                    className="  object-contain  w-full lg:h-full"
                    src={images[currentIndex]}
                    alt=""
                  />
                  <a
                    className="absolute right-0 transform lg:mr-2 top-1/2 translate-1/2 border-2 rounded-full p-2 bg-white shadow-md"
                    href="#"
                    onClick={nextImage}
                  >
                    {/* Right arrow SVG */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="w-5 h-5  bi bi-chevron-right "
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* right section */}
            <div className="w-full px-4 md:w-1/2">
              <div className="lg:pl-8">
                <div className="mb-6 ">
                  <h2 className="max-w-xl mt-6 mb-6 text-xl font-semibold leading-loose tracking-wide  md:text-2xl ">
                    Men Solid Bomber Jacket
                  </h2>
                  <div className="flex flex-wrap items-center mb-6">
                    <StarRating rating={4} />
                    <span>(123)</span>
                  </div>
                  <p className="inline-block text-2xl font-semibold text-red-800  ">
                    <span>Rs 1200</span>
                    <span className="ml-3 text-base font-normal text-gray-500 line-through ">
                      Rs 10,000
                    </span>
                  </p>
                  <p className="pt-2 text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Et,
                    minima aperiam dolore nam quos ducimus, earum quod
                    laboriosam animi nulla expedita. Soluta, illum.
                  </p>
                </div>
                {/* <div className="mb-6">
                  <h2 className="mb-2 text-lg font-bold text-gray-700 ">
                    System Specs :
                  </h2>
                  <div className="bg-gray-100  rounded-xl">
                    <div className="p-3 lg:p-5 ">
                      <div className="p-2 rounded-xl lg:p-6  bg-gray-50">
                        <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
                          <div className="w-full mb-4 md:w-2/5">
                            <div className="flex ">
                              <span className="mr-3 text-gray-500 ">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="bi bi-diagram-3 w-7 h-7"
                                  viewBox="0 0 16 16"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H14a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 2 7h5.5V6A1.5 1.5 0 0 1 6 4.5v-1zM8.5 5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1zM0 11.5A1.5 1.5 0 0 1 1.5 10h1A1.5 1.5 0 0 1 4 11.5v1A1.5 1.5 0 0 1 2.5 14h-1A1.5 1.5 0 0 1 0 12.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm4.5.5A1.5 1.5 0 0 1 7.5 10h1a1.5 1.5 0 0 1 1.5 1.5v1A1.5 1.5 0 0 1 8.5 14h-1A1.5 1.5 0 0 1 6 12.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm4.5.5a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z"
                                  ></path>
                                </svg>
                              </span>
                              <div>
                                <p className="mb-2 text-sm font-medium text-gray-500 ">
                                  No. of cores
                                </p>
                                <h2 className="text-base font-semibold text-gray-700 ">
                                  12 Cores
                                </h2>
                              </div>
                            </div>
                          </div>
                          <div className="w-full mb-4 md:w-2/5">
                            <div className="flex ">
                              <span className="mr-3 text-gray-500 ">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="bi bi-gpu-card w-7 h-7"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M4 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm7.5-1.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"></path>
                                  <path d="M0 1.5A.5.5 0 0 1 .5 1h1a.5.5 0 0 1 .5.5V4h13.5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5H2v2.5a.5.5 0 0 1-1 0V2H.5a.5.5 0 0 1-.5-.5Zm5.5 4a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM9 8a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0Z"></path>
                                  <path d="M3 12.5h3.5v1a.5.5 0 0 1-.5.5H3.5a.5.5 0 0 1-.5-.5v-1Zm4 1v-1h4v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5Z"></path>
                                </svg>
                              </span>
                              <div>
                                <p className="mb-2 text-sm font-medium text-gray-500 ">
                                  Graphic
                                </p>
                                <h2 className="text-base font-semibold text-gray-700 ">
                                  Intel UHD
                                </h2>
                              </div>
                            </div>
                          </div>
                          <div className="w-full mb-4 lg:mb-0 md:w-2/5">
                            <div className="flex ">
                              <span className="mr-3 text-gray-500 ">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="w-7 h-7 bi bi-cpu"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M5 0a.5.5 0 0 1 .5.5V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2A2.5 2.5 0 0 1 14 4.5h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14a2.5 2.5 0 0 1-2.5 2.5v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14A2.5 2.5 0 0 1 2 11.5H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2A2.5 2.5 0 0 1 4.5 2V.5A.5.5 0 0 1 5 0zm-.5 3A1.5 1.5 0 0 0 3 4.5v7A1.5 1.5 0 0 0 4.5 13h7a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 11.5 3h-7zM5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5v-3zM6.5 6a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"></path>
                                </svg>
                              </span>
                              <div>
                                <p className="mb-2 text-sm font-medium text-gray-500 ">
                                  Processor
                                </p>
                                <h2 className="text-base font-semibold text-gray-700">
                                  INTEL 80486
                                </h2>
                              </div>
                            </div>
                          </div>
                          <div className="w-full mb-4 lg:mb-0 md:w-2/5">
                            <div className="flex ">
                              <span className="mr-3 text-gray-500 ">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="bi bi-clock-history w-7 h-7"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z"></path>
                                  <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z"></path>
                                  <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"></path>
                                </svg>
                              </span>
                              <div>
                                <p className="mb-2 text-sm font-medium text-gray-500 ">
                                  Frequency
                                </p>
                                <h2 className="text-base font-semibold text-gray-700 ">
                                  3.5 GHz
                                </h2>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}

                <div className="mb-6 "></div>
                <div className="flex flex-wrap items-center mb-6">
                  <h2 className="text-lg mr-3">Quantity :</h2>
                  <div className="mb-4 mr-4 lg:mb-0">
                    <div className="w-28">
                      <div className="relative flex flex-row w-full h-10 bg-transparent rounded-lg">
                        <button className="w-20 h-full text-gray-600 bg-gray-100 border rounded-l outline-none cursor-pointer    hover:text-gray-700  hover:bg-gray-300">
                          <span className="m-auto text-2xl font-thin">-</span>
                        </button>
                        <input
                          type="number"
                          className="flex items-center  w-full font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-100 outline-none  border  focus:outline-none text-md hover:text-black"
                          placeholder="1"
                        />
                        <button className="w-20 h-full text-gray-600 bg-gray-100 border rounded-r outline-none cursor-pointer    hover:text-gray-700 hover:bg-gray-300">
                          <span className="m-auto text-2xl font-thin">+</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4 lg:mb-0">
                    <button className="flex items-center justify-center w-full h-10  mr-2 text-gray-700  lg:w-11 hover:text-red-500  border rounded-full   ">
                      <IoHeartOutline className="text-xl w-6 h-7  " />
                    </button>
                  </div>
                  <a
                    href="#"
                    className="w-full px-4 py-3 text-center text-white  border border-600    bg-red-600 hover:text-gray-100 lg:w-1/3 rounded-xl"
                  >
                    Add to cart
                  </a>
                </div>
                <div className="flex gap-4 mb-6">
                  <a
                    href="#"
                    className="w-[90%] px-4 py-3 border-2 text-center bg-red-600 text-white rounded-xl"
                  >
                    Buy now
                  </a>
                </div>

                {/* last */}

                <div className="mb-4 flex">
                  <h2 className="mb-1 mr-8 text-md font-bold ">
                    Avilable Color :
                  </h2>
                  <div className="flex flex-wrap -mb-2">
                    <button className="p-1 mb-2 mr-1 border border-transparent rounded-full hover:border-gray-400 ">
                      <div className="w-6 h-6 bg-red-600 rounded-full"></div>
                    </button>
                    <button className="p-1 mb-2 mr-1 border border-transparent rounded-full hover:border-gray-400 ">
                      <div className="w-6 h-6 bg-green-600 rounded-full"></div>
                    </button>
                    <button className="p-1 mb-2 border border-transparent rounded-full hover:border-gray-400 ">
                      <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
                    </button>
                    <button className="p-1 mb-2 border border-transparent rounded-full hover:border-gray-400">
                      <div className="w-6 h-6 rounded-full bg-sky-400"></div>
                    </button>
                  </div>
                </div>

                <div className=" mb-4   flex  ">
                  <h2 className="mb-1 mr-10 text-md font-bold ">
                    Avilable Size :
                  </h2>
                  <div className="flex flex-wrap -mb-2">
                    <button className="py-1 mb-2 mr-1 border w-11 hover:border-blue-400  hover:text-blue-600  ">
                      XL
                    </button>
                    <button className="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 hover:text-blue-600   ">
                      S
                    </button>
                    <button className="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 hover:text-blue-600 ">
                      M
                    </button>
                    <button className="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 hover:text-blue-600 ">
                      XS
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div>
        <div
          className="flex text-gray-500
             text-xl font-semibold mt-10 mb-10"
        >
          <Accordion multiple activeIndex={[0]}>
            <AccordionTab
              header="Description"
              className="ml-10 py-5 text-black text-xl hover:text-gray-400 "
            >
              <p className="m-0 text-gray-600 text-m ">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p className="m-0 text-gray-600 text-m mt-5">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias excepturi sint occaecati cupiditate
                non provident, similique sunt in culpa qui officia deserunt
                mollitia animi, id est laborum et dolorum fuga. Et harum quidem
                rerum facilis est et expedita distinctio. Nam libero tempore,
                cum soluta nobis est eligendi optio cumque nihil impedit quo
                minus.
              </p>
            </AccordionTab>
            <AccordionTab
              header="Specification"
              className="ml-10 py-5 text-black text-xl hover:text-gray-400"
            >
              <p className="m-0 text-gray-600 text-m">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt. Consectetur, adipisci velit, sed quia non numquam eius
                modi.
              </p>
              <p className="m-0 text-gray-600 text-m mt-5">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias excepturi sint occaecati cupiditate
                non provident, similique sunt in culpa qui officia deserunt
                mollitia animi, id est laborum et dolorum fuga. Et harum quidem
                rerum facilis est et expedita distinctio. Nam libero tempore,
                cum soluta nobis est eligendi optio cumque nihil impedit quo
                minus.
              </p>
            </AccordionTab>
            <AccordionTab
              header="Reviews"
              className="ml-10 py-5 text-black text-xl hover:text-gray-400"
            >
              <p className="m-0 text-gray-600 text-m">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias excepturi sint occaecati cupiditate
                non provident, similique sunt in culpa qui officia deserunt
                mollitia animi, id est laborum et dolorum fuga. Et harum quidem
                rerum facilis est et expedita distinctio. Nam libero tempore,
                cum soluta nobis est eligendi optio cumque nihil impedit quo
                minus.
              </p>
              <p className="m-0 text-gray-600 text-m mt-5">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias excepturi sint occaecati cupiditate
                non provident, similique sunt in culpa qui officia deserunt
                mollitia animi, id est laborum et dolorum fuga. Et harum quidem
                rerum facilis est et expedita distinctio. Nam libero tempore,
                cum soluta nobis est eligendi optio cumque nihil impedit quo
                minus.
              </p>
            </AccordionTab>
          </Accordion>
        </div>

        <section className="py-10 text-gray-700 sm:px-6 lg:px-8 ">
          <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-md text-center">
              <h2 className="font-serif text-2xl font-bold sm:text-3xl">
                RELATED PRODUCTS
              </h2>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-6 lg:mt-16 lg:grid-cols-4 lg:gap-4">
              <article className="relative">
                <div className="aspect-square overflow-hidden">
                  <img
                    className="group-hover:scale-125 h-full w-full object-cover transition-all duration-300"
                    src="https://images.unsplash.com/photo-1599751449128-eb7249c3d6b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
                    loading="lazy"
                  />
                </div>
                <div className="absolute top-0 m-1 rounded-full bg-white">
                  <p className="text-[10px] rounded-full bg-black p-1 font-bold uppercase tracking-wide text-white sm:px-3 sm:py-1">
                    Sale
                  </p>
                </div>
                <div className="mt-4 flex items-start justify-between">
                  <div className="">
                    <h3 className="text-xs  sm:text-sm md:text-base">
                      <a href="#" title="" className="cursor-pointer">
                        Arabian Musk
                        <span className="absolute" aria-hidden="true"></span>
                      </a>
                    </h3>
                    <div className="mt-2 flex items-center">
                      <svg
                        className="block h-3 w-3 align-middle text-black sm:h-4 sm:w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                          className=""
                        ></path>
                      </svg>
                      <svg
                        className="block h-3 w-3 align-middle text-black sm:h-4 sm:w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                          className=""
                        ></path>
                      </svg>
                      <svg
                        className="block h-3 w-3 align-middle text-black sm:h-4 sm:w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                          className=""
                        ></path>
                      </svg>
                      <svg
                        className="block h-3 w-3 align-middle text-black sm:h-4 sm:w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                          className=""
                        ></path>
                      </svg>
                      <svg
                        className="block h-3 w-3 align-middle text-gray-400 sm:h-4 sm:w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                          className=""
                        ></path>
                      </svg>
                    </div>
                  </div>

                  <div className="text-right">
                    <del className="mt-px text-xs  text-gray-600 sm:text-sm">
                      {" "}
                      $79.00{" "}
                    </del>
                    <p className="text-xs font-normal sm:text-sm md:text-base">
                      $99.00
                    </p>
                  </div>
                </div>
              </article>

              <article className="relative">
                <Ribbon />

                <div className="aspect-square overflow-hidden">
                  <img
                    className="group-hover:scale-125 h-full w-full object-cover transition-all duration-300"
                    src="https://images.unsplash.com/photo-1599751449128-eb7249c3d6b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
                    loading="lazy"
                  />
                </div>
                <div className="mt-4 flex items-start justify-between">
                  <div className="">
                    <h3 className="text-xs  sm:text-sm md:text-base">
                      <a href="#" title="" className="cursor-pointer">
                        Albanian Essence
                        <span className="absolute" aria-hidden="true"></span>
                      </a>
                    </h3>
                    <div className="mt-2 flex items-center">
                      <svg
                        className="block h-3 w-3 align-middle text-black sm:h-4 sm:w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                          className=""
                        ></path>
                      </svg>
                      <svg
                        className="block h-3 w-3 align-middle text-black sm:h-4 sm:w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                          className=""
                        ></path>
                      </svg>
                      <svg
                        className="block h-3 w-3 align-middle text-black sm:h-4 sm:w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                          className=""
                        ></path>
                      </svg>
                      <svg
                        className="block h-3 w-3 align-middle text-black sm:h-4 sm:w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                          className=""
                        ></path>
                      </svg>
                      <svg
                        className="block h-3 w-3 align-middle text-black sm:h-4 sm:w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                          className=""
                        ></path>
                      </svg>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xs font-normal sm:text-sm md:text-base">
                      $299.00
                    </p>
                  </div>
                </div>
              </article>

              <article className="relative">
                <div className="aspect-square overflow-hidden">
                  <img
                    className="group-hover:scale-125 h-full w-full object-cover transition-all duration-300"
                    src="https://images.unsplash.com/photo-1599751449128-eb7249c3d6b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
                    loading="lazy"
                  />
                </div>
                <div className="mt-4 flex items-start justify-between">
                  <div className="">
                    <h3 className="text-xs  sm:text-sm md:text-base">
                      <a href="#" title="" className="cursor-pointer">
                        Siberian Perfum
                        <span className="absolute" aria-hidden="true"></span>
                      </a>
                    </h3>
                    <div className="mt-2 flex items-center">
                      <svg
                        className="block h-3 w-3 align-middle text-black sm:h-4 sm:w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                          className=""
                        ></path>
                      </svg>
                      <svg
                        className="block h-3 w-3 align-middle text-black sm:h-4 sm:w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                          className=""
                        ></path>
                      </svg>
                      <svg
                        className="block h-3 w-3 align-middle text-black sm:h-4 sm:w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                          className=""
                        ></path>
                      </svg>
                      <svg
                        className="block h-3 w-3 align-middle text-black sm:h-4 sm:w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                          className=""
                        ></path>
                      </svg>
                      <svg
                        className="block h-3 w-3 align-middle text-black sm:h-4 sm:w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                          className=""
                        ></path>
                      </svg>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xs font-normal sm:text-sm md:text-base">
                      $49.00
                    </p>
                  </div>
                </div>
              </article>

              <article className="relative">
                <div className="aspect-square overflow-hidden">
                  <img
                    className="group-hover:scale-125 h-full w-full object-cover transition-all duration-300"
                    src="https://images.unsplash.com/photo-1599751449128-eb7249c3d6b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
                    loading="lazy"
                  />
                </div>
                <div className="mt-4 flex items-start justify-between">
                  <div className="">
                    <h3 className="text-xs  sm:text-sm md:text-base">
                      <a href="#" title="" className="cursor-pointer">
                        Danish Levoune
                        <span className="absolute" aria-hidden="true"></span>
                      </a>
                    </h3>
                    <div className="mt-2 flex items-center">
                      <svg
                        className="block h-3 w-3 align-middle text-black sm:h-4 sm:w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                          className=""
                        ></path>
                      </svg>
                      <svg
                        className="block h-3 w-3 align-middle text-black sm:h-4 sm:w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                          className=""
                        ></path>
                      </svg>
                      <svg
                        className="block h-3 w-3 align-middle text-black sm:h-4 sm:w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                          className=""
                        ></path>
                      </svg>

                      <svg
                        className="block h-3 w-3 align-middle text-black sm:h-4 sm:w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                          className=""
                        ></path>
                      </svg>

                      <svg
                        className="block h-3 w-3 align-middle text-gray-400 sm:h-4 sm:w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                          className=""
                        ></path>
                      </svg>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xs font-normal sm:text-sm md:text-base">
                      $79.00
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductPage;
