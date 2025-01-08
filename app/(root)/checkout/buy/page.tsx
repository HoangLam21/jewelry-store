"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import ShippingInfomation from "@/components/form/checkout/ShippingInfomation";
import { useRouter } from "next/navigation";
import { useBuyNow } from "@/contexts/BuyNowContext";
import { CreateOrder } from "@/dto/OrderDTO";
import { newDate } from "react-datepicker/dist/date_utils";
import { formatCurrency } from "@/lib/utils";

function addDays(days: number) {
  const result = new Date();
  result.setDate(result.getDate() + days);
  return result;
}

export default function Page() {
  const { stateBuyNow } = useBuyNow();
  const [totalOriginalPrice, setTotalOriginalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [totalFinalPrice, setTotalFinalPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  const [city, setCity] = useState("");
  const [shippingFee, setShippingFee] = useState(0);
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [note, setNote] = useState("");
  const router = useRouter();

  useEffect(() => {
    const { originalPrice, discount, finalPrice } = stateBuyNow.items.reduce(
      (totals, item) => {
        const selectedVariant = item.variants.find(
          (variant) => variant.material === item.selectedMaterial
        );

        const sizeStock = selectedVariant?.sizes.find(
          (size: any) => size.size === item.selectedSize
        );

        const basePrice = item.cost * item.quantity;

        const addOnPrice = (selectedVariant?.addOn || 0) * item.quantity;

        const voucher = item.vouchers?.[0];
        const voucherDiscount = voucher
          ? (basePrice + addOnPrice) * (voucher.discount / 100)
          : 0;

        return {
          originalPrice: totals.originalPrice + basePrice + addOnPrice,
          discount: totals.discount + voucherDiscount,
          finalPrice:
            totals.finalPrice + (basePrice + addOnPrice - voucherDiscount)
        };
      },
      { originalPrice: 0, discount: 0, finalPrice: 0 }
    );

    setTotalOriginalPrice(originalPrice);
    setTotalDiscount(discount);
    setTotalFinalPrice(finalPrice);
  }, [stateBuyNow.items]);

  const handleOrder = async () => {
    const details = stateBuyNow.items.map((item: any) => ({
      id: item._id,
      material: item.selectedMaterial,
      size: item.selectedSize,
      unitPrice: item.cost,
      quantity: item.quantity,
      discount: item.vouchers?.[0]?.discount || "0"
    }));

    const orderData: CreateOrder = {
      cost: totalFinalPrice + shippingFee,
      discount: stateBuyNow.items[0].vouchers[0].discount,
      details,
      status: "pending",
      shippingMethod: deliveryMethod,
      ETD: addDays(3),
      customer: "6776bd0974de08ccc866a4ab",
      staff: "6776bdee74de08ccc866a4be"
    };

    try {
      console.log("vo");
      const response = await fetch("/api/order/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        alert("Order can't create. Please try again.");
      }
      alert("Order created!");
      const data = await response.json();
      console.log("Order created:", data);
      router.push("/");
    } catch (error: any) {
      console.error("Error creating order:", error.message);
    }
  };

  console.log(stateBuyNow);

  useEffect(() => {
    const calculateShippingFee = () => {
      if (deliveryMethod === "fast") return 5000;
      if (deliveryMethod === "express") return 30000;
      return paymentMethod === "vnpay" ? 25000 : 30000;
    };
    setShippingFee(calculateShippingFee());
  }, [deliveryMethod, paymentMethod, city]);

  const calculateGrandTotal = () => totalFinalPrice + shippingFee;

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
        <div className="lg:w-[45%] w-full p-5 rounded-lg mt-8 lg:mt-0">
          <h2 className="text-[30px] font-normal jost mb-5">
            SHIPPING INFOMATION
          </h2>
          <form className="flex flex-col space-y-4">
            <ShippingInfomation
              city={city}
              setCity={setCity}
              setAddress={setAddress}
              setPhoneNumber={setPhoneNumber}
              setNote={setNote}
            />
            <button
              type="submit"
              onClick={handleOrder}
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
          {stateBuyNow.items.map((item: any) => (
            <div
              key={item._id}
              className="flex items-center justify-between mb-4 border-b pb-4"
            >
              <Image
                src={item.files[0].url}
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
                {formatCurrency(item.cost * item.quantity)}
              </span>
            </div>
          ))}

          <div className="mt-6">
            <div className="text-[18px] font-normal flex justify-between mb-2">
              <span>Total Original Price:</span>
              <span>{formatCurrency(totalOriginalPrice)}</span>
            </div>
            <div className="text-[18px] font-normal flex justify-between mb-2">
              <span>Total Discount:</span>
              <span className="text-red-500">
                -{formatCurrency(totalDiscount)}
              </span>
            </div>
            <div className="text-[18px] font-medium flex justify-between mb-4">
              <span>Total Final Price:</span>
              <span>{formatCurrency(totalFinalPrice)}</span>
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
              <option value="cod">Cash on Delivery (30k shipping fee)</option>
              <option value="vnpay">VNPay (25k shipping fee)</option>
            </select>
          </div>

          <div className="mt-6">
            <label className="block mb-2 text-[18px] font-medium">
              Delivery Method:
            </label>
            <div className="space-y-2">
              <div>
                <input
                  type="radio"
                  id="standard"
                  name="delivery"
                  value="standard"
                  checked={deliveryMethod === "standard"}
                  onChange={(e) => setDeliveryMethod(e.target.value)}
                />
                <label htmlFor="standard" className="ml-2">
                  Standard Delivery (No extra fee)
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="fast"
                  name="delivery"
                  value="fast"
                  checked={deliveryMethod === "fast"}
                  onChange={(e) => setDeliveryMethod(e.target.value)}
                />
                <label htmlFor="fast" className="ml-2">
                  Fast Delivery (+5k shipping fee)
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="express"
                  name="delivery"
                  value="express"
                  checked={deliveryMethod === "express"}
                  onChange={(e) => setDeliveryMethod(e.target.value)}
                  disabled={city.toLowerCase() !== "ho chi minh"}
                />
                <label htmlFor="express" className="ml-2">
                  Express Delivery (30k shipping fee, only available in Ho Chi
                  Minh City)
                </label>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="text-[18px] font-medium flex justify-between">
              <span>Shipping Fee:</span>
              <span>₫{shippingFee.toLocaleString()}</span>
            </div>
            <div className="text-[18px] font-semibold flex justify-between mt-4">
              <span>Grand Total:</span>
              <span>₫{calculateGrandTotal().toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
