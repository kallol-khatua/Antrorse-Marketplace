import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Suspense, useEffect } from "react";

function ClothingLayout() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      {/* <Navbar /> */}
      <Suspense fallback={<p>Loading...</p>}>
        <Outlet />
      </Suspense>
      {/* <Footer /> */}
    </>
  );
}

export default ClothingLayout;
