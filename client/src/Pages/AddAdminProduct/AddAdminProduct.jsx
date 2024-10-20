import "react-tagsinput/react-tagsinput.css";
import AdminProductType from "../../components/AdminProductType/AdminProductType";

const AddAdminProduct = () => {
  return (
    <div>
      <h2 className=" text-2xl shadow-sm font-bold text-center border-b mb-2 pb-4">
        Add Product
      </h2>
      <AdminProductType />
    </div>
  );
};

export default AddAdminProduct;
