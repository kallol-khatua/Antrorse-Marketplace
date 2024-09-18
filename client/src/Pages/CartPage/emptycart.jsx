import { useState } from "react";
import { Link } from "react-router-dom";

// Array of messages to display when the cart is empty
const emptyCartMessages = [
  "Your cart's feeling light—time to add delight!",
  "Cart's on a diet. Feed it with fabulous finds!",
  "Cart's taking a break. Let's give it some joy!",
  "Cart's shy today. Let's fill it up with smiles!",
  "Empty cart? No worries! Your future favorites await.",
  "Cart: 'Is it lonely in here?' You: 'Not for long!'",
  "Cart's asking for friends. Time to add some!",
  "Empty cart blues? We've got the remedy—shop now!",
  "Cart's hinting: 'Add something amazing, please!'",
  "Your cart's a canvas; paint it with your favorites!",
  "Cart's calling—answer with trendy additions!",
  "Empty carts are like blank pages—let's write a story!",
  "Cart's giving puppy eyes. Fill it up with goodies!",
  "Cart's on standby. Your picks will wake it up!",
  "Cart's on a hunger strike. Feed it with fashion!",
  "Empty cart? Time to play personal shopper!",
  "Cart's whispering, 'I miss you.' Fill the void!",
  "Cart's saying, 'I'm a bit empty.' You: 'Challenge accepted!'",
  "Cart's waiting for treasures. Ready, set, shop!",
  "Cart's waving. Give it a high-five with new additions!",
];

// Function to get a random message from the array
const getRandomMessage = () => {
  const randomIndex = Math.floor(Math.random() * emptyCartMessages.length - 1);
  return emptyCartMessages[randomIndex];
};

// Functional component for the empty cart state
const Emptycart = () => {
  // Get a random message when the component is rendered
  const [message] = useState(getRandomMessage());

  return (
    <div className="container mx-auto my-8 space-y-10">
      <div className="max-w-4xl mx-auto px-10 py-4 bg-white rounded-lg shadow-lg">
        <div>
          {/* Display the random message */}
          <span className="bg-green-100 font-mono text-indigo-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-green-300">
            Your cart is empty.
          </span>
        </div>
        <div className="flex flex-col items-center justify-center py-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-24 w-24 text-gray-400 mb-4"
          >
            <path d="M4.00488 16V4H2.00488V2H5.00488C5.55717 2 6.00488 2.44772 6.00488 3V15H18.4433L20.4433 7H8.00488V5H21.7241C22.2764 5 22.7241 5.44772 22.7241 6C22.7241 6.08176 22.7141 6.16322 22.6942 6.24254L20.1942 16.2425C20.083 16.6877 19.683 17 19.2241 17H5.00488C4.4526 17 4.00488 16.5523 4.00488 16ZM6.00488 23C4.90031 23 4.00488 22.1046 4.00488 21C4.00488 19.8954 4.90031 19 6.00488 19C7.10945 19 8.00488 19.8954 8.00488 21C8.00488 22.1046 7.10945 23 6.00488 23ZM18.0049 23C16.9003 23 16.0049 22.1046 16.0049 21C16.0049 19.8954 16.9003 19 18.0049 19C19.1095 19 20.0049 19.8954 20.0049 21C20.0049 22.1046 19.1095 23 18.0049 23Z"></path>
          </svg>

          {/* Display a message about the empty shopping cart */}
          <p className="text-gray-600 text-lg font-semibold mb-4">{message}</p>

          {/* Button to encourage users to go shopping */}
          <button className="px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition-colors duration-300">
            <Link to="/">Lets go shopping!</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Emptycart;
