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
import { CategoryResponse } from "@/dto/CategoryDTO";
import { defaultCategory } from "./CategoryList";

const AddCategoryInformation = () => {
  const [updateStaff, setUpdateStaff] =
    useState<CategoryResponse>(defaultCategory);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (updateStaff) {
      setUpdateStaff({
        ...updateStaff,
        [e.target.name]: e.target.value
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
              content={updateStaff ? `#${updateStaff._id}` : ""}
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
            value={updateStaff?.name ?? ""}
          />
          <InputDate
            titleInput="Date of birth"
            width="w-full"
            value={updateStaff ? formatDate(updateStaff.createAt) : ""}
            onChange={() => {}}
          />
        </div>
      </div>

      {/* Product Information */}
      <TitleSession
        icon="mdi:address-marker-outline"
        title="Address Information"
      />

      <div className="w-full p-6 flex flex-col gap-6">
        <div className="w-full grid grid-cols-2 gap-x-20 gap-y-4">
          <InputEdit
            titleInput="Quantity"
            width="w-full"
            name="quantity"
            onChange={handleChange}
            placeholder="Enter Quantity Product"
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

export default AddCategoryInformation;
