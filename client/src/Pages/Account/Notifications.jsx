const Notifications = () => {
  const notifications = [
    {
      message:
        "No min. order value! Avail Free Shipping on order value of Min.₹600! Shop Now",
      date: "27 Feb, 2024",
    },
    {
      message:
        "Get 5% Unlimited Cashback + ₹1,000* Gift Card with Flipkart Axis Bank Credit Card. Apply Now",
      date: "26 Feb, 2024",
    },
    {
      message:
        "Re-Apply for Flipkart Axis Bank Credit Card. Get 5% Cashback + ₹1000* Gift Card. Start Shopping & Saving Today",
      date: "25 Feb, 2024",
    },
    {
      message:
        "No min. order value! Avail Free Shipping on order value of Min.₹600! Shop Now",
      date: "22 Feb, 2024",
    },
    {
      message:
        "Get 5% Unlimited Cashback + ₹1,000* Gift Card with Flipkart Axis Bank Credit Card. Apply Now",
      date: "21 Feb, 2024",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">All Notifications</h1>
        {notifications.map((notification, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md mb-6 p-6">
            <p className="text-lg">{notification.message}</p>
            <p className="text-sm text-gray-600 mt-2">{notification.date}</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">
              More Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
