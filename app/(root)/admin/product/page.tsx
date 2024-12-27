"use client";
import ProductList from "@/components/admin/product/ProductList";
import StaffList from "@/components/admin/staff/StaffList";
import Headers from "@/components/shared/Headers";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const router = useRouter();
  const handleExport = () => {
    console.log("Export clicked");
  };

  const handleAddProduct = () => {
    router.push(`/admin/product/add`);
  };

  const handleAddVoucher = () => {};
  return (
    <div className="w-full h-full p-4 flex flex-col gap-4">
      <Headers
        title="Products"
        firstIcon="clarity:export-line"
        titleFirstButton="Add voucher"
        secondIcon="mingcute:add-line"
        titleSecondButton="Add Products"
        onClickFirstButton={handleAddVoucher}
        onClickSecondButton={handleAddProduct}
        type={2}
      ></Headers>
      <ProductList />
    </div>
  );
};

export default Page;
