"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { Sheet, SheetClose } from "@/components/ui/sheet";
import { navbarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import Theme from "./Theme";
import MobileNav from "./MobileNav";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex-between background-light700_dark300 fixed z-50 h-[79px] w-full gap-5 border-b p-6 dark:border-transparent sm:px-5 ">
      <Link href="/" className="flex items-center gap-1 pl-5">
        <p className="text-dark100_light500 text-3xl logo">JewelryStore</p>
        <p className="text-primary-100 text-3xl">.</p>
      </Link>

      {/* Sidebar links */}
      <div className="hidden w-auto sm:flex ml-[15%]">
        <Sheet>
          {navbarLinks.map((item) => {
            const isActive = pathname === item.route;
            return (
              <SheetClose asChild key={item.route}>
                <Link
                  href={item.route}
                  className={`${
                    isActive
                      ? "text-primary-100 rounded-lg"
                      : "text-dark100_light500"
                  } text-[13px] w-[120px] font-medium flex h-[40px] items-center justify-center gap-4 bg-transparent p-4`}
                >
                  {/* <Icon className="text-2xl text-light-500" icon={item.icon} /> */}
                  <p className={`${isActive ? "font-medium" : ""}`}>
                    {item.label}
                  </p>
                </Link>
              </SheetClose>
            );
          })}
        </Sheet>
      </div>

      {/* Right side options */}
      <div className="flex-between w-auto pr-5">
        <Theme />
        <Icon
          icon="cuida:search-outline"
          className="text-dark100_light500 mr-5 font-bold text-[20px]"
        />
        <Icon
          icon="solar:user-bold"
          className="text-dark100_light500 mr-5 text-[20px]"
        />
        <Icon icon="mdi:cart" className="text-dark100_light500 text-[20px]" />
        <div className="flex w-auto sm:hidden">
          <MobileNav />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
