import { Outlet, useNavigate } from "react-router-dom";
import Header from "../AdminDashboardHeader/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";

function AdminDashboardLayout() {
  const navigate = useNavigate();
  const isAdminLoggedIn = useSelector((state) => state.admin.authorized);
  useEffect(() => {
    if (!isAdminLoggedIn) {
      // console.log("not logged in");
      // console.log(isAdminLoggedIn);
      navigate("/admin-login");
    }
  }, [isAdminLoggedIn, navigate]);

  return (
    <div className="flex h-[100vh]  ">
      <Sidebar />
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

export default AdminDashboardLayout;
