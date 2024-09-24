import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy } from "react";

import MainLayout from "./components/MainLayout/MainLayout";
import Home from "./Pages/Home/Home";
const Login = lazy(() => import("./Pages/Login/Login"));
const SignUp = lazy(() => import("./Pages/SignUpPage/SignUp"));

//  =================== Seller Dashboard =================== //
import SellerDashboardLayout from "./components/SellerDashboardLayout/SellerDashboardLayout";
const Metric = lazy(() => import("./components/Metric/Metric"));
const SellerAccount = lazy(() => import("./Pages/sellerAccount/SellerAcount"));
const AddProd = lazy(() => import("./Pages/addProduct/Addprod"));

import Checkout from "./Pages/Checkout/Checkout";
import ProductPage from "./Pages/ProductPage/ProductPage";
import Account from "./Pages/Account/Account";
import Invoice from "./Pages/Invoice/Invoice";
import Admin from "./Pages/Admin/Admin";
import Wishlist from "./Pages/wishlist/Wishlist";
import SellerSupport from "./Pages/sellerSupport/SellerSupport";
import AdminProfile from "./Pages/Admin/AdminProfilePage/AdminProfile";
import KYCForm from "./Pages/sellerKyc/SellerKyc";
import SellerSignUp from "./Pages/sellerKyc/SellerSignup";
import AddProduct from "./Pages/addProduct/AddProduct";
import NotFound from "./components/404/NotFound";
import OrderCompleted from "./Pages/OrderComplete/OrderCompleted";
import Orders from "./Pages/Order/Order";

import CartPage from "./Pages/CartPage/CartPage";
import Viewproducts from "./Pages/Viewproducts/Viewproducts";
import OTP from "./Pages/SignUpPage/OTP";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Payment from "./Pages/Payment/Payment";
import PhonepeStatus from "./components/Phonepe/PhonepeStatus";
import CreatePassword from "./Pages/SignUpPage/CreatePassword";
import Accounts from "./Pages/Account/Accounts";
import SellerCreatePassword from "./Pages/sellerKyc/SellerCreatePassword";
import SellerLogin from "./Pages/sellerKyc/SellerLogin";
import PaymentSucess from "./components/PaymentStatus/PaymentSucess";
import SellerPanel from "./Pages/Seller/Seller";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="otp" element={<OTP />} />
          <Route path="createPassword" element={<CreatePassword />} />
          <Route path="viewproducts" element={<Viewproducts />} />
          <Route path="productdetail/:productId" element={<ProductDetail />} />

          <Route path="wishlist" element={<Wishlist />} />
          <Route path="viewcart" element={<CartPage />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="orderCompleted" element={<OrderCompleted />} />

          <Route path="sellerLogin" element={<SellerLogin />} />
          <Route path="sellersignup" element={<SellerSignUp />} />

          <Route path="orders" element={<Orders />} />
          <Route path="account" element={<Accounts />} />

          <Route path="productPage" element={<ProductPage />} />
          <Route path="Invoice" element={<Invoice />} />
        </Route>

        <Route path="/admin" element={<Admin />} />
        {/* <Route path="/profile" element={<AdminProfile />} /> */}

        {/* ===================== Seller Route ===================== */}

        <Route path="/seller" element={<SellerDashboardLayout />}>
          <Route path="dashboard" element={<Metric />} />
          <Route path="profile" element={<SellerAccount />} />
          <Route path="add-product" element={<AddProd />} />
          <Route path="orders" element={<Metric />} />
          <Route path="settings" element={<Metric />} />
          <Route path="help-and-support" element={<Metric />} />
        </Route>

        {/* <Route path="/seller/dashboard" element={<SellerPanel />} /> */}
        {/* <Route path="/sellerSupport" element={<SellerSupport />} /> */}

        <Route
          path="/sellercreatepassword"
          element={<SellerCreatePassword />}
        />
        <Route path="/kycform" element={<KYCForm />} />

        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/404" element={<NotFound />} />
        {/* <Route path="/SellerAccount" element={<SellerAccount />} /> */}
        <Route path="/AddProd" element={<AddProd />} />
        <Route path="/productdetail" element={<ProductDetail />} />
        <Route path="/payment/:total" element={<Payment />} />
        <Route
          path="/payment/validate/:transactionID"
          element={<PhonepeStatus />}
        />

        <Route path="*" element={<NotFound />} />
        <Route />
      </Routes>
    </Router>
  );
}

export default App;
