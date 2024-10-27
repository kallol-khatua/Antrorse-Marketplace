import { BiCategory } from "react-icons/bi";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";

function AccountLayout() {
  return (
    <div className="mx-4 max-w-screen-xl sm:mx-8 xl:mx-auto">
      <div className="border-b flex items-center justify-between py-6 text-4xl font-semibold text-left">
        <h1>Welcome!</h1>
        {/* <span className="text-2xl block md:hidden">
          <BiCategory />
        </span> */}
      </div>
      <div className=" flex justify-start pt-3 pb-3">
        <div className=" w-1/4 hidden md:block flex flex-col">
          {/* <NavLink
            to="/user/account-setting"
            className={`mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold ${({
              isActive,
            }) => (isActive ? "active-link" : "inactive-link")}`}
          >
            Account Setting
          </NavLink> */}
          <div>
            <NavLink
              to="/user/orders"
              className={`mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold ${({
                isActive,
              }) => (isActive ? "active-link" : "inactive-link")}`}
            >
              Orders
            </NavLink>
          </div>

          {/* <NavLink
            to="/user/payment-method"
            className={`mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold ${({
              isActive,
            }) => (isActive ? "active-link" : "inactive-link")}`}
          >
            Payment Method
          </NavLink> */}

          <div>
            <NavLink
              to="/user/address"
              className={`mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold ${({
                isActive,
              }) => (isActive ? "active-link" : "inactive-link")}`}
            >
              Address
            </NavLink>
          </div>

          {/* <NavLink
            to="/user/notifications"
            className={`mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold ${({
              isActive,
            }) => (isActive ? "active-link" : "inactive-link")}`}
          >
            Notifications
          </NavLink> */}

          {/* <NavLink
            to="/user/help-and-support"
            className={`mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold ${({
              isActive,
            }) => (isActive ? "active-link" : "inactive-link")}`}
          >
            Help & Support
          </NavLink> */}
        </div>
        <div className="w-full md:w-3/4 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AccountLayout;
