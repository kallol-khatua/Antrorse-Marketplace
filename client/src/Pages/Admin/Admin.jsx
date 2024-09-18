import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Dashboard from "../../components/Dashboard/Dashboard";

const Admin = () => {
  const [activeComponent, setActiveComponent] = useState("dashboard");

  const handleActiveDashboard = (data) => {
    setActiveComponent(() => data);
    console.log(activeComponent);
  };

  return (
    <div className="flex h-[100vh]  ">
      <Sidebar handleActiveDashboard={handleActiveDashboard} />
      <div className="w-full h-[100%]  overflow-scroll">
        <Dashboard activeComponent={activeComponent} />
      </div>
    </div>
  );
};

export default Admin;
