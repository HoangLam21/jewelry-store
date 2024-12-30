import PagingBar from "@/components/shared/bar/PagingBar";
import React, { useState } from "react";
import Description from "./Description";
import AdditionalInformation from "./AdditonalInformation";
import Reviews from "./Reviews";

interface ImageInfo {
  url: string;
  fileName: string;
}

interface Product {
  id: string;
  image: string;
  imageInfo: ImageInfo[];
  productName: string;
  price: string;
  material: string;
  description: string;
  vouchers: string;
  provider: string;
  size: string;
  color: string;
  category: string;
  quantity: number;
}

const DetailProduct = ({ item }: { item: Product }) => {
  const [activeTitle, setActiveTitle] = useState("DESCRIPTION"); // Track the active title
  const title = ["DESCRIPTION", "ADDITIONAL INFORMATION", "REVIEWS"];

  const handleTitleClick = (selectedTitle: string) => {
    setActiveTitle(selectedTitle);
    console.log(`Selected Title: ${selectedTitle}`);
  };
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-full flex flex-col items-center border-b border-border-color">
        <PagingBar title={title} event={handleTitleClick} />
      </div>
      {activeTitle === "DESCRIPTION" && (
        <Description description={item.description} />
      )}
      {activeTitle === "ADDITIONAL INFORMATION" && <AdditionalInformation />}
      {activeTitle === "REVIEWS" && <Reviews />}
    </div>
  );
};

export default DetailProduct;