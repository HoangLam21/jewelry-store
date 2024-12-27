import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div>
      <div className="bg-[#EDF1F3] dark:bg-dark-200 h-[250px] flex justify-center items-center">
        <div>
          <h1 className="text-dark100_light500 font-light text-[84px]">SHOP</h1>
          <div className="flex">
            <Link href="/">
              <span className="text-dark100_light500">Shop</span>
            </Link>
            <Link href="/shop">
              <span className="text-primary-100">Shop</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
