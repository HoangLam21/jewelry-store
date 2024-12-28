"use client";
import StaffList from "@/components/admin/staff/StaffList";
import VoucherList from "@/components/admin/voucher/VoucherList";
import MyButton from "@/components/shared/button/MyButton";
import Headers from "@/components/shared/header/Headers";
import InputDate from "@/components/shared/input/InputDate";
import InputEdit from "@/components/shared/input/InputEdit";
import Modal from "@/components/shared/overlay/Modal";
import { useRouter } from "next/navigation";
import router from "next/router";
import React, { useState } from "react";
import { newDate } from "react-datepicker/dist/date_utils";

interface Voucher {
  id: string;
  name: string;
  discount: number;
  expDate: Date;
}

const defaultVoucher: Voucher = {
  id: "",
  name: "",
  discount: 0,
  expDate: new Date(),
};

const Page = () => {
  const router = useRouter();
  const [isAddVoucher, setIsAddVoucher] = useState(false);
  const [newVoucher, setNewVoucher] = useState<Voucher | null>(defaultVoucher);

  const handleExport = () => {
    console.log("Export clicked");
  };
  const handleAddVoucher = () => {
    setIsAddVoucher(true);
  };

  const handleClose = () => {
    setIsAddVoucher(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (newVoucher) {
      setNewVoucher({
        ...newVoucher,
        [e.target.name]: e.target.value,
      });
    }
  };

  const formatDate = (date: Date | string): string => {
    const parsedDate = new Date(date);
    return parsedDate instanceof Date && !isNaN(parsedDate.getTime()) // Check for a valid date
      ? parsedDate.toISOString()
      : ""; // Return empty string if invalid date
  };

  const handleSave = () => {
    console.log("handle upload");
  };

  return (
    <div className="w-full h-full p-4 flex flex-col gap-4">
      <Headers
        title="Voucher"
        firstIcon="clarity:export-line"
        titleFirstButton="Export"
        secondIcon="mingcute:add-line"
        titleSecondButton="Add Voucher"
        onClickFirstButton={handleExport}
        onClickSecondButton={handleAddVoucher}
        type={2}
      ></Headers>
      <VoucherList />
      <Modal isOpen={isAddVoucher} onClose={handleClose} title="Add Voucher">
        <div className="w-full flex flex-col gap-4">
          <InputEdit
            titleInput="Voucher name"
            width="w-full"
            placeholder="Voucher name..."
            value={newVoucher?.name || ""}
            name="name"
            onChange={handleChange}
          />
          <InputEdit
            titleInput="Voucher discount"
            width="w-full"
            placeholder="Voucher discount..."
            value={newVoucher?.discount.toString() || ""}
            name="discount"
            onChange={handleChange}
          />
          <InputDate
            titleInput="Expire date"
            width="w-full"
            value={newVoucher ? formatDate(newVoucher.expDate) : ""}
            onChange={() => {}}
          />
        </div>
        <div className="w-full flex items-end justify-end pt-6">
          <MyButton
            event={handleSave}
            width="w-24"
            title="Add"
            px="px-4 "
            height="h-9"
          />
        </div>
      </Modal>
    </div>
  );
};

export default Page;
