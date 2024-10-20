import axios from "axios";
import { useEffect, useState } from "react";
import AuthorizeSellerSkeleton from "../../components/AuthorizeSeller/AuthorizeSellerSkeleton";
import AuthorizeSellerCard from "../../components/AuthorizeSeller/AuthorizeSeller";

function AuthorizeSeller() {
  const [sellers, setSellers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getSellerData = async () => {
    try {
      const url = `${
        import.meta.env.VITE_BACKEND_URL
      }/admin/due-authorization-seller`;
      const response = await axios.get(url);
      // console.log(response.data);

      if (response.status === 200) {
        setSellers(response.data.sellers);

        setIsLoading(false);
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
        Authorize seller
      </h2>

      <section className="bg-white text-gray-700">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:grid-cols-3 py-5">
          {isLoading &&
            Array.from({ length: 12 }, (_, index) => (
              <AuthorizeSellerSkeleton key={index} />
            ))}
        </div>
        {sellers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:grid-cols-3 py-5">
            {!isLoading &&
              sellers.map((seller) => {
                return (
                  <AuthorizeSellerCard
                    key={seller._id}
                    seller={seller}
                    getSellerData={getSellerData}
                  />
                );
              })}
          </div>
        ) : (
          !isLoading && (
            <h1 className="font-bold text-xl text-center">
              No seller found for authorization
            </h1>
          )
        )}
      </section>
    </div>
  );
}

export default AuthorizeSeller;
