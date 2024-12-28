import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface Product {
  id: string;
  image: string;
  productName: string;
  price: string;
  material: string;
  quantity: number;
}

const ImportCard = ({
  item,
  onClick,
}: {
  item: Product;
  onClick: () => void;
}) => {
  return (
    <div
      className="w-28 h-44 rounded-lg bg-gray-100 flex flex-col gap-1 hover:cursor-pointer"
      onClick={onClick}
    >
      <div className="w-full h-32 rounded-lg">
        <Image
          src={item.image}
          alt="image"
          className="w-full h-full object-cover rounded-md"
          width={80}
          height={96}
        />
      </div>
      <p className="text-xs break-words truncate px-1">{item.productName}</p>
      <p className="text-xs  truncate px-1 self-end">
        {formatPrice(item.price)}
      </p>
    </div>
  );
};

export default ImportCard;
