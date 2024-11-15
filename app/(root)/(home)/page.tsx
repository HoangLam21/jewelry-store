"use client";
import MyInput from "@/components/shared/input/MyInput";
import React, { useState } from "react";

export default function Page() {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  return (
    <div>
      <div>
        <MyInput
          onChange={handleChange}
          value={inputValue}
          placeholder="search"
          borderColor="border-gray"
          width="w-[150px]"
          rounded="rounded-md"
          padding="p-4"
          backgroundColor=""
          color="text-white"
          height="h-8"
        />
      </div>
    </div>
  );
}
