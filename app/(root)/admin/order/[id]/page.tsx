"use client"; // Đảm bảo dòng này là dòng đầu tiên

import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import Headers from "@/components/shared/Headers";
import { useRouter } from "next/navigation";
import OrderInfomation from "@/components/admin/order/OrderInfomation";
import CustomerInfomation from "@/components/admin/order/CustomerInfomation";

interface Params {
  id: string;
}
const Page = ({ params }: { params: Params }) => {
  const { id } = params;
  const router = useRouter();

  const handleExport = () => {
    console.log("Export clicked");
  };

  const handleAddStaff = () => {
    router.push(`/admin/staff/add`);
  };

  return (
    <div className="text-dark100_light500 background-light700_dark400 flex size-full flex-col p-4">
      <Headers
        title="Staff Detail"
        firstIcon="iconoir:cancel"
        titleFirstButton="Cancel"
        secondIcon="mingcute:add-line"
        titleSecondButton="Add Staff"
        onClickFirstButton={handleExport}
        onClickSecondButton={handleAddStaff}
      ></Headers>
      <div className="w-full rounded-[10px] p-4 shadow-sm">
        <OrderInfomation />
        <CustomerInfomation />
      </div>
    </div>
  );
};

export default Page;
