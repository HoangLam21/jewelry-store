"use client";
import ImportList from "@/components/admin/import/ImportList";
import Headers from "@/components/shared/header/Headers";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const router = useRouter();

  const handleExport = () => {
    console.log("Export clicked");
  };

  const handleAddImport = () => {
    router.push(`/admin/import/add`);
  };

  return (
    <div className="w-full h-full p-4 flex flex-col gap-4">
      <Headers
        title="Import"
        firstIcon="clarity:export-line"
        titleFirstButton="Export"
        secondIcon="mingcute:add-line"
        titleSecondButton="Add Import"
        onClickFirstButton={handleExport}
        onClickSecondButton={handleAddImport}
        type={2}
      ></Headers>
      <ImportList />
    </div>
  );
};

export default Page;
