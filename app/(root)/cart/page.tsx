"use client";
import CartCard from "@/components/card/cart/CartCard";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Page() {
  const { state } = useCart();
  const router = useRouter();
  const handleCheckout = () => {
    router.push("/checkout");
  };
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    console.log(storedCart);
  });

  const totalOriginalPrice = state.items.reduce((acc, item) => {
    const selectedVariant = item.variants.find(
      (variant) => variant.material === item.selectedMaterial
    );
    const addOn = selectedVariant ? selectedVariant.addOn : 0;

    return acc + (item.cost + addOn) * item.quantity;
  }, 0);

  const totalDiscount = state.items.reduce((acc, item) => {
    const maxDiscount = item.vouchers.length
      ? Math.max(...item.vouchers.map((voucher) => voucher.discount || 0))
      : 0;

    // Tìm vật liệu đã chọn
    const selectedVariant = item.variants.find(
      (variant) => variant.material === item.selectedMaterial
    );
    const addOn = selectedVariant ? selectedVariant.addOn : 0;

    return acc + ((item.cost + addOn) * item.quantity * maxDiscount) / 100;
  }, 0);

  const appliedVouchers = state.items.flatMap((item) =>
    item.vouchers.map((voucher) => ({
      name: voucher.name,
      discount: voucher.discount,
    }))
  );

  const totalFinalPrice = totalOriginalPrice - totalDiscount;
  return (
    <div className="w-full text-dark100_light500">
      <div className="bg-[#EDF1F3]  dark:bg-dark-200 h-[250px] flex justify-center items-center">
        <div>
          <h1 className="text-dark100_light500 font-light text-[84px]">CART</h1>
          <div className="flex justify-center items-center">
            <Link href="/">
              <span className="text-dark100_light500">Home</span>
            </Link>
            <Icon
              icon="solar:alt-arrow-right-line-duotone"
              width="24"
              height="16"
            />
            <Link href="/cart">
              <span className="text-primary-100">Cart</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-10 w-full justify-center flex">
        <div className=" w-[80%]">
          <div className="flex w-[80%] mb-10 justify-between">
            <div className="1/2">
              <span className="text-[20px] font-normal jost">PRODUCT</span>
            </div>
            <div className="w-[20px]">
              <span className="text-[20px] font-normal jost">QUANTITY</span>
            </div>
            <div className="w-[30px]">
              <span className="text-[20px] font-normal jost">SUBTOTAL</span>
            </div>
          </div>
          {state.items.map((item) => (
            <CartCard key={item._id} item={item} />
          ))}
          <div className="mt-10 w-full flex flex-col">
            <div className="text-[20px] font-normal jost">
              <span>Total Original Price: </span>
              <div className="text-end">
                <span className="text-primary-100 text-end w-full">
                  {totalOriginalPrice}
                </span>
              </div>
            </div>
            <hr className="mt-2"></hr>

            <div className="text-[20px] font-normal jost mt-4">
              <span>Applied Vouchers:</span>
              {appliedVouchers.map((voucher, index) => (
                <li key={index} className="text-[16px] font-light">
                  <span className="text-primary-100">{voucher.name}</span>
                  <span>: {voucher.discount}% off</span>
                </li>
              ))}
            </div>

            <div className="text-[20px] font-normal jost mt-4">
              <span>Total Discount: </span>
              <div className="text-end">
                <span className="text-red-500">-{totalDiscount}</span>
              </div>
            </div>
            <hr className="mt-2"></hr>

            <div className="text-[20px] font-medium jost mt-4">
              <span>Total Final Price: </span>
              <div className="text-end">
                <span className="text-primary-100">{totalFinalPrice}</span>
              </div>
            </div>
            <hr className="mt-2"></hr>
          </div>
          <div className="flex justify-center mt-5">
            <Button className="bg-primary-100 text-white w-[20%] pr-2 rounded-none">
              CONTINUE SHOPPING
            </Button>

            <Button
              onClick={handleCheckout}
              className="bg-primary-100 w-[20%] text-white pr-2 rounded-none ml-3"
            >
              PROCESS TO CHECKOUT
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
