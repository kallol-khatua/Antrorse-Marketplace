import { useEffect, useState } from "react";
import ApprovalSkeleton from "../../components/ProductApproval/ApprovalSkeleton";
import AdminAxiosInstance from "../../AdminAxiosInstance";
import ProductList from "../../components/ProductApproval/ProductList";

function ApproveSellerProducts() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const getSellerData = async () => {
    try {
      const url = `/admin/approve-seller-product`;
      const response = await AdminAxiosInstance.get(url);
      // console.log(response.data);

      if (response.status === 200) {
        setProducts(response.data.products);
        setTimeout(() => {
        setIsLoading(false);
        }, [250]);
      }
    } catch (error) {
      setIsLoading(false);
      console.log("Error while fetching seller to authorize");
    }
  };

  useEffect(() => {
    getSellerData();
  }, []);

  return (
    <div>
      <h2 className=" text-2xl shadow-sm font-bold text-center border-b mb-2 pb-4">
        Approve Products
      </h2>

      <section className="bg-white text-gray-700">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:grid-cols-4 py-5">
          {isLoading &&
            Array.from({ length: 12 }, (_, index) => (
              <ApprovalSkeleton key={index} />
            ))}
        </div>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:grid-cols-4 py-5">
            {!isLoading &&
              products.map((product) => {
                return <ProductList key={product._id} product={product} />;
              })}
          </div>
        ) : (
          !isLoading && (
            <h1 className="font-bold text-xl text-center">
              No product found for approval
            </h1>
          )
        )}
      </section>
    </div>
  );
}

export default ApproveSellerProducts;
