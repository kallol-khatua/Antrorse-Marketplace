import React, { useState } from "react";
import ChatModal from "./Chatmodel";
const Help = () => {
  const [chatModalVisible, setChatModalVisible] = useState(false);

  const handleChatButtonClick = () => {
    setChatModalVisible(true);
  };

  const handleCloseChatModal = () => {
    setChatModalVisible(false);
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow min-h-96">
      <h2 className="text-lg font-semibold mb-4 ml-4 mt-8">Help and Support</h2>
      <hr />
      <br />
      <div className="flex flex-col">
        <button
          onClick={handleChatButtonClick}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4 self-start w-1/4"
        >
          Chat with us
        </button>
        <button
          onClick={() => alert("we will call you")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-1/4"
        >
          Call back
        </button>
      </div>

      {chatModalVisible && (
        <ChatModal handleCloseChatModal={handleCloseChatModal} />
      )}
    </div>
  );
};

export default Help;
