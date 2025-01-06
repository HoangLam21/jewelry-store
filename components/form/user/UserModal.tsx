import { updateInfoCustomer } from "@/lib/service/customer.service";
import React, { useEffect, useState } from "react";
import EditModal from "./EditModal";
import Avatar from "./Avatar";
interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CreateCustomer {
  fullName: string;
  phoneNumber: string;
  email: string;
  address: string;
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<"info" | "history">("info");
  const [user, setUser] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState<CreateCustomer>({
    fullName: "",
    phoneNumber: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        setUser(parsedData);
      } catch (error) {
        console.error("Failed to parse user data from localStorage:", error);
      }
    }
  }, []);

  const handleEditClick = () => {
    setEditData({
      fullName: user?.fullName || "",
      phoneNumber: user?.phoneNumber || "",
      email: user?.email || "",
      address: user?.address || "",
    });
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!user?._id) return;

    try {
      const updatedUser = await updateInfoCustomer(user._id, editData);
      setUser(updatedUser);
      localStorage.setItem("userData", JSON.stringify(updatedUser));
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

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

      <Avatar user={user} setProfileUser={setUser} />
      {/* <img
        src={user?.avatar}
        alt={user?.fullName}
        className="w-24 h-24 rounded-full mb-4"
      /> */}
      <h2 className="text-2xl font-semibold mb-4">{user?.fullName}</h2>

      <button
        onClick={handleEditClick}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Edit Info
      </button>

      {/* Info Tab */}
      {activeTab === "info" && (
        <div className="w-full pl-5">
          <p className="mt-3">
            <strong className="text-gray-200">Phone:</strong>{" "}
            {user?.phoneNumber}
          </p>
          <p className="mt-3">
            <strong className="text-gray-200">Email:</strong> {user?.email}
          </p>
          <p className="mt-3">
            <strong className="text-gray-200">Address:</strong> {user?.address}
          </p>
        </div>
      )}

      {isEditModalOpen && (
        <EditModal
          editData={editData}
          setEditData={setEditData}
          setIsEditModalOpen={setIsEditModalOpen}
          handleSaveEdit={handleSaveEdit}
        />
      )}
    </div>
  );
};

export default UserModal;
