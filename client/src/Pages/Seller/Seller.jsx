import React, { useEffect, useState } from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import SellerSidebar from "../../components/SidebarSeller/SellerSidebar";

const SellerPanel = () => {
  const [activeComponent, setActiveComponent] = useState("dashboard");

  const handleActiveDashboard = (data) => {
    setActiveComponent(() => data);
    console.log(activeComponent);
  };

  return (
    <div className="flex h-[100vh]  ">
      <SellerSidebar handleActiveDashboard={handleActiveDashboard} />
      <div className="w-full h-[100%]  overflow-scroll">
        <Dashboard activeComponent={activeComponent} />
      </div>
    </div>
  );
};

export default SellerPanel;
