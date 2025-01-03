"use client";
import React, { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Swiper from "@/components/form/home/Swiper";
import FeaturesSession from "@/components/form/home/FeaturesSession";
import Categories from "@/components/form/home/Categories";
import Products from "@/components/form/home/Products";
import Collections from "@/components/form/home/Collections";
import Sale from "@/components/form/home/Sale";
import { fetchProducts } from "@/lib/services/product.service";
import { getCustomerById } from "@/lib/services/customer.service";

export default function Page() {
  const [productsData, setProductsData] = useState<any[]>([]);
  useEffect(() => {
    const fetchAndSaveUser = async () => {
      try {
        const userId = "6776bd0974de08ccc866a4ab";
        if (userId) {
          const customerData = await getCustomerById(userId);
          localStorage.setItem("userData", JSON.stringify(customerData));
          console.log("User data saved to localStorage:", customerData);
        }
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    fetchAndSaveUser();
  }, []);
  useEffect(() => {
    let isMounted = true;
    const getAllProducts = async () => {
      try {
        const data = await fetchProducts();
        if (isMounted) {
          setProductsData(data);
        }
      } catch (error) {
        console.error("Error loading posts:", error);
      }
    };
    getAllProducts();
    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <>
      <div className="px-[2%]">
        <Swiper productsData={productsData} />
        <FeaturesSession />
        <Categories />
      </div>

      <Sale />
      <div className="px-[2%]">
        <Products productsData={productsData} />
        <Collections />
      </div>
    </>
  );
}
