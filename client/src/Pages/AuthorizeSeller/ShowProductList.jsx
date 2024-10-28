import { useEffect, useState } from "react";
import AdminAxiosInstance from "../../AdminAxiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ProductCardSkeleton from "../../components/ProductCard/ProductCardSkeleton";
import ProductCard from "../../components/ProductCard/ProductCard";
import ShowProductCard from "./ShowProductCard";

const NoProduct = () => {
  return (
    <div className="h-60 bg-gray-100">
      <div className="flex justify-center items-center h-full ">
        <h1 className="font-semibold text-md">No product found</h1>
      </div>
    </div>
  );
};

const ErrorLoadingProduct = () => {
  return (
    <div className="h-60 bg-gray-100">
      <div className="flex justify-center items-center h-full ">
        <h1 className="font-semibold text-md">
          Error while loading seller products
        </h1>
      </div>
    </div>
  );
};

function ShowProductList() {
  const { sellerId } = useParams();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const getSellerProducts = async () => {
    try {
      const url = `/admin/get-seller-products?sellerId=${sellerId}`;
      const response = await AdminAxiosInstance.get(url);

      if (response.status === 200) {
        setTimeout(() => {
          setProducts(response.data.products);
          setIsLoading(false);
        }, [250]);
      }
    } catch (error) {
      setTimeout(() => {
        console.log("Error while loading seller products");
        setIsLoading(false);
        setIsError(true);
      }, [250]);
    }
  };

  useEffect(() => {
    getSellerProducts();
  }, []);

  return (
    <>
      <section className="bg-white  text-gray-700 p-0 bg-gray-100 my-5">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4  p-4  bg-gray-100 w-full justify-items-center">
            {Array.from({ length: 12 }, (_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4  p-4  bg-gray-100 w-full justify-items-center">
            {products.map((product, index) => (
              <>
                {/* <ProductCard key={index} product={product} /> */}
                <ShowProductCard
                  product={product}
                  key={product._id}
                  getSellerProducts={getSellerProducts}
                />
              </>
            ))}
          </div>
        ) : isError ? (
          <ErrorLoadingProduct />
        ) : (
          <NoProduct />
        )}
      </section>
    </>
  );
}

export default ShowProductList;
