import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { useRouter } from "next/navigation";

const newArrivals = [
  {
    id: 1,
    name: "Gold Ring",
    material: "18k Gold",
    price: 199.99,
    image: "/assets/images/B89C2414.jpg",
  },
  {
    id: 4,
    name: "Sapphire Earrings",
    material: "Gold and Sapphire",
    price: 349.99,
    image: "/assets/images/591683C01_RGB.jpg",
  },
  {
    id: 7,
    name: "Pearl Brooch",
    material: "Gold and Freshwater Pearls",
    price: 89.99,
    image: "/assets/images/798844C01_RGB.jpg",
  },
  {
    id: 8,
    name: "Amethyst Necklace",
    material: "Amethyst and Gold",
    price: 179.99,
    image: "/assets/images/793249C01_RGB.jpg",
  },
  {
    id: 9,
    name: "Topaz Ring",
    material: "18k Gold and Topaz",
    price: 249.99,
    image: "/assets/images/793249C01_RGB.jpg",
  },
];

const bestSeller = [
  {
    id: 2,
    name: "Diamond Necklace",
    material: "Platinum and Diamonds",
    price: 499.99,
    image: "/assets/images/B89C2414.jpg",
  },
  {
    id: 5,
    name: "Emerald Pendant",
    material: "18k Gold and Emerald",
    price: 249.99,
    image: "/assets/images/591683C01_RGB.jpg",
  },
  {
    id: 10,
    name: "Ruby Earrings",
    material: "Gold and Ruby",
    price: 349.99,
    image: "/assets/images/798844C01_RGB.jpg",
  },
  {
    id: 11,
    name: "Platinum Watch",
    material: "Platinum",
    price: 599.99,
    image: "/assets/images/793249C01_RGB.jpg",
  },
  {
    id: 12,
    name: "Opal Bracelet",
    material: "Opal and Sterling Silver",
    price: 159.99,
    image: "/assets/images/793249C01_RGB.jpg",
  },
];

const onSale = [
  {
    id: 3,
    name: "Silver Bracelet",
    material: "Sterling Silver",
    price: 129.99,
    image: "/assets/images/B89C2414.jpg",
  },
  {
    id: 6,
    name: "Rose Gold Watch",
    material: "Rose Gold",
    price: 399.99,
    image: "/assets/images/591683C01_RGB.jpg",
  },
  {
    id: 13,
    name: "Silver Chain",
    material: "Sterling Silver",
    price: 99.99,
    image: "/assets/images/798844C01_RGB.jpg",
  },
  {
    id: 14,
    name: "Black Diamond Ring",
    material: "Gold and Black Diamond",
    price: 449.99,
    image: "/assets/images/793249C01_RGB.jpg",
  },
  {
    id: 15,
    name: "Gold Brooch",
    material: "18k Gold",
    price: 179.99,
    image: "/assets/images/793249C01_RGB.jpg",
  },
];

const Products = () => {
  const [active, setActive] = useState("newArrivals");

  const getProducts = () => {
    switch (active) {
      case "newArrivals":
        return newArrivals;
      case "bestSeller":
        return bestSeller;
      case "onSale":
        return onSale;
      default:
        return newArrivals;
    }
  };

  return (
    <div className="mt-[150px] w-[95%] mx-auto">
      <div className="flex">
        <p className="jost text-[30px] font-normal text-dark100_light500">
          PRODUCTS
        </p>
        <div className="border-b-2 border-primary-100 ml-auto">
          <p className="font-medium text-dark100_light500 text-[14px] mt-5">
            See all
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex mt-4">
          <div
            className={`font-normal jost text-[20px] cursor-pointer mr-12 ${
              active === "newArrivals"
                ? "text-primary-100"
                : "text-dark100_light500"
            }`}
            onClick={() => setActive("newArrivals")}
          >
            NEW ARRIVALS
          </div>
          <div
            className={`font-normal jost text-[20px] cursor-pointer mr-12 ${
              active === "bestSeller"
                ? "text-primary-100"
                : "text-dark100_light500"
            }`}
            onClick={() => setActive("bestSeller")}
          >
            BEST SELLER
          </div>
          <div
            className={`font-normal jost text-[20px] cursor-pointer ${
              active === "onSale" ? "text-primary-100" : "text-dark100_light500"
            }`}
            onClick={() => setActive("onSale")}
          >
            ON SALE
          </div>
        </div>
      </div>
      <Swiper
        spaceBetween={20}
        slidesPerView={4}
        // navigation={true}
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        className="mt-[30px] w-full "
      >
        {getProducts().map((product) => (
          <SwiperSlide key={product.id}>
            <div className="product-card flex flex-col mx-auto w-[82%]">
              <div className="w-[280px] h-[350px]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-dark100_light500 jost text-[20px] font-normal mt-2">
                {product.name.toUpperCase()}
              </p>
              <p className="text-[#939393] text-[16px] font-normal">
                {product.material}
              </p>
              <p className="ml-auto text-[20px] text-primary-100 font-normal">
                {product.price}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Products;
