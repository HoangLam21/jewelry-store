import React from "react";

const ShippingInfomation = ({ city, setCity }: any) => {
  return (
    <div>
      <label className="font-light text-[16px]">
        Name<span className="text-primary-100">*</span>
      </label>
      <input
        type="text"
        placeholder="Name"
        className="w-full p-3 border  bg-transparent dark:bg-dark-400"
      />
      <label className="font-light mt-2 text-[16px]">
        Country / Region<span className="text-primary-100">*</span>
      </label>
      <input
        type="text"
        placeholder="Country"
        className="w-full p-3 border  bg-transparent dark:bg-dark-400"
      />
      <label className="font-light mt-2 text-[16px]">
        City / Province<span className="text-primary-100">*</span>
      </label>
      <input
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="w-full p-3 border  bg-transparent dark:bg-dark-400"
      />
      <label className="font-light mt-2 text-[16px]">
        District<span className="text-primary-100">*</span>
      </label>
      <input
        type="text"
        placeholder="District"
        className="w-full p-3 border  bg-transparent dark:bg-dark-400"
      />
      <label className="font-light mt-2 text-[16px]">
        Street address<span className="text-primary-100">*</span>
      </label>
      <input
        type="text"
        placeholder="Street Address"
        className="w-full p-3 border  bg-transparent dark:bg-dark-400"
      />
      <label className="font-light mt-2 text-[16px]">
        Phone<span className="text-primary-100">*</span>
      </label>
      <input
        type="text"
        placeholder="Phone"
        className="w-full p-3 border  bg-transparent dark:bg-dark-400"
      />
      <label className="font-light mt-2 text-[16px]">
        Email<span className="text-primary-100">*</span>
      </label>
      <input
        type="email"
        placeholder="Email"
        className="w-full p-3 border  bg-transparent dark:bg-dark-400"
      />
      <label className="font-light mt-2 text-[16px]">
        Note<span className="text-primary-100"></span>
      </label>
      <textarea
        placeholder="Note"
        rows={4}
        className="w-full p-3 border mb-2 bg-transparent dark:bg-dark-400"
      ></textarea>
    </div>
  );
};

export default ShippingInfomation;
