"use client";
import TitleSession from "@/components/shared/label/TitleSession";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { StaffData } from "@/constants/data";
import Image from "next/image";
import LabelInformation from "@/components/shared/label/LabelInformation";
import MyButton from "@/components/shared/button/MyButton";
import InputEdit from "@/components/shared/input/InputEdit";
import InputDate from "@/components/shared/input/InputDate";
import InputSelection from "@/components/shared/input/InputSelection";

interface SaleInvoice {
  id: string;
  customer: string;
  createDate: Date;
  note: string;
  total: number;
  status: number;
}

interface Staff {
  id: string;
  gender: string;
  position: string;
  earning: number;
  phone: string;
  fullname: string;
  dob: Date;
  email: string;
  address: string;
  city: string;
  country: string;
  district: string;
  experience: string;
  kindOfJob: string;
  description: string;
  dow: Date;
  numberSaleInvoice: SaleInvoice[];
}

const EditProviderInformation = () => {
  const { id } = useParams<{ id: string }>();
  const [staff, setStaff] = useState<Staff | null>(null);
  const [updateStaff, setUpdateStaff] = useState<Staff | null>(null);

  useEffect(() => {
    if (id) {
      const foundStaff = StaffData.find((item) => item.id === id);
      setStaff(foundStaff || null);
      setUpdateStaff(foundStaff || null);
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (updateStaff) {
      setUpdateStaff({
        ...updateStaff,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleDateChange = (date: string) => {
    if (updateStaff) {
      const updatedInvoices = updateStaff.numberSaleInvoice.map((invoice) => ({
        ...invoice,
        createDate: new Date(date),
      }));
      setUpdateStaff({
        ...updateStaff,
        dob: new Date(date),
        dow: new Date(date),
        numberSaleInvoice: updatedInvoices,
      });
    }
  };

  const formatDate = (date: Date | string): string => {
    const parsedDate = new Date(date);
    return parsedDate instanceof Date && !isNaN(parsedDate.getTime()) // Check for a valid date
      ? parsedDate.toISOString()
      : ""; // Return empty string if invalid date
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("vi-VN").format(value) + " vnd";
  };

  const handleUploadFile = () => {
    console.log("handle upload");
  };

  const handleDeleteFile = () => {
    console.log("handle delete file");
  };

  const handleUpdate = () => {
    console.log("update");
  };

  return (
    <div className="w-full flex flex-col p-4 rounded-md shadow-md">
      {/* General Information */}
      <TitleSession
        icon="flowbite:profile-card-outline"
        title="General Information"
      />

      <div className="w-full p-6 flex flex-col gap-6">
        <div className="flex w-full">
          <div className="w-1/5">
            <Image
              alt="avatar"
              src="/assets/images/avatar.jpg"
              width={115}
              height={115}
              className="rounded-full"
            />
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <LabelInformation
              content={staff ? `#${staff.id}` : ""}
              title="ID"
            />
            <div className="flex gap-8 ">
              <MyButton
                event={handleUploadFile}
                width="w-40"
                title="Upload photo"
                px="px-4"
                height="h-9"
              />
              <MyButton
                event={handleDeleteFile}
                width="w-40"
                title="Delete photo"
                px="px-4"
                height="h-9"
              />
            </div>
          </div>
        </div>
        <div className="w-full grid grid-cols-2 gap-x-20 gap-y-4">
          <InputEdit
            titleInput="Fullname"
            width="w-full"
            name="fullname"
            onChange={handleChange}
            placeholder="Enter Fullname"
            value={updateStaff?.fullname ?? ""}
          />
          <InputDate
            titleInput="Date of birth"
            width="w-full"
            value={updateStaff ? formatDate(updateStaff.dob) : ""}
            onChange={() => {}}
          />
          <InputEdit
            titleInput="Phone"
            width="w-full"
            name="phone"
            onChange={handleChange}
            placeholder="Enter Phone"
            value={updateStaff?.phone ?? ""}
          />
          <InputEdit
            titleInput="Email"
            width="w-full"
            name="email"
            onChange={handleChange}
            placeholder="Enter Fullname"
            value={updateStaff?.email ?? ""}
          />
          <InputSelection
            width="w-full"
            titleInput="Gender"
            options={["Male", "Female", "Orther"]}
            value={updateStaff?.gender ?? "Male"}
            onChange={(value) => {
              setUpdateStaff((prev) => ({
                ...prev!,
                gender: value,
              }));
            }}
          />
        </div>
      </div>

      {/* Address Information */}
      <TitleSession
        icon="mdi:address-marker-outline"
        title="Address Information"
      />

      <div className="w-full p-6 flex flex-col gap-6">
        <div className="w-full grid grid-cols-2 gap-x-20 gap-y-4">
          <InputSelection
            width="w-full"
            titleInput="Country"
            options={["VietNam", "UK", "US", "JP", "C", "K", "Canada"]}
            value={updateStaff?.country ?? "VietNam"}
            onChange={(value) => {
              setUpdateStaff((prev) => ({
                ...prev!,
                country: value,
              }));
            }}
          />
          <InputSelection
            width="w-full"
            titleInput="City"
            options={["TP.HCM", "HN", "DN", "HP", "PT", "VT"]}
            value={updateStaff?.city ?? "TP.HCM"}
            onChange={(value) => {
              setUpdateStaff((prev) => ({
                ...prev!,
                city: value,
              }));
            }}
          />
          <InputSelection
            width="w-full"
            titleInput="District"
            options={["Q1", "Q2", "BT", "Q7", "Q9", "TD"]}
            value={updateStaff?.district ?? "Q1"}
            onChange={(value) => {
              setUpdateStaff((prev) => ({
                ...prev!,
                district: value,
              }));
            }}
          />
          <InputEdit
            titleInput="Address"
            width="w-full"
            name="address"
            onChange={handleChange}
            placeholder="Enter Address"
            value={updateStaff?.address ?? ""}
          />
        </div>
      </div>

      {/* Account Information */}
      <TitleSession icon="codicon:account" title="Account Information" />

      <div className="w-full p-6 flex flex-col gap-6">
        <div className="w-full grid grid-cols-2 gap-x-20 gap-y-4">
          <InputEdit
            titleInput="Username"
            width="w-full"
            name="email"
            onChange={handleChange}
            placeholder="Enter Username"
            value={updateStaff?.email ?? ""}
          />
          <InputEdit
            titleInput="Password"
            width="w-full"
            name="phone"
            onChange={handleChange}
            placeholder="Enter Password"
            value={updateStaff?.phone ?? ""}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="w-full flex justify-end p-6 ">
        <MyButton
          event={handleUpdate}
          width="w-28"
          background="bg-primary-100"
          text_color="text-white"
          title="Update"
        />
      </div>
    </div>
  );
};

export default EditProviderInformation;
