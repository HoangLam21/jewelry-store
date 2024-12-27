"use client";
import AddProduct from "@/components/admin/product/AddProduct";
import ProductList from "@/components/admin/product/ProductList";
import StaffList from "@/components/admin/staff/StaffList";
import Headers from "@/components/shared/Headers";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Page = () => {
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [openAddVoucher, setOpenAddVoucher] = useState(false);
  const router = useRouter();
  const handleAddVoucher = () => {
    setOpenAddVoucher(true);
  };

  const handleAddProduct = () => {
    setOpenAddProduct(true);
  };

  const handleBack = (value: boolean) => {
    setOpenAddProduct(value);
    setOpenAddVoucher(value);
  };
  return (
    <>
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

      {openAddProduct && <AddProduct onBack={handleBack} />}
    </>
  );
};

export default Page;
