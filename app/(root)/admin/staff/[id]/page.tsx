"use client";
import StaffInformation from "@/components/admin/staff/StaffInformation";
import Headers from "@/components/shared/Headers";
import { useRouter } from "next/navigation"; // Đúng cách sử dụng trong App Router
import React from "react";

const Page = () => {
  const router = useRouter();
  const handleExport = () => {
    console.log("Export clicked");
  };

  const handleAddStaff = () => {
    router.push(`/admin/staff/add`);
  };
  return (
    <div className="w-full h-full p-4 flex flex-col gap-4">
      <Headers
        title="Staff Detail"
        firstIcon="iconoir:cancel"
        titleFirstButton="Cancel"
        secondIcon="mingcute:add-line"
        titleSecondButton="Add Staff"
        onClickFirstButton={handleExport}
        onClickSecondButton={handleAddStaff}
      ></Headers>
      <StaffInformation />
    </div>
  );
};

export default Page;
