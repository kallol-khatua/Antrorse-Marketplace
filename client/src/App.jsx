import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy } from "react";

import MainLayout from "./components/MainLayout/MainLayout";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUpPage/SignUp";

//  =================== Seller Dashboard =================== //
import SellerDashboardLayout from "./components/SellerDashboardLayout/SellerDashboardLayout";
const Metric = lazy(() => import("./components/Metric/Metric"));
const SellerAccount = lazy(() => import("./Pages/sellerAccount/SellerAcount"));
const AddProd = lazy(() => import("./Pages/addProduct/Addprod"));
const AddProduct = lazy(() => import("./Pages/addProduct/AddProduct"));
const AllProducts = lazy(() => import("./Pages/AllProducts/AllProducts"));

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
import NotFound from "./components/404/NotFound";
import OrderCompleted from "./Pages/OrderComplete/OrderCompleted";
import Orders from "./Pages/Order/Order";

import ShirtProductDetails from "./Pages/Shirts/ShirtProductDetails";

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

import ClothingLayout from "./components/ClothingLayout/ClothingLayout";
import Shirts from "./Pages/Shirts/Shirts";
import AdminDashboardLayout from "./components/AdminDashboardLayout/AdminDashboardLayout";
import AdminLogin from "./Pages/AdminLogin/AdminLogin";
import AddAdminProduct from "./Pages/AddAdminProduct/AddAdminProduct";
import ApproveSellerProducts from "./Pages/ApproveSellerProducts/ApproveSellerProducts";
import AuthorizeSeller from "./Pages/AuthorizeSeller/AuthorizeSeller";
import ProductBuy from "./Pages/ProductBuy/ProductBuy";
import AccountLayout from "./Pages/Account/AccountLayout";
import AllOrders from "./Pages/Account/AllOrders";
import Addresses from "./Pages/Account/Addresses";
import SellerOrders from "./components/SellerOrders/SellerOrders";
import UploadDocument from "./Pages/SellerUploadDocument/UploadDocument";
import DefaultProductDetails from "./Pages/DefaultProductDetails/DefaultProductDetails";

import AdminOrders from "./components/AdminOrders/AdminOrders";
import FoodsAndBeveragesProduct from "./Pages/ProductDetails/FoodsAndBeveragesProduct";

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

          <Route path="admin-login" element={<AdminLogin />} />

          <Route path="orders" element={<Orders />} />
          <Route path="account" element={<Accounts />} />

          {/* indivisual product */}
          <Route path="productPage" element={<ProductPage />} />
          <Route path="Invoice" element={<Invoice />} />

          {/* Clothings product */}
          {/* <Route path="clothings" element={<ClothingLayout />}>
            <Route path="shirts" element={<Shirts />} />
          </Route> */}
          <Route
            path="clothings/shirts/view-details"
            element={<ShirtProductDetails />}
          />
          <Route
            path="clothings/shirts/view-details/buy-now"
            element={<ProductBuy />}
          />

          {/* Clothing */}
          <Route
            path="clothings/view-details"
            element={<ShirtProductDetails />}
          />

          {/* Default product */}
          <Route
            path="default/view-details"
            element={<DefaultProductDetails />}
          />
          <Route path="default/view-details/buy-now" element={<ProductBuy />} />

          {/* Foods and Beverages product */}
          <Route
            path="foods-and-beverages/view-details"
            element={<FoodsAndBeveragesProduct />}
          />
          <Route
            path="foods-and-beverages/view-details/buy-now"
            element={<ProductBuy />}
          />

          <Route path="/user" element={<AccountLayout />}>
            <Route path="orders" element={<AllOrders />} />
            <Route path="address" element={<Addresses />} />
          </Route>
        </Route>

        {/* <Route path="/admin" element={<Admin />} /> */}
        {/* <Route path="/profile" element={<AdminProfile />} /> */}

        {/* ===================== Seller Route ===================== */}

        <Route path="/seller" element={<SellerDashboardLayout />}>
          <Route path="dashboard" element={<Metric />} />
          <Route path="upload-document" element={<UploadDocument />} />
          <Route path="profile" element={<SellerAccount />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="all-products" element={<AllProducts />} />
          <Route path="orders" element={<SellerOrders />} />
          <Route path="settings" element={<Metric />} />
          <Route path="help-and-support" element={<Metric />} />
        </Route>

        <Route path="/admin" element={<AdminDashboardLayout />}>
          <Route path="dashboard" element={<Metric />} />
          <Route path="profile" element={<SellerAccount />} />
          <Route path="authorize-seller" element={<AuthorizeSeller />} />
          <Route path="add-product" element={<AddAdminProduct />} />
          <Route
            path="approve-seller-product"
            element={<ApproveSellerProducts />}
          />
          <Route
            path="approve-seller-product/:productId"
            element={<AddAdminProduct />}
          />
          <Route path="all-products" element={<AllProducts />} />
          <Route path="orders" element={<AdminOrders />} />
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
