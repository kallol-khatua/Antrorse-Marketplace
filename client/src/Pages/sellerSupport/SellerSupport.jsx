const SellerSupport = () => {
  return (
    <div className="sm:w-[38rem] mx-auto my-10 overflow-hidden rounded-2xl bg-white shadow-lg sm:max-w-lg px-5 sm:px-0 ">
      <div className="bg-blue-800 px-10 py-10 text-center text-white">
        <p className="font-serif text-2xl font-semibold tracking-wider">
          Seller Help/Support
        </p>
        <p className="text-center text-blue-100">
          We strive to resolve your queries within 24 hr
        </p>
      </div>

      <div className="space-y-4 px-8 py-10">
        <label className="block" htmlFor="name">
          <p className="block text-sm font-medium text-gray-600">
            Order Id (Optional)
          </p>
          <input
            className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
            type="text"
            placeholder="Enter your Order_Id"
          />
        </label>
        <label className="block" htmlFor="name">
          <p className="block text-sm font-medium text-gray-600">Message</p>
          <textarea
            className="h-32 w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
            type="text"
            placeholder="Describe your problem in complete details."
          ></textarea>
        </label>

        <label
          htmlFor="attachment"
          className="block text-sm font-medium text-gray-600"
        >
          <p className="block text-sm font-medium text-gray-600">
            Attachment (Optional)
          </p>
          <input
            type="file"
            id="attachment"
            name="attachment"
            className="mt-1 p-2 w-full border rounded-md  bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
          />
        </label>

        {/* <button className="mt-4 rounded-full bg-blue-800 px-10 py-2 font-semibold text-white">
          Submit
        </button> */}
        <button
          className="w-full bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          type="button"
          // onClick={handleKYCSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default SellerSupport;
