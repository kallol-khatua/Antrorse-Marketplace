import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CiLogout } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../redux/features/User/UserSlice";
import { RxHamburgerMenu } from "react-icons/rx";
import Antrorse from "../../assets/logo/Antrorse.png";
import { FaRegHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
const SubMenu = ({ items }) => (
  <ul className="absolute left-0 hidden mt-1 space-y-1 bg-white border rounded-md group-hover:block">
    {items.map((item, index) => (
      <li key={`${item.path}-${index}`}>
        <NavLink
          to={item.path}
          className="block px-4 py-2 text-gray-800 whitespace-nowrap hover:bg-slate-200"
          onClick={(e) => e.stopPropagation()} // Stop event propagation here
        >
          {item.label}
        </NavLink>
      </li>
    ))}
  </ul>
);
const Navbar = () => {
  const isUserLoggedIn = useSelector((state) => state.user.authorized);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const cartItems = useSelector((state) => state.cart.cartItems);
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const trigger = useRef(null);
  const dropdown = useRef(null);
  console.log(isUserLoggedIn);
  const mainMenu = [
    {
      path: "/viewproducts",
      label: "Devi Products",
      // subMenu: [
      //   { path: "/viewproducts", label: "T-shirt" },
      //   { path: "/viewproducts", label: "Causal Shirts" },
      //   { path: "/viewproducts", label: "Hoodies" },
      //   { path: "/viewproducts", label: "Formals shirts" },
      //   { path: "/viewproducts", label: "Uppers" },
      //   { path: "/viewproducts", label: "jackets" },
      // ],
    },
    {
      path: "/viewproducts",
      label: "Shop",
      // subMenu: [
      //   { path: "/women", label: "T-shirt" },
      //   { path: "/women", label: "Causal Shirts" },
      //   { path: "/women", label: "Hoodies" },
      //   { path: "/women", label: "Formals shirts" },
      //   { path: "/women", label: "Uppers" },
      //   { path: "/women", label: "jackets" },
      // ],
    },
    { path: "/trending-products", label: "Trending Products" },
  //   { path: "/shops", label: "Shops" },
   ];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    // Dispatch the logout action to clear user data
    dispatch(auth(false));
    navigate("/");
    // Optionally, you can clear the user data from local storage
    localStorage.removeItem("user");
  };
  const UserProfileDropdown = () => (
    <div
      ref={dropdown}
      className={`absolute  mt-40 ml-3 w-32 space-y-2 bg-white border rounded-md ${isProfileDropdownOpen === true ? "block" : "hidden"
        }`}
    >
      {/* Add menu items for the user profile dropdown */}
      <Link to="/account" className="block px-4 py-1 text-gray-800">
        My Profile
      </Link>
      <Link to="/account" className="block px-4 py-1 text-gray-800">
        Settings
      </Link>
      <button
        onClick={handleLogout}
        className=" border-t px-4 py-1 justify-between flex gap-y-1 text-gray-800"
      >
        <CiLogout className="mt-1" /> Logout
      </button>
    </div>
  );
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !isProfileDropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setIsProfileDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });
  return (
    <header className="header sticky top-0 bg-white shadow-sm flex items-center justify-between  z-30">
      <section className="relative mx-auto flex flex-1 ">
        <nav className="flex justify-between w-full ">
          <div className="px-5 sm:px-8 lg:px-0 xl:px-12 py-6 flex justify-between w-full items-center">
            <Link to="/" className="text-3xl font-bold font-heading ">
              <img className="h-9 " src={Antrorse} alt="logo" />
            </Link>
            <ul className="hidden lg:flex px-3 mx-auto font-semibold font-heading xl:space-x-12 lg:space-x-8">
              {mainMenu.map((menuItem) => (
                <li
                  key={menuItem.path}
                  className="relative group py-4 text-nowrap"
                >
                  {menuItem.subMenu ? (
                    <>
                      <NavLink to={menuItem.path}>{menuItem.label}</NavLink>
                      <SubMenu items={menuItem.subMenu} />
                      <span className="ml-1 text-black">&#9662;</span>
                    </>
                  ) : (
                    <Link to={menuItem.path}>{menuItem.label}</Link>
                  )}
                </li>
              ))}
            </ul>
            <div className="hidden items-center border-2 mr-2 border-slate-200 rounded-md px-2 lg:flex ">
              <IoSearch />
              <input
                className="ml-2  lg:w-[150px]  outline-none bg-transparent border-none  rounded-md p-2 mr-2"
                type="text"
                name="search"
                id="search"
                placeholder="Search..."
              />
            </div>
            <div className="flex items-center lg:space-x-5 sm:space-x-8  space-x-5">
              <IoSearch className="text-xl flex lg:hidden" />
              {/* <Link to="/wishlist" className="flex items-center">
                <FaRegHeart className="text-xl" />
              </Link> */}
{
                localStorage.getItem('user') === 'true' ? (
                  <Link to="/wishlist" className="flex items-center">
                
                    <FaRegHeart className="text-xl" />
                    {wishlistItems.length <= 0 ? (
                      <span className="flex absolute -mt-5 ml-4">
                        <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                  
                      </span>
                    ) : (
                      <span className=" flex  items-center justify-center absolute text-xs -mt-6  ml-4 bg-pink-400 rounded-full w-5 h-5 p-2  text-white">
                      {console.log("wishlistItems.length", wishlistItems)}
                        {wishlistItems.length}
                      </span>
                    )}
                  </Link>
                ) : (
                  <Link to="/login" className="flex items-center">
                   
                    <FaRegHeart className="text-xl" />
                  </Link>
                )
              }
              <div>
              {/* <Link to="/viewcart" className="flex items-center mr-2">
                  <FaCartShopping className="text-xl" />
                  {cartItems.length <= 0 ? (
                    <span className="flex absolute -mt-5 ml-4">
                      <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                    </span>
                  ) : (
                    <span className=" flex  items-center justify-center absolute text-xs -mt-6  ml-4 bg-pink-400 rounded-full w-5 h-5 p-2  text-white">
                      {cartItems.length}
                    </span>
                  )}
                </Link> */}
              {localStorage.getItem('user')=='true'?(
                    <Link to="/viewcart" className="flex items-center">
                
                   
                <FaCartShopping className="text-xl" />
                    {cartItems.length <= 0 ? (
                      <span className="flex absolute -mt-5 ml-4">
                        <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                      </span>
                    ) : (
                      <span className=" flex  items-center justify-center absolute text-xs -mt-6  ml-4 bg-pink-400 rounded-full w-5 h-5 p-2  text-white">
                        {cartItems.length}
                      </span>
                    )}
   
                  </Link>
                ):(
                  <Link to="/login" className="flex items-center">
                 
                  <FaCartShopping className="text-xl" />
                </Link>
                )
                }
              
              </div>
              {/* userProfile or login */}
              <div className="hidden lg:flex items-center justify-center gap-2">
                {isUserLoggedIn ? (
                  <span
                    className="flex items-center gap-0"
                    ref={trigger}
                    onClick={() =>
                      setIsProfileDropdownOpen(!isProfileDropdownOpen)
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 "
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <RiArrowDropDownLine className="w-6   h-6 cursor-pointer" />
                    {isProfileDropdownOpen && <UserProfileDropdown />}
                  </span>
                ) : (
                  <Link
                    className=" text-black px-4 py-1  flex flex-1 h-full border  border-black rounded-sm"
                    to="/login"
                  >
                    login
                  </Link>
                )}
                <Link
                  to="/sellersignup"
                  className="flex justify-center text-black px-4 py-1 rounded-sm border border-black"
                  onClick={() => {
                    toggleMenu(); // Close the menu when clicked
                  }}
                >
                  Sell with us
                </Link>
              </div>
              <a
                className="lg:hidden flex text-xl font-semibold mr-6 items-center"
                href="#"
                onClick={toggleMenu}
              >
                <RxHamburgerMenu />
                <span className="flex absolute -mt-5 ml-4">
                  <span className=" absolute inline-flex h-3 w-3 rounded-full  opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 "></span>
                </span>
              </a>
            </div>
          </div>
        </nav>
        {/* Hamburger Menu */}
        {isMenuOpen && (
          <div className="xl:hidden absolute top-20 left-0 w-full bg-white border rounded-md pb-6">
            <ul className="px-4 py-2 font-semibold font-heading space-y-2 justify-center">
              <li>
                <Link className="" to="/" onClick={toggleMenu}>
                  Home
                </Link>
              </li>
              <li className="relative group">
                <Link to="/viewproducts" onClick={toggleMenu}>Devi Products</Link>
                {/* <ul
                  className="absolute hidden mt-2 space-y-2 bg-white border rounded-md group-hover:block z-10"
                  style={{ width: "185px" }}
                >
                  <li>
                    <Link to="/men/t-shirt" className="block px-4 py-1 text-gray-800" onClick={toggleMenu}>
                      T-shirt
                    </Link>
                  </li>
                  <li>
                    <Link to="/men/causal-shirts" className="block px-4 py-2 text-gray-800" onClick={toggleMenu}>
                      Causal Shirts
                    </Link>
                  </li>
                  <li>
                    <Link to="/men/hoodies" className="block px-4 py-2 text-gray-800" onClick={toggleMenu}>
                      Hoodies
                    </Link>
                  </li>
                  <li>
                    <Link to="/men/formals-shirts" className="block px-4 py-2 text-gray-800" onClick={toggleMenu}>
                      Formals shirts
                    </Link>
                  </li>
                  <li>
                    <Link to="/men/uppers" className="block px-4 py-2 text-gray-800" onClick={toggleMenu}>
                      Uppers
                    </Link>
                  </li>
                  <li>
                    <Link to="/men/jackets" className="block px-4 py-2 text-gray-800" onClick={toggleMenu}>
                      jackets
                    </Link>
                  </li>
                </ul> */}
                {/* <span className="ml-1 text-gray-500">&#9662;</span> */}
              </li>
              <li className="relative group">
                <Link to="/viewproducts" onClick={toggleMenu}>Shop</Link>
                {/* <ul
                  className="absolute hidden mt-2 space-y-2 bg-white border rounded-md group-hover:block"
                  style={{ width: "180px" }}
                >
                  <li>
                    <Link to="/women/t-shirt" className="block px-4 py-2 text-gray-800" onClick={toggleMenu}>
                      T-shirt
                    </Link>
                  </li>
                  <li>
                    <Link to="/women/causal-shirts" className="block px-4 py-2 text-gray-800" onClick={toggleMenu}>
                      Causal Shirts
                    </Link>
                  </li>
                  <li>
                    <Link to="/women/hoodies" className="block px-4 py-2 text-gray-800" onClick={toggleMenu}>
                      Hoodies
                    </Link>
                  </li>
                  <li>
                    <Link to="/women/formals-shirts" className="block px-4 py-2 text-gray-800" onClick={toggleMenu}>
                      Formals shirts
                    </Link>
                  </li>
                  <li>
                    <Link to="/women/uppers" className="block px-4 py-2 text-gray-800" onClick={toggleMenu}>
                      Uppers
                    </Link>
                  </li>
                  <li>
                    <Link to="/women/jackets" className="block px-4 py-2 text-gray-800" onClick={toggleMenu}>
                      jackets
                    </Link>
                  </li>
                </ul> */}
                {/* <span className="ml-1 text-gray-500">&#9662;</span> */}
              </li>
              <li>
                <Link to="/trending-products" onClick={toggleMenu}>Trending Products</Link>
              </li>
              <li>
                <div className="flex items-center gap-2">
                  {isUserLoggedIn ? (
                    <span
                      className="flex items-center gap-0"
                      ref={trigger}
                      onClick={() =>
                        setIsProfileDropdownOpen(!isProfileDropdownOpen)
                      }
                    >
                      Profile
                      <RiArrowDropDownLine className="w-6   h-6 cursor-pointer" />
                      {isProfileDropdownOpen && <UserProfileDropdown />}
                    </span>
                  ) : (
                    <Link
                      className=" text-black px-4 py-1  flex justify-center flex-1 h-full border  border-black rounded-sm"
                      to="/login"
                      onClick={toggleMenu}
                    >
                      login
                    </Link>
                  )}
                </div>
              </li>
              <li>
                <Link
                  to="/sellersignup"
                  className=" flex justify-center text-black px-4 py-1  rounded-sm  border border-black"
                  onClick={() => {
                    toggleMenu(); // Close the menu when clicked
                  }}
                >
                  Sell with us
                </Link>
              </li>
            </ul>
          </div>
        )}
      </section>
    </header>
  );
};
export default Navbar;