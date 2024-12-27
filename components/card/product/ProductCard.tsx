import React from "react";

const ProductCard = ({ item }: { item: any }) => {
  return (
    <div className="w-[260px] h-[454px]">
      <img
        src={item.images}
        alt={item.name}
        className="w-full h-[350px] mt-2"
      />
      <h2 className="text-[20px]  jost font-normal uppercase text-dark100_light500">
        {item.name}
      </h2>
      <p className=" text-[#939393]">{item.category}</p>
      <p className="text-primary-100 text-[20px] text-right w-full">
        ${item.cost}
      </p>
    </div>
  );
};

export default ProductCard;
