/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { CiMobile3 } from "react-icons/ci";
import GenerateInvoice from "./GenerateInvoice";
import ToBePacked from "./ToBePacked";
import ReadyForDispatch from "./ReadyForDispatch";

function Navigation() {
  const [selectedTab, setSelectedTab] = useState("GENERATE AWB");

  const handleCategoryClick = (category) => {
    setSelectedTab(category);
  };

  const [tabs, setTabs] = useState([
    "GENERATE AWB",
    "TO BE PACKED",
    "READY FOR DISPATCH",
  ]);

  return (
    <div>
      <h2 className=" text-2xl shadow-sm font-bold text-center border-b mb-2 pb-4">
        All orders
      </h2>

      <div className="w-full">
        <div className="">
          <div className="rounded-md shadow-md m-2 mr-20 w-full border p-2 bg-white ">
            <div className="flex gap-2 items-center cursor-pointer overflow-x-auto whitespace-nowrap py-2">
              {tabs.map((tab, index) => {
                return (
                  <div
                    key={index}
                    className={`px-2 py-1 flex items-center justify-center rounded-md shadow-sm gap-2 ${
                      selectedTab === tab ? "bg-blue-500" : "bg-slate-200"
                    }`}
                    onClick={() => handleCategoryClick(tab)}
                  >
                    <div className="font-bold w-6 h-8 flex items-center justify-center rounded-sm">
                      <CiMobile3 />
                    </div>
                    <div>
                      <h1 className="text-md font-bold pr-4">{tab}</h1>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* new */}
            <div>
              {selectedTab === "GENERATE AWB" && <GenerateInvoice />}
              {selectedTab === "TO BE PACKED" && <ToBePacked />}
              {selectedTab === "READY FOR DISPATCH" && <ReadyForDispatch />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
