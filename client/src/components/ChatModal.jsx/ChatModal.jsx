import React, { useState } from "react";

const ChatModal = ({ handleCloseChatModal }) => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { content: "Hello", sentByUser: false },
    { content: "yes how can i help you", sentByUser: true },
    { content: "i am facing some issue", sentByUser: false },
  ]);

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      setChatHistory([...chatHistory, { content: message, sentByUser: true }]);
      setMessage("");
    }
  };

  return (
    <div className="fixed h-[420px] bottom-0 right-0 z-50 flex items-end justify-end p-4">
      <div className="relative p-4 w-full max-w-md overflow-hidden bg-gray-800 text-white rounded-lg shadow-lg">
        <button
          className="absolute top-2 right-5"
          onClick={() => handleCloseChatModal()}
        >
          x
        </button>

        {/* Heading for the chat with the seller */}
        <div className="mb-4 text-xl font-semibold text-center">
          Chat with Seller
        </div>

        <div className="flex flex-col h-full bg-gray-700 rounded-lg overflow-hidden">
          <div className="flex flex-col flex-grow h-[300px] bg-white p-4 overflow-y-auto">
            {/* Chat history mapping */}
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`flex w-full mt-2 max-w-md ${
                  chat.sentByUser ? "ml-auto justify-end" : "space-x-3"
                }`}
              >
                {!chat.sentByUser && (
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                )}
                <div>
                  <div
                    className={`${
                      chat.sentByUser
                        ? "bg-blue-600 text-white rounded-l-lg rounded-br-lg"
                        : "bg-gray-300 text-black rounded-r-lg rounded-bl-lg"
                    } p-3`}
                  >
                    <p className="text-sm">{chat.content}</p>
                  </div>
                  <span className="text-xs text-gray-500 leading-none">
                    2 min ago
                  </span>
                </div>
                {chat.sentByUser && (
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-gray-600 p-4 rounded-b-lg">
            {/* Input for sending messages */}
            <div className="flex items-center rounded px-3 text-sm">
              <input
                type="text"
                placeholder="Type your message…"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-grow outline-none h-full w-full px-4 py-2 border border-gray-300 rounded-md text-black"
              />
              <button
                onClick={handleSendMessage}
                className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
