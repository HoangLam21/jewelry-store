import MyButton from "@/components/shared/button/MyButton";
import React from "react";

const Sale = () => {
  return (
    <div className="bg-[#EDF1F3] dark:bg-dark-200 mt-[150px] flex">
      <div className="w-[70%] flex justify-center items-center">
        <div>
          <div className="flex">
            <hr className="w-16 border-2 dark:border-dark-100 border-light-500 mt-5 mr-2" />
            <p className="text-dark100_light500 jost font-light text-[30px]">
              10% OFF
            </p>
          </div>
          <p className="jost text-[83px] text-dark100_light500 font-light">
            CHRISTMAS SALE
          </p>
          <div className="w-44 mt-5">
            <MyButton
              title="SHOP SALE"
              backgroundColor="background-light500_dark100"
              rounded="none"
              color="text-dark500_light100"
              fontSize="text-sm"
              fontWeight="font-light"
            ></MyButton>
          </div>
        </div>
      </div>
      <div className="30%">
        <img
          src="/assets/images/b8f853f6c53f6d0b10f11436826fd0bb.jpg"
          alt=""
          className="w-[430px] h-[600px] object-cover"
        />
      </div>
    </div>
  );
};

export default Sale;
