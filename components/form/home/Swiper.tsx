import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import MyButton from "@/components/shared/button/MyButton";
import Image from "next/image";
import { useRouter } from "next/navigation";

const fakeData = [
  {
    id: "1",
    title: "NEW ITEMS",
    description: "PANDORA MOMENTS DISNEY BEISENDER STITCH",
    smallImage: "/assets/images/798844C01_RGB.jpg",
    largeImage: "/assets/images/b8f853f6c53f6d0b10f11436826fd0bb.jpg",
  },
  {
    id: "2",

    title: "NEW ITEMS",
    description: "PANDORA MOMENTS NEW CHARM BRACELET",
    smallImage: "/assets/images/798844C01_RGB.jpg",
    largeImage: "/assets/images/b8f853f6c53f6d0b10f11436826fd0bb.jpg",
  },
  {
    id: "3",

    title: "NEW ITEMS",
    description: "PANDORA MOMENTS DISNEY BEISENDER SPECIAL",
    smallImage: "/assets/images/798844C01_RGB.jpg",
    largeImage: "/assets/images/b8f853f6c53f6d0b10f11436826fd0bb.jpg",
  },
];

const swiper = () => {
  const router = useRouter();

  const handleNavigateProductDetail = (id: string) => {
    router.push(`/product/${id}`);
  };
  return (
    <div>
      <Swiper
        cssMode={true}
        navigation={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="w-[95%] h-auto p-2 overflow-hidden "
      >
        {fakeData.map((item, index) => (
          <SwiperSlide className="px-[3%]" key={index}>
            <div className="w-[90%] flex justify-between items-center">
              <div className="flex justify-center w-[50%]">
                <div>
                  <p className="jost text-[83px] text-dark500_light100 font-light">
                    {item.title}
                  </p>
                  <p className="jost text-[20px] font-normal text-primary-100 w-[70%] mt-2">
                    {item.description}
                  </p>
                  <div className="w-44 mt-5">
                    <MyButton
                      title="SHOP NOW"
                      background="background-light500_dark100"
                      rounded="none"
                      text_color="text-dark500_light100"
                      text="text-sm"
                      event={function (): void {
                        throw new Error("Function not implemented.");
                      }}
                      width={""}
                    ></MyButton>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Image
                  src={item.smallImage}
                  alt=""
                  width={256}
                  height={256}
                  className="w-[256px] h-[256px] rounded-full absolute mt-[339px] mr-80"
                  onClick={() =>
                    handleNavigateProductDetail(item.id.toString())
                  }
                ></Image>
                <Image
                  src={item.largeImage}
                  alt=""
                  width={420}
                  height={595}
                  className="w-[420px] h-[595px] rounded-t-full"
                  onClick={() =>
                    handleNavigateProductDetail(item.id.toString())
                  }
                ></Image>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default swiper;
