import { Fragment, useEffect, useState } from "react";
import { IoIosFunnel } from "react-icons/io";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { HiOutlineChevronDown } from "react-icons/hi";
import { HiMiniSquares2X2 } from "react-icons/hi2";

import ProductList from "../ProductList/ProductList";

import SortOption from "../SortOption/SortOption";
import { object } from "yup";

const subCategories = [
  { name: "Totes", href: "#" },
  { name: "Backpacks", href: "#" },
  { name: "Travel Bags", href: "#" },
  { name: "Hip Bags", href: "#" },
  { name: "Laptop Sleeves", href: "#" },
];

const color = [
  {
    id: "color",
    name: "Color",
    options: [
      { value: "red", label: "", checked: false },
      { value: "blue", label: "", checked: false },
      { value: "indigo", label: "", checked: true },
      { value: "orange", label: "", checked: false },
      { value: "pink", label: "", checked: false },
      { value: "cyan", label: "", checked: false },
      { value: "lime", label: "", checked: false },
      { value: "purple", label: "", checked: false },
      { value: "gray", label: "", checked: false },
      { value: "violet", label: "", checked: false },
      { value: "yellow", label: "", checked: false },
      { value: "brown", label: "", checked: false },
    ],
  },
];

const filters = [
  {
    id: "category",
    name: "Category",
    options: [
      { value: "new-arrivals", label: "New Arrivals", checked: false },
      { value: "sale", label: "Sale", checked: false },
      { value: "travel", label: "Travel", checked: true },
      { value: "organization", label: "Organization", checked: false },
      { value: "accessories", label: "Accessories", checked: false },
    ],
  },
  {
    id: "size",
    name: "Size",
    options: [
      { value: "2l", label: "2L", checked: false },
      { value: "6l", label: "6L", checked: false },
      { value: "12l", label: "12L", checked: false },
      { value: "18l", label: "18L", checked: false },
      { value: "20l", label: "20L", checked: false },
      { value: "40l", label: "40L", checked: true },
    ],
  },
];

const initialSelectedFilter = {
  color: "",
  category: "",
  size: "",
};
const initialStateSections = {
  color: false,
  category: false,
  size: false,
};

const Filter = () => {
  const [selectedFilter, setSelectedFilter] = useState(initialSelectedFilter);
  const [isFixed, setIsFixed] = useState(false);
  const [openSections, setOpenSections] = useState(initialStateSections);
  const [selectedColor, setSelectedColor] = useState("indigo");

  const handleSectionToggle = (sectionId) => {
    setOpenSections((prevOpenSections) => {
      const updatedSections = { ...initialStateSections };
      updatedSections[sectionId] = !prevOpenSections[updatedSections];
      return updatedSections;
    });
  };

  const handleColorSelect = (value) => {
    setSelectedColor(value);
    setSelectedFilter((previous) => ({ ...previous, color: value }));
  };

  // console.log(selectedFilter);
  const handleScroll = () => {
    const navbarHeight = 100; //"6.25rem";
    const bottomScreenHeight = 1280; //"80rem"
    const scrollTop = window.scrollY;
    setIsFixed(scrollTop > navbarHeight && scrollTop < bottomScreenHeight);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="bg-white">
      <main className=" mx-auto max-w-9xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 py-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            New Arrivals
          </h1>

          <div className="flex px-5">
            <div className="flex items-center">
              <SortOption />
            </div>

            <button
              type="button"
              className="  -m-2  p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
            >
              <span className="sr-only">View grid</span>
              <HiMiniSquares2X2 className="h-5 w-5" aria-hidden="true" />
            </button>

            <button
              type="button"
              className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <span className="sr-only">Filters</span>
            </button>
          </div>
        </div>

        <section className="flex justify-end">
          <form
            style={{
              top: isFixed ? "100px" : "auto",
              width: "calc(25% - 1rem)",
            }}
            className={`${
              isFixed ? " left-8 lg:block" : "lg:block"
            }flex flex-1 p-4 border-r-2 bg-white border-slate-200 `}
          >
            <h3 className="text-xl font-semibold">Filter</h3>
            <ul
              role="list"
              className="space-y-4 border-b  border-gray-200 pb-6 text-sm font-medium text-gray-900"
            >
              {subCategories.map((category) => (
                <li key={category.name}>
                  <a href={category.href}>{category.name}</a>
                </li>
              ))}
            </ul>

            {color.map((section) => (
              <div key={section.id} className="border-b  border-gray-200 py-6">
                <div className="-my-3  flow-root">
                  <div
                    onClick={() => handleSectionToggle(section.id)}
                    className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500 cursor-pointer"
                  >
                    <span className="text-lg font-semibold text-gray-900">
                      {section.name}
                    </span>
                    <span className="ml-6 px-4 flex items-center">
                      {openSections[section.id] ? (
                        <FaMinus className="h-5 w-5" />
                      ) : (
                        <FaPlus className="h-5 w-5" />
                      )}
                    </span>
                  </div>
                </div>
                {openSections[section.id] && (
                  <div className="pt-4 ">
                    <div className="space-y-2 flex w-[100%] items-center justify-center ">
                      <div className="p-2 grid grid-cols-5 w-full gap-3">
                        {section.options.map((option) => (
                          <button
                            key={option.value}
                            className={
                              ("rounded-sm ",
                              option.value === selectedColor &&
                                "ring-2 ring-black")
                            }
                            onClick={() => handleColorSelect(option.value)}
                            style={{ width: "fit-content" }}
                            type="button"
                          >
                            <div
                              className={`w-5 h-5 rounded-sm bg-${option.value}-400`}
                              style={{ backgroundColor: option.value }}
                            />
                            {/* <span className="capitalize">{option.value}</span> */}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {filters.map((section) => (
              <div key={section.id} className="border-b border-gray-200 py-6">
                <div className="-my-3 flow-root">
                  <div
                    onClick={() => handleSectionToggle(section.id)}
                    className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500 cursor-pointer"
                  >
                    <span className="text-lg font-semibold text-gray-900">
                      {section.name}
                    </span>
                    <span className="ml-6 flex px-4 items-center">
                      {openSections[section.id] ? (
                        <FaMinus className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <FaPlus className="h-5 w-5" aria-hidden="true" />
                      )}
                    </span>
                  </div>
                </div>
                {openSections[section.id] && (
                  <div className="pt-6">
                    <div className="space-y-4">
                      {section.options.map((option, optionIdx) => (
                        <div
                          key={option.value}
                          className="flex items-center ml-4"
                        >
                          <input
                            id={`filter-${section.id}-${optionIdx}`}
                            name={`${section.id}[]`}
                            defaultValue={option.value}
                            type="checkbox"
                            defaultChecked={option.checked}
                            onChange={() => {
                              setSelectedFilter((previous) => ({
                                ...previous,
                                [section.name]: option.value,
                              }));
                            }}
                            className="h-4 w-4 rounded-full border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor={`filter-${section.id}-${optionIdx}`}
                            className="ml-3 text-sm text-gray-600 w-full"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </form>

          <div className="w-3/4 ">
            <ProductList />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Filter;
