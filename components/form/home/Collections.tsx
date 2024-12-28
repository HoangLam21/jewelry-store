import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

const collections = [
  {
    id: 1,
    image: "/assets/images/793249C01_RGB.jpg",
  },
  {
    id: 2,
    image: "/assets/images/28510440be4999e2266948c66ba81f15.jpg",
  },
  {
    id: 3,
    image: "/assets/images/592548C01_RGB.jpg",
  },
  {
    id: 4,
    image: "/assets/images/70f099a304d80cdcd6aba39e245872c7.jpg",
  },
  {
    id: 5,
    image: "/assets/images/193569C00_RGB.jpg",
  },
  {
    id: 6,
    image: "/assets/images/793249C01_RGB.jpg",
  },
];

// Chia mảng collections thành các nhóm 6 phần tử mỗi nhóm
const chunkCollections = (arr: any, size: any) => {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

const Collections = () => {
  const chunkedCollections = chunkCollections(collections, 6); // Chia mảng thành nhóm 6

  return (
    <div className="mt-[150px] mx-auto bg-[#EDF1F3] dark:bg-dark-200 pb-16">
      <div className="flex w-[95%] mx-auto pt-2">
        <p className="jost text-[30px] font-normal text-dark100_light500">
          CATEGORIES
        </p>
        <div className="border-b-2 border-primary-100 ml-auto">
          <p className="font-medium text-dark100_light500 text-[14px] mt-5">
            See all
          </p>
        </div>
      </div>
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        className="mt-[30px] px-[10%] w-full mx-auto flex justify-center"
      >
        {chunkedCollections.map((chunk, index) => (
          <SwiperSlide key={index} className="w-full mx-auto">
            <div className="flex flex-wrap gap-[22px] justify-center w-full mx-auto">
              {/* Hàng 1 */}
              <div className="w-full flex justify-center">
                <div className="flex justify-center items-center w-[250px] h-[250px] bg-white dark:bg-dark-400">
                  <img
                    src={chunk[0]?.image}
                    alt=""
                    className="w-[230px] h-[230px] object-cover"
                  />
                </div>
                <div className="flex justify-center items-center w-[250px] mx-[22px] h-[250px] bg-white dark:bg-dark-400">
                  <img
                    src={chunk[1]?.image}
                    alt=""
                    className="w-[230px] h-[230px] object-cover"
                  />
                </div>
                <div className="flex justify-center items-center w-[522px] h-[250px] bg-white dark:bg-dark-400">
                  <img
                    src={chunk[2]?.image}
                    alt=""
                    className="w-[502px] h-[230px] object-cover"
                  />
                </div>
              </div>

              {/* Hàng 2 */}
              <div className="w-full flex justify-center">
                <div className="flex justify-center items-center w-[522px] h-[250px] bg-white dark:bg-dark-400">
                  <img
                    src={chunk[3]?.image}
                    alt=""
                    className="w-[502px] h-[230px] object-cover"
                  />
                </div>
                <div className="flex justify-center items-center w-[250px] h-[250px] mx-[22px] bg-white dark:bg-dark-400">
                  <img
                    src={chunk[4]?.image}
                    alt=""
                    className="w-[230px] h-[230px] object-cover"
                  />
                </div>
                <div className="flex justify-center items-center w-[250px] h-[250px] bg-white dark:bg-dark-400">
                  <Image
                    src={chunk[5]?.image}
                    alt=""
                    width={230}
                    height={230}
                    className="w-[230px] h-[230px] object-cover"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Collections;
