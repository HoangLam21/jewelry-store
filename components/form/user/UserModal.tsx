import React, { useState } from "react";

const fakeUser = {
  fullName: "John Doe",
  phoneNumber: "+123456789",
  email: "john.doe@example.com",
  address: "123 Main St, Springfield, IL, USA",
  avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  purchaseHistory: [
    { id: 1, item: "Gold Necklace", date: "2024-12-01", price: "$500" },
    { id: 2, item: "Silver Ring", date: "2024-11-15", price: "$200" },
  ],
};

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<"info" | "history">("info");

  if (!isOpen) return null;

  return (
    <div className="fixed background-light800_dark400 text-dark100_light500 top-0 right-0 w-1/3 h-full bg-white shadow-lg z-50 flex flex-col items-center p-5">
      <button
        className="absolute top-5 right-5 text-xl font-bold text-gray-500"
        onClick={onClose}
      >
        ✕
      </button>
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-8 py-2 ${
            activeTab === "info"
              ? "border-primary-100 border-b-2"
              : " text-dark100_light500"
          }`}
          onClick={() => setActiveTab("info")}
        >
          User Information
        </button>
        <button
          className={`px-8 py-2 ${
            activeTab === "history"
              ? "border-primary-100 border-b-2"
              : " text-dark100_light500"
          }`}
          onClick={() => setActiveTab("history")}
        >
          Purchase History
        </button>
      </div>
      <img
        src={fakeUser.avatar}
        alt={fakeUser.fullName}
        className="w-24 h-24 rounded-full mb-4"
      />
      <h2 className="text-2xl font-semibold mb-4">{fakeUser.fullName}</h2>

      <div className="w-full">
        {activeTab === "info" && (
          <div className="mt-10 pl-5">
            <div className="mt-3">
              <p className="mt-3">
                <strong className="text-gray-200">Phone:</strong>{" "}
                {fakeUser.phoneNumber}
              </p>
            </div>
            <div className="mt-3">
              {" "}
              <p>
                <strong className="text-gray-200">Email:</strong>{" "}
                {fakeUser.email}
              </p>
            </div>
            <div className="mt-3">
              <p>
                <strong className="text-gray-200">Address:</strong>{" "}
                {fakeUser.address}
              </p>
            </div>
          </div>
        )}

        {activeTab === "history" && (
          <div>
            {fakeUser.purchaseHistory.length > 0 ? (
              <ul className="space-y-2">
                {fakeUser.purchaseHistory.map((purchase) => (
                  <li
                    key={purchase.id}
                    className="flex justify-between items-center border border-gray-500 bg-transparent rounded p-3"
                  >
                    <span>{purchase.item}</span>
                    <span>{purchase.date}</span>
                    <span className="font-bold">{purchase.price}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No purchase history available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserModal;
