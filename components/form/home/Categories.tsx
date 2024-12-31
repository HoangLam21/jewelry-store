import React from "react";
import Image from "next/image";

const jewelryCategories = [
  {
    id: 1,
    name: "Rings",
    image: "/assets/images/793249C01_RGB.jpg",
  },
  {
    id: 2,
    name: "Necklaces",
    image: "/assets/images/B89C2414.jpg",
  },
  {
    id: 3,
    name: "Bracelets",
    image: "/assets/images/193569C00_RGB.jpg",
  },
  {
    id: 4,
    name: "Earrings",
    image: "/assets/images/793249C01_RGB.jpg",
  },
  {
    id: 5,
    name: "Watches",
    image: "/assets/images/793249C01_RGB.jpg",
  },
  {
    id: 6,
    name: "Brooches",
    image: "/assets/images/793249C01_RGB.jpg",
  },
  {
    id: 7,
    name: "Charms",
    image: "/assets/images/793249C01_RGB.jpg",
  },
];

const Categories = () => {
  return (
    <div className="mt-[150px] w-[95%] mx-auto">
      {/* Header */}
      <div className="flex items-center mb-4">
        <p className="jost text-[30px] font-normal text-dark100_light500">
          CATEGORIES
        </p>
        <div className="border-b-2 border-primary-100 ml-auto">
          <p className="font-medium text-dark100_light500 text-[14px] mt-5">
            See all
          </p>
        </div>
      </div>

      <div
        className="mt-[30px] flex overflow-x-auto gap-20 scrollbar-hide"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#ffffff #f4ece3",
        }}
      >
        {jewelryCategories.map((category) => (
          <div
            key={category.id}
            className="flex-shrink-0 flex flex-col items-center"
          >
            <img
              src={category.image}
              alt={category.name}
              width={150}
              height={150}
              className="w-[150px] h-[150px] object-cover rounded-full"
            />
            <p className="text-lg jost capitalize mt-2 text-dark100_light500">
              {category.name.toUpperCase()}
            </p>
            <style jsx>{`
              .scrollbar-hide::-webkit-scrollbar {
                width: 8px;
                height: 8px;
              }
              .scrollbar-hide::-webkit-scrollbar-thumb {
                background-color: #ffffff;
                border-radius: 10px;
              }
              .scrollbar-hide::-webkit-scrollbar-track {
                background-color: #f4ece3;
                border-radius: 10px;
              }
            `}</style>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
