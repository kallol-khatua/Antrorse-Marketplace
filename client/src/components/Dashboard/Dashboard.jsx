import React from "react";
import Header from "../AdminHeader/Header";
import Metric from "../Metric/Metric";
import Calendar from "../Calendar/Calendar";
import Tables from "../../Pages/table/Tables";
import TableThree from "../../Pages/table/TableThree";
import AddProd from "../../Pages/addProduct/Addprod";
import SellerAccount from "../../Pages/sellerAccount/SellerAcount";

const Dashboard = ({ activeComponent }) => {
  let componentToRender;

  switch (activeComponent) {
    case "tables":
      componentToRender = <Tables />;
      break;
    case "calender":
      componentToRender = <Calendar />;
      break;
    case "seller":
      componentToRender = <TableThree activeComponent={activeComponent} />;
      break;
    case "addproduct":
      componentToRender = <AddProd />;
      break;
    case "settings":
      componentToRender = <SellerAccount />;
      break;
    default:
      componentToRender = <Metric />;
  }

  return (
    <div className=" flex flex-col w-full gap-4  ">
      <Header />
      <div className="overflow-auto py-0 px-2 ">{componentToRender}</div>
    </div>
  );
};

export default Dashboard;
