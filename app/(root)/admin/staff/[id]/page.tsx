"use client";
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
        title="Staff Detail"
        firstIcon="iconoir:cancel"
        titleFirstButton="Cancel"
        secondIcon="mingcute:add-line"
        titleSecondButton="Add Staff"
        onClickFirstButton={handleExport}
        onClickSecondButton={handleAddStaff}
      ></Headers>
    </div>
  );
};

export default Page;
