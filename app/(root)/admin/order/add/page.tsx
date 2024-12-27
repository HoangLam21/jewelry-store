"use client";
import AddStaffInformation from "@/components/admin/staff/AddStaffInformation";
import Headers from "@/components/shared/Headers";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const router = useRouter();
  const handleCancel = () => {
    router.back();
  };

  const handleAddStaff = () => {
    router.push(`/admin/staff/add`);
  };
  return (
    <div className="w-full h-full p-4 flex flex-col gap-4">
      <Headers
        title="Add Order"
        firstIcon="iconoir:cancel"
        titleFirstButton="Cancel"
        secondIcon="mingcute:add-line"
        titleSecondButton="Add Order"
        onClickFirstButton={handleCancel}
        onClickSecondButton={handleAddStaff}
      ></Headers>
      <AddStaffInformation />
    </div>
  );
};

export default Page;
