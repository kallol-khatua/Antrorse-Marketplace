import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { sortingOption } from "../../redux/features/Sort/SortSlice";

const sortingParameters = [
  { id: 1, name: "Most Popular" },
  { id: 2, name: "Best Rating" },
  { id: 3, name: "Newest" },
  { id: 4, name: "Price: Low to High" },
  { id: 5, name: "Price: High to Low" },
];

const SortOption = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const sorting = useSelector((state) => state.sort.sorting);

  const handleSortChange = (id) => {
    dispatch(sortingOption(id));
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left  z-10">
      <div
        className="flex items-center justify-center gap-2 w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring focus:border-blue-300 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        {sortingParameters.find((el) => el.id === sorting)?.name}
        <span className="transition-all ease-out duration-600">
          {open ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </div>

      {open && (
        <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-2 ring-black ring-opacity-5">
          <div className="py-1">
            {sortingParameters.map((option) => (
              <div
                key={option.id}
                onClick={() => handleSortChange(option.id)}
                className={`${
                  option.id === sorting
                    ? "font-medium text-gray-900 bg-slate-200"
                    : "text-gray-500"
                } px-4 py-2 text-sm cursor-pointer hover:bg-slate-100`}
              >
                {option.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SortOption;
