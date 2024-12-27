"use client";
import ProviderList from "@/components/admin/provider/ProviderList";
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

  const handleAddProvider = () => {
    router.push(`/admin/provider/add`);
  };
  return (
    <div className="w-full h-full p-4 flex flex-col gap-4">
      <Headers
        title="Provider"
        firstIcon="clarity:export-line"
        titleFirstButton="Export"
        secondIcon="mingcute:add-line"
        titleSecondButton="Add Provider"
        onClickFirstButton={handleExport}
        onClickSecondButton={handleAddProvider}
        type={2}
      ></Headers>
      <ProviderList />
    </div>
  );
};

export default Page;
