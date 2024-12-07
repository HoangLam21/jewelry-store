"use client";
import StaffList from "@/components/admin/staff/StaffList";
import Headers from "@/components/shared/Headers";
import React from "react";

const Page = () => {
  const handleExport = () => {
    console.log("Export clicked");
  };

  const handleAddStaff = () => {
    console.log("Add Staff clicked");
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
