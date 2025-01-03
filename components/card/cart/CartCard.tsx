import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";

const CartCard = ({ item }: any) => {
  const { dispatch } = useCart();

  const selectedVariant = item.variants?.find(
    (variant: { material: string }) =>
      variant.material === item.selectedMaterial
  );
  const basePriceWithAddOn = item.cost + (selectedVariant?.addOn || 0);

  const maxDiscount = item.vouchers?.reduce(
    (max: number, voucher: { discount: number }) =>
      voucher.discount > max ? voucher.discount : max,
    0
  );
  const effectiveDiscount = maxDiscount || item.discount || 0;

  const discountedPrice =
    basePriceWithAddOn - (basePriceWithAddOn * effectiveDiscount) / 100;

  return (
    <>
      <hr className="mb-4"></hr>
      <div className="flex w-[95%] justify-between mb-4">
        <div className="w-[35%] flex items-center">
          <div>
            <Image
              src={item.files[0].url}
              alt={item.name}
              width={151}
              height={188}
              className="object-cover w-[151px] h-[188px]"
            />
          </div>
          <div className="ml-4">
            <div className="ml-4">
              <span className="text-[20px] font-normal jost">{item.name}</span>
              <hr className="border-transparent" />
              <span className="text-primary-100">{discountedPrice}</span>
              <br />
              <span className="text-gray-500 line-through">
                {basePriceWithAddOn}
              </span>
              <hr className="border-none"></hr>
              <span>
                {item.selectedMaterial}, {item.selectedSize}
              </span>
            </div>
          </div>
        </div>
        <div className="w-[15%] flex items-center justify-center">
          <button
            className="px-2 background-light700_dark300"
            onClick={() =>
              dispatch({ type: "DECREASE_QUANTITY", payload: item._id })
            }
          >
            -
          </button>
          <span className="text-[16px] font-normal jost mx-2">
            {item.quantity}
          </span>
          <button
            className="px-2 background-light700_dark300"
            onClick={() =>
              dispatch({ type: "INCREASE_QUANTITY", payload: item._id })
            }
          >
            +
          </button>
        </div>
        <div className="w-[25%] flex items-center justify-end">
          <span className="text-[28px] font-medium text-primary-100">
            {(discountedPrice || item.cost) * item.quantity}
          </span>
        </div>
        <div className="w-[5%] flex items-center justify-center">
          <button
            className=""
            onClick={() =>
              dispatch({ type: "REMOVE_FROM_CART", payload: item._id })
            }
          >
            <Icon
              icon="material-symbols:close-rounded"
              width="24"
              height="24"
            />
          </button>
        </div>
      </div>
      <hr className="mt-2"></hr>
    </>
  );
};

export default CartCard;
