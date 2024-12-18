"use client";
import StaffList from "@/components/admin/staff/StaffList";
import Headers from "@/components/shared/Headers";
import { useRouter } from "next/navigation";
import router from "next/router";
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
        title="Staff"
        firstIcon="clarity:export-line"
        titleFirstButton="Export"
        secondIcon="mingcute:add-line"
        titleSecondButton="Add Staff"
        onClickFirstButton={handleExport}
        onClickSecondButton={handleAddStaff}
      ></Headers>
      <StaffList />
    </div>
  );
};

export default Page;
