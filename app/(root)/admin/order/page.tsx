"use client";
import OrderList from "@/components/admin/order/OrderList";
import Headers from "@/components/shared/header/Headers";
import { useRouter } from "next/navigation";
import React from "react";
import * as XLSX from "xlsx";

const Page = () => {
  const router = useRouter();

  const handleExport = () => {
    console.log("Export clicked");
  };

  const handleAddOrder = () => {
    router.push(`/admin/order/add`);
  };

  return (
    <div className="w-full h-full p-4 flex flex-col gap-4">
      <Headers
        title="Order"
        firstIcon="clarity:export-line"
        titleFirstButton="Export"
        secondIcon="mingcute:add-line"
        titleSecondButton="Add Order"
        onClickFirstButton={handleExport}
        onClickSecondButton={handleAddOrder}
        type={2}
      ></Headers>
      <OrderList />
    </div>
  );
};

export default Page;
