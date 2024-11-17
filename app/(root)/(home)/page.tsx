"use client";
import React, { useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Swiper from "@/components/form/home/swiper";
import FeaturesSession from "@/components/form/home/FeaturesSession";
import Categories from "@/components/form/home/Categories";
import Products from "@/components/form/home/Products";

export default function Page() {
  return (
    <div className="px-[2%]">
      <Swiper />
      <FeaturesSession />
      <Categories />
      <Products />
    </div>
  );
}
