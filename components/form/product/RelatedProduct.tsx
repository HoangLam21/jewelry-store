import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

const jewelryRelatedProduct = [
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

const RelatedProduct = () => {
  return (
    <div className="mt-[150px] w-[95%] mx-auto">
      <div className="flex">
        <p className="jost text-[30px] font-normal text-dark100_light500">
          RELATED PRODUCTS
        </p>
        <div className="border-b-2 border-primary-100 ml-auto">
          <p className="font-medium text-dark100_light500 text-[14px] mt-5">
            See all
          </p>
        </div>
      </div>
      <Swiper
        spaceBetween={20}
        slidesPerView={5}
        // navigation={true}
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        className="mt-[30px]"
      >
        {jewelryRelatedProduct.map((category) => (
          <SwiperSlide key={category.id}>
            <div className="category-card flex flex-col items-center">
              <div className="w-[280px] h-[350px] ">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>

              <p className=" text-lg jost capitalize font-nomal mt-2 text-dark100_light500">
                {category.name.toUpperCase()}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RelatedProduct;
