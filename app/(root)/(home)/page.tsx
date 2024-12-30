"use client";
import React, { useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Swiper from "@/components/form/home/Swiper";
import FeaturesSession from "@/components/form/home/FeaturesSession";
import Categories from "@/components/form/home/Categories";
import Products from "@/components/form/home/Products";
import Collections from "@/components/form/home/Collections";
import Sale from "@/components/form/home/Sale";
import Image from "next/image";

export default function Page() {
  return (
    <>
      <div className="px-[2%]">
        <Swiper />
        <FeaturesSession />
        <Categories />
      </div>

      <Sale />
      <div className="px-[2%]">
        <Products />
        <Collections />
      </div>
    </>
  );
}
