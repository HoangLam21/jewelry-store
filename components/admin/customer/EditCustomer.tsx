"use client";
import TitleSession from "@/components/shared/label/TitleSession";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CustomerData } from "@/constants/data";
import Image from "next/image";
import LabelInformation from "@/components/shared/label/LabelInformation";
import MyButton from "@/components/shared/button/MyButton";
import InputEdit from "@/components/shared/input/InputEdit";
import InputDate from "@/components/shared/input/InputDate";
import InputSelection from "@/components/shared/input/InputSelection";

interface OrderCustomer {
  id: string;
  createAt: string;
  createBy: string;
  cost: number;
}

interface Customer {
  id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  address: string;
  avatar: string;
  point: number;
  sales: number;
  orders: OrderCustomer[];
}
const defaultDetail: Customer = {
  id: "",
  fullName: "",
  phoneNumber: "",
  email: "",
  address: "",
  avatar: "",
  point: 0,
  sales: 0,
  orders: []
};

const EditCustomerInformation = () => {
  const { id } = useParams<{ id: string }>() as { id: string };
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [updateCustomer, setUpdateCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    if (id) {
      const foundCustomer = CustomerData.find((item) => item.id === id);
      setCustomer(foundCustomer || null);
      setUpdateCustomer(foundCustomer || null);
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (updateCustomer) {
      setUpdateCustomer({
        ...updateCustomer,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleDateChange = (date: string) => {
    if (updateCustomer) {
      const updatedOrders = updateCustomer.orders.map((order) => ({
        ...order,
        createDate: new Date(date).toISOString()
      }));
      setUpdateCustomer({
        ...updateCustomer,
        orders: updatedOrders
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
              src={
                customer && customer.avatar
                  ? customer.avatar
                  : "/assets/images/avatar.jpg"
              }
              width={115}
              height={115}
              className="rounded-full"
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <LabelInformation
            content={customer ? `#${customer.id}` : ""}
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
          name="fullName"
          onChange={handleChange}
          placeholder="Enter Fullname"
          value={updateCustomer?.fullName ?? ""}
        />
        <InputEdit
          titleInput="Phone"
          width="w-full"
          name="phoneNumber"
          onChange={handleChange}
          placeholder="Enter Phone"
          value={updateCustomer?.phoneNumber ?? ""}
        />
        <InputEdit
          titleInput="Email"
          width="w-full"
          name="email"
          onChange={handleChange}
          placeholder="Enter Email"
          value={updateCustomer?.email ?? ""}
        />
      </div>

      {/* Address Information */}
      <TitleSession
        icon="mdi:address-marker-outline"
        title="Address Information"
      />

      <div className="w-full p-6 flex flex-col gap-6">
        <div className="w-full grid grid-cols-2 gap-x-20 gap-y-4">
          <InputEdit
            titleInput="Address"
            width="w-full"
            name="address"
            onChange={handleChange}
            placeholder="Enter Address"
            value={updateCustomer?.address ?? ""}
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
            value={updateCustomer?.email ?? ""}
          />
          <InputEdit
            titleInput="Password"
            width="w-full"
            name="phoneNumber"
            onChange={handleChange}
            placeholder="Enter Phonenumber"
            value={updateCustomer?.phoneNumber ?? ""}
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

export default EditCustomerInformation;
