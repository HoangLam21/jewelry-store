"use client";
import { ProductsData } from "@/constants/data";
import { Navigation, Pagination } from "swiper/modules";

import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import MyButton from "@/components/shared/button/MyButton";
import DetailProduct from "@/components/form/product/DetailProduct";
import Categories from "@/components/form/home/Categories";
import RelatedProduct from "@/components/form/product/RelatedProduct";

interface ImageInfo {
  url: string;
  fileName: string;
}

interface Product {
  id: string;
  image: string;
  imageInfo: ImageInfo[];
  productName: string;
  price: string;
  material: string;
  description: string;
  vouchers: string;
  provider: string;
  size: string;
  color: string;
  category: string;
  quantity: number;
}

const page = () => {
  const { id } = useParams<{ id: string }>() as { id: string };
  const [product, setProduct] = useState<Product | null>(null); // Store product data safely
  const [updateCart, setUpdateCart] = useState<Product>(); // State to store products in the cart
  const [activeSize, setActiveSize] = useState(""); // Trạng thái cho size
  const [activeMaterial, setActiveMaterial] = useState(""); // Trạng thái cho material

  const sizes = ["S", "M", "L"];
  const materials = ["SILVER", "GOLD"];

  useEffect(() => {
    if (id) {
      const foundItem = ProductsData.find((item) => item.id === id);
      if (foundItem) {
        setProduct(foundItem);
      }
    }
  }, [id]);

  if (!product) {
    return <p>Loading provider information...</p>;
  }

  const handleQuantityChange = (newQuantity: string | number) => {
    let quantity =
      typeof newQuantity === "string" ? parseInt(newQuantity, 10) : newQuantity;

    if (isNaN(quantity) || quantity < 1) {
      quantity = 1; // Đặt giá trị tối thiểu là 1
    }

    const updatedItem = { ...product, quantity }; // Cập nhật số lượng
    setUpdateCart(updatedItem); // Gửi thông tin mới về cho giỏ hàng
    setProduct(updatedItem); // Cập nhật trực tiếp sản phẩm trong component
  };

  const handleAddToCart = () => {
    console.log("add to cart");
  };

  return (
    <div className="w-full h-full p-4 flex flex-col gap-16">
      <div className="w-full flex gap-8 h-[692px]">
        <div className="w-1/2 h-[692px] items-center">
          {/* <Swiper
            spaceBetween={0} // Không có khoảng cách giữa các slide
            slidesPerView={1} // Chỉ hiển thị 1 slide tại một thời điểm
            pagination={{ clickable: true }} // Thêm dấu chấm để chuyển slide
            navigation // Thêm nút điều hướng
            modules={[Navigation, Pagination]}
            className="w-full h-full" // Swiper chiếm toàn bộ không gian
          >
            {product.imageInfo.map((item, index) => (
              <SwiperSlide key={index} className="w-full h-full">
                <Image
                  src={"/assets/images/193569C00_RGB.jpg"}
                  alt="product image"
                  width={800}
                  height={520}
                  className="w-full h-full object-cover" // Ảnh chiếm toàn bộ không gian
                />
              </SwiperSlide>
            ))}
          </Swiper> */}
          <Image
            src={"/assets/images/193569C00_RGB.jpg"}
            alt="product image"
            width={692}
            height={692}
            className="w-full h-[692px] object-cover rounded-md" // Ảnh chiếm toàn bộ không gian
          />
        </div>

        <div className="w-1/2 flex flex-col gap-6">
          <p className="text-[30px] ">{product.productName}</p>
          {/* <p className="text-[30px] ">{product.productName}</p> */}
          <p className="text-[40px] text-primary-100 ">{product.price}</p>
          <p className="text-[16px]">{product.description}</p>
          <p className="underline text-[20px]">SIZE</p>
          <div className="flex gap-4">
            {sizes.map((size) => (
              <button
                key={size}
                className={`w-12 h-8 border rounded-md text-[16px] ${
                  activeSize === size
                    ? "bg-primary-100 text-white"
                    : "bg-white text-black"
                }`}
                onClick={() => setActiveSize(size)}
              >
                {size}
              </button>
            ))}
          </div>

          <p className="underline text-[20px]">MATERIAL</p>
          <div className="flex gap-4">
            {materials.map((material) => (
              <button
                key={material}
                className={`w-16 h-10 border rounded-md  ${
                  activeMaterial === material
                    ? "bg-primary-100 text-white"
                    : "bg-white text-black"
                }`}
                onClick={() => setActiveMaterial(material)}
              >
                {material}
              </button>
            ))}
          </div>
          <p className="text-[16px]">{product.quantity} in stocks</p>
          <div className="flex w-2/5 gap-2">
            <button
              onClick={() =>
                handleQuantityChange((product.quantity - 1).toString())
              }
              className="w-11 h-11 border border-gray-300 rounded-md self-center text-[16px] focus:outline-none text-center"
            >
              -
            </button>
            <input
              type="text"
              value={product.quantity}
              onChange={(e) => handleQuantityChange(e.target.value)}
              min={1}
              className="w-20 h-11 border border-gray-300 rounded-md self-center text-[16px] focus:outline-none text-center"
            />
            <button
              onClick={() =>
                handleQuantityChange((product.quantity + 1).toString())
              }
              className="w-11 h-11 border border-gray-300 rounded-md self-center text-[16px] focus:outline-none text-center"
            >
              +
            </button>
          </div>
          <div className="w-full flex justify-between gap-4 mt-4">
            <MyButton
              title="BUY NOW"
              width="w-1/2"
              event={handleAddToCart}
              background="bg-primary-100"
              text_color="text-white"
            />
            <MyButton
              title="ADD TO CART"
              width="w-1/2"
              event={handleAddToCart}
              background="bg-black"
              text_color="text-white"
            />
          </div>
        </div>
      </div>

      <DetailProduct item={product} />
      <RelatedProduct />
    </div>
  );
};

export default page;
