import React, { useState } from "react";
import MyButton from "@/components/shared/button/MyButton";

const OrderDetailModal = ({ order, isOpen, onClose, onCancelOrder }: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-1/2">
        <h2 className="text-2xl font-bold mb-4">Order Details</h2>
        <p>
          <strong>Order ID:</strong> {order._id}
        </p>
        <p>
          <strong>Status:</strong> {order.status}
        </p>
        <p>
          <strong>Cost:</strong> {order.cost.toLocaleString()}
        </p>
        <p>
          <strong>Discount:</strong> {order.discount}
        </p>
        <p>
          <strong>Shipping Method:</strong> {order.shippingMethod}
        </p>
        <p>
          <strong>ETD:</strong> {new Date(order.ETD).toLocaleDateString()}
        </p>

        {order.status === "pending" && (
          <MyButton
            title="Cancel Order"
            background="bg-red-500"
            rounded="none"
            text_color="text-white"
            text="text-sm"
            onClick={() => onCancelOrder(order._id)}
            width={""}
          />
        )}

        <button
          className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};
export default OrderDetailModal;
