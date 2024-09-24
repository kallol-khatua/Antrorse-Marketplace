import { Outlet } from "react-router-dom";
import Header from "../SellerDashboardHeader/Header";
import SellerSidebar from "../SidebarSeller/SellerSidebar";
import { Suspense } from "react";

// import Tables from "../../Pages/table/Tables";
// import TableThree from "../../Pages/table/TableThree";
// import AddProd from "../../Pages/addProduct/Addprod";
// import SellerAccount from "../../Pages/sellerAccount/SellerAcount";

function SellerDashboardLayout() {
  return (
    <div className="flex h-[100vh]  ">
      <SellerSidebar />
      <div className="w-full h-[100%]  overflow-scroll">
        <div className=" flex flex-col w-full gap-4  ">
          <Header />
          <div className="overflow-auto py-0 px-2 ">
            <Suspense fallback={<p>Loading...</p>}>
              <Outlet />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerDashboardLayout;
