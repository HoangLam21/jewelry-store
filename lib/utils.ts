import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPrice = (price: string | number): string => {
  const numericPrice =
    typeof price === "string" ? Number(price.replace(/[^\d.-]/g, "")) : price;

  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    currencyDisplay: "code",
  }).format(numericPrice);
};
