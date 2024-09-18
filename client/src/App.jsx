import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Checkout from "./Pages/Checkout/Checkout";
import Navbar from "./components/Navbar/Navbar";
import ProductPage from "./Pages/ProductPage/ProductPage";
import Account from "./Pages/Account/Account";
import Invoice from "./Pages/Invoice/Invoice";
import Admin from "./Pages/Admin/Admin";
import Footer from "./components/Footer/Footer";
import Wishlist from "./Pages/wishlist/Wishlist";
import SellerSupport from "./Pages/sellerSupport/SellerSupport";
import AdminProfile from "./Pages/Admin/AdminProfilePage/AdminProfile";
import KYCForm from "./Pages/sellerKyc/SellerKyc";
import SellerSignUp from "./Pages/sellerKyc/SellerSignup";
import AddProduct from "./Pages/addProduct/AddProduct";
import NotFound from "./components/404/NotFound";
import OrderCompleted from "./Pages/OrderComplete/OrderCompleted";
import Orders from "./Pages/Order/Order";
import SellerAccount from "./Pages/sellerAccount/SellerAcount";
import AddProd from "./Pages/addProduct/Addprod";
import CartPage from "./Pages/CartPage/CartPage";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUpPage/SignUp";
import Viewproducts from "./Pages/Viewproducts/Viewproducts";
import { useEffect } from "react";
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
  const location = () => window.location.pathname;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <Router>
      {location() === "/admin" || location() === "/seller" ? null : <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/createPassword" element={<CreatePassword />} />
        <Route path="/viewproducts" element={<Viewproducts />} />
        <Route path="/productdetail/:productId" element={<ProductDetail />} />

        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/viewcart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orderCompleted" element={<OrderCompleted />} />

        <Route path="/orders" element={<Orders />} />
        <Route path="/account" element={<Accounts />} />

        <Route path="/productPage" element={<ProductPage />} />
        <Route path="/Invoice" element={<Invoice />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/seller" element={<SellerPanel />} />

        <Route path="/sellerSupport" element={<SellerSupport />} />
        <Route path="/profile" element={<AdminProfile />} />

        <Route path="/sellerLogin" element={<SellerLogin />} />
        <Route path="/sellersignup" element={<SellerSignUp />} />
        <Route
          path="/sellercreatepassword"
          element={<SellerCreatePassword />}
        />
        <Route path="/kycform" element={<KYCForm />} />

        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/SellerAccount" element={<SellerAccount />} />
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
      {location() === "/admin" || location() === "/seller" ? null : <Footer />}
    </Router>
  );
}

export default App;
