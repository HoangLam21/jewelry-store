import { formatPrice } from "@/lib/utils";
import React from "react";

interface Product {
  id: string;
  image: string;
  productName: string;
  price: string;
  material: string;
  quantity: number; // Fixed typo here
}

const ImportOrderCard = ({
  item,
  updateCart,
}: {
  item: Product;
  updateCart: (updatedItem: Product) => void;
}) => {
  const handleQuantityChange = (newQuantity: string) => {
    const quantity = parseInt(newQuantity, 10);
    if (isNaN(quantity) || quantity < 1) return; // Nếu không hợp lệ, bỏ qua
    const updatedItem = { ...item, quantity }; // Cập nhật số lượng
    updateCart(updatedItem); // Gửi thông tin mới về cho cha
  };

  return (
    <div
      key={item.id}
      className="w-full h-full flex flex-row items-center justify-between py-3"
    >
      <div className="flex w-full h-full gap-4 items-center py-3">
        <div className="h-14 w-14 rounded-lg bg-cover bg-no-repeat bg-center">
          <img src={item.image || ""} alt="avatar" className="rounded-lg" />
        </div>
        <div className="flex flex-col w-3/5">
          <span className="text-xs font-bold">{item.productName}</span>
          <span className="text-xs">{formatPrice(item.price)}</span>
        </div>
      </div>
      <div className="flex w-2/5 pt-4 gap-2">
        <button
          onClick={() => handleQuantityChange((item.quantity - 1).toString())}
        >
          -
        </button>
        <input
          type="text"
          value={item.quantity}
          onChange={(e) => handleQuantityChange(e.target.value)}
          min={1}
          className="w-16 h-6 border border-gray-300 rounded-md px-2 text-sm focus:outline-none mx-2"
        />
        <button
          onClick={() => handleQuantityChange((item.quantity + 1).toString())}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ImportOrderCard;
