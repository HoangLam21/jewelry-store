import { useCart } from "@/contexts/CartContext";
import React, { useState } from "react";

const ProductCard = ({ item }: { item: any }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { dispatch } = useCart();
  return (
    <div
      className="relative w-[260px] h-[454px] transition-all"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={item.images}
        alt={item.name}
        className="w-full h-[350px] mt-2"
      />
      <h2 className="text-[20px] jost font-normal uppercase text-dark100_light500">
        {item.name}
      </h2>
      <p className="text-[#939393]">{item.category}</p>
      <p className="text-primary-100 text-[20px] text-right w-full">
        ${item.cost}
      </p>

      {/* Nút "Thêm vào giỏ hàng" */}
      {isHovered && (
        <button
          className="absolute w-full bottom-24 left-1/2 transform -translate-x-1/2 bg-primary-100 text-white px-4 py-2  shadow-md transition-all hover:bg-primary-200"
          onClick={() => dispatch({ type: "ADD_TO_CART", payload: item })}
        >
          Add to cart
        </button>
      )}
    </div>
  );
};

export default ProductCard;
