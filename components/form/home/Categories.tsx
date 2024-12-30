import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

const jewelryCategories = [
  {
    id: 1,
    name: "Rings",
    image: "/assets/images/793249C01_RGB.jpg",
  },
  {
    id: 2,
    name: "Necklaces",
    image: "/assets/images/B89C2414.jpg",
  },
  {
    id: 3,
    name: "Bracelets",
    image: "/assets/images/193569C00_RGB.jpg",
  },
  {
    id: 4,
    name: "Earrings",
    image: "/assets/images/793249C01_RGB.jpg",
  },
  {
    id: 5,
    name: "Watches",
    image: "/assets/images/793249C01_RGB.jpg",
  },
  {
    id: 6,
    name: "Brooches",
    image: "/assets/images/793249C01_RGB.jpg",
  },
  {
    id: 7,
    name: "Charms",
    image: "/assets/images/793249C01_RGB.jpg",
  },
];

const Categories = () => {
  return (
    <div className="mt-[150px] w-[95%] mx-auto">
      <div className="flex">
        <p className="jost text-[30px] font-normal text-dark100_light500">
          CATEGORIES
        </p>
        <div className="border-b-2 border-primary-100 ml-auto">
          <p className="font-medium text-dark100_light500 text-[14px] mt-5">
            See all
          </p>
        </div>
      </div>
      <Image
        src="https://i.pinimg.com/736x/93/8f/90/938f9041e18dcfda399d73f04d61dc68.jpg"
        alt=""
        width={200}
        height={200}
      />
      <Swiper
        spaceBetween={20}
        slidesPerView={5}
        // navigation={true}
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        className="mt-[30px]"
      >
        {jewelryCategories.map((category) => (
          <SwiperSlide key={category.id} className="">
            <div className=" flex flex-col items-center justify-center !important">
              <img
                src={category.image}
                alt={category.name}
                width={200}
                height={200}
                className="w-[200px] h-[200px] object-cover rounded-full !important"
              />
              <p className="text-lg jost capitalize mt-2 text-dark100_light500">
                {category.name.toUpperCase()}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Categories;
