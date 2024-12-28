"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Page() {
  const { state } = useCart();

  const [totalOriginalPrice, setTotalOriginalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [totalFinalPrice, setTotalFinalPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  useEffect(() => {
    // Tính tổng giá gốc
    const originalPrice = state.items.reduce(
      (sum, item) => sum + item.cost * item.quantity,
      0
    );

    // Giả sử tổng giảm giá là 10% của giá gốc
    const discount = originalPrice * 0.1;

    // Tính tổng giá cuối cùng sau giảm giá
    const finalPrice = originalPrice - discount;

    setTotalOriginalPrice(originalPrice);
    setTotalDiscount(discount);
    setTotalFinalPrice(finalPrice);
  }, [state.items]);

  return (
    <>
      <div className="bg-[#EDF1F3]  dark:bg-dark-200 h-[250px] flex justify-center items-center">
        <div>
          <h1 className="text-dark100_light500 font-light text-[84px]">
            CHECKOUT
          </h1>
          <div className="flex justify-center items-center">
            <Link href="/">
              <span className="text-dark100_light500">Home</span>
            </Link>
            <Icon
              icon="solar:alt-arrow-right-line-duotone"
              width="24"
              height="16"
            />
            <Link href="/checkout">
              <span className="text-primary-100">Checkout</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex text-dark100_light500 flex-col lg:flex-row justify-between w-full px-10 pb-5">
        <div className="lg:w-[45%] w-full bg-white dark:bg-dark-300 p-5 rounded-lg mt-8 lg:mt-0">
          <h2 className="text-[30px] font-normal jost mb-5">
            SHIPPING INFOMATION
          </h2>
          <form className="flex flex-col space-y-4">
            <label className="font-light text-[16px]">
              Name<span className="text-primary-100">*</span>
            </label>
            <input
              type="text"
              placeholder="Name"
              className="w-full p-3 border  bg-transparent dark:bg-dark-400"
            />
            <label className="font-light mt-2 text-[16px]">
              Country / Region<span className="text-primary-100">*</span>
            </label>
            <input
              type="text"
              placeholder="Country"
              className="w-full p-3 border  bg-transparent dark:bg-dark-400"
            />
            <label className="font-light mt-2 text-[16px]">
              Town / City<span className="text-primary-100">*</span>
            </label>
            <input
              type="text"
              placeholder="City"
              className="w-full p-3 border  bg-transparent dark:bg-dark-400"
            />
            <label className="font-light mt-2 text-[16px]">
              District<span className="text-primary-100">*</span>
            </label>
            <input
              type="text"
              placeholder="District"
              className="w-full p-3 border  bg-transparent dark:bg-dark-400"
            />
            <label className="font-light mt-2 text-[16px]">
              Street address<span className="text-primary-100">*</span>
            </label>
            <input
              type="text"
              placeholder="Street Address"
              className="w-full p-3 border  bg-transparent dark:bg-dark-400"
            />
            <label className="font-light mt-2 text-[16px]">
              Phone<span className="text-primary-100">*</span>
            </label>
            <input
              type="text"
              placeholder="Phone"
              className="w-full p-3 border  bg-transparent dark:bg-dark-400"
            />
            <label className="font-light mt-2 text-[16px]">
              Email<span className="text-primary-100">*</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border  bg-transparent dark:bg-dark-400"
            />
            <label className="font-light mt-2 text-[16px]">
              Note<span className="text-primary-100"></span>
            </label>
            <textarea
              placeholder="Note"
              rows={4}
              className="w-full p-3 border mb-2 bg-transparent dark:bg-dark-400"
            ></textarea>
            <button
              type="submit"
              className="bg-primary-100 text-white p-3  hover:bg-primary-200"
            >
              Confirm & Proceed to Payment
            </button>
          </form>
        </div>
        <div className="lg:w-[50%] w-full p-5 rounded-lg">
          <h2 className="text-[30px] font-normal jost mb-10">
            ORDER INFOMATION
          </h2>
          {state.items.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between mb-4 border-b pb-4"
            >
              <Image
                src={item.images}
                alt={item.name}
                width={100}
                height={120}
                className="object-cover h-40 rounded"
              />
              <div className="ml-4">
                <h3 className="text-[18px] font-medium">{item.name}</h3>
                <span className="text-[16px] text-gray-500">
                  Quantity: {item.quantity}
                </span>
              </div>
              <span className="text-[18px] font-semibold text-primary-100">
                ${item.cost * item.quantity}
              </span>
            </div>
          ))}

          <div className="mt-6">
            <div className="text-[18px] font-normal flex justify-between mb-2">
              <span>Total Original Price:</span>
              <span>${totalOriginalPrice.toFixed(2)}</span>
            </div>
            <div className="text-[18px] font-normal flex justify-between mb-2">
              <span>Total Discount:</span>
              <span className="text-red-500">-${totalDiscount.toFixed(2)}</span>
            </div>
            <div className="text-[18px] font-medium flex justify-between mb-4">
              <span>Total Final Price:</span>
              <span>${totalFinalPrice.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-6">
            <label className="block mb-2 text-[18px] font-medium">
              Payment Method:
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full p-3 border rounded-none bg-transparent "
            >
              <option value="cod">Cash on Delivery (+30k shipping fee)</option>
              <option value="vnpay">VNPay (+25k shipping fee)</option>
            </select>
          </div>

          {/* Tổng tiền sau phí ship */}
          <div className="mt-6">
            <div className="text-[18px] font-medium flex justify-between">
              <span>Shipping Fee:</span>
              <span>{paymentMethod === "vnpay" ? "+25k" : "+30k"}</span>
            </div>
            <div className="text-[18px] font-semibold flex justify-between mt-4">
              <span>Grand Total:</span>
              <span>
                {paymentMethod === "vnpay"
                  ? `₫${(totalFinalPrice + 25000).toFixed(2)}`
                  : `₫${(totalFinalPrice + 30000).toFixed(2)}`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
