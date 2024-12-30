"use client";
import ProductCard from "@/components/card/product/ProductCard";
import FilterProduct from "@/components/form/product/FilterProduct";
import { fetchProducts } from "@/lib/services/product.service";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const fakeJewelryData = [
  {
    _id: "1",
    name: "Gold Ring",
    cost: 150,
    images:
      "https://i.pinimg.com/736x/4f/60/e1/4f60e1af35435ffd63ff4a469948eafd.jpg",
    category: "Ring",
    material: "Gold",
    rating: 4.5,
    sales: 120,
    voucherName: "Golden Deal",
    discount: 10,
  },
  {
    _id: "2",
    name: "Silver Necklace",
    cost: 200,
    images:
      "https://i.pinimg.com/736x/36/22/87/3622878f3b40dc5e3ff8807f64daa774.jpg",
    category: "Necklace",
    material: "Silver",
    rating: 4.0,
    sales: 90,
    voucherName: "Shiny Silver",
    discount: 15,
  },
  {
    _id: "3",
    name: "Platinum Bracelet",
    cost: 350,
    images:
      "https://i.pinimg.com/736x/4f/60/e1/4f60e1af35435ffd63ff4a469948eafd.jpg",
    category: "Bracelet",
    material: "Platinum",
    rating: 4.8,
    sales: 150,
    voucherName: "Premium Platinum",
    discount: 20,
  },
  {
    _id: "4",
    name: "Rose Gold Charm",
    cost: 120,
    images:
      "https://i.pinimg.com/736x/36/22/87/3622878f3b40dc5e3ff8807f64daa774.jpg",
    category: "Charm",
    material: "Rose Gold",
    rating: 3.9,
    sales: 50,
    voucherName: "Rose Charm Special",
    discount: 5,
  },
  {
    _id: "5",
    name: "Diamond Ring",
    cost: 500,
    images:
      "https://i.pinimg.com/736x/4f/60/e1/4f60e1af35435ffd63ff4a469948eafd.jpg",
    category: "Ring",
    material: "Gold",
    rating: 4.9,
    sales: 200,
    voucherName: "Diamond Delight",
    discount: 25,
  },
  {
    _id: "6",
    name: "Emerald Earrings",
    cost: 220,
    images:
      "https://i.pinimg.com/736x/4f/60/e1/4f60e1af35435ffd63ff4a469948eafd.jpg",
    category: "Earrings",
    material: "Emerald",
    rating: 4.3,
    sales: 110,
    voucherName: "Emerald Sparkle",
    discount: 12,
  },
  {
    _id: "7",
    name: "Ruby Pendant",
    cost: 300,
    images:
      "https://i.pinimg.com/736x/4f/60/e1/4f60e1af35435ffd63ff4a469948eafd.jpg",
    category: "Pendant",
    material: "Ruby",
    rating: 4.6,
    sales: 130,
    voucherName: "Ruby Shine",
    discount: 18,
  },
  {
    _id: "8",
    name: "Sapphire Bracelet",
    cost: 400,
    images:
      "https://i.pinimg.com/736x/4f/60/e1/4f60e1af35435ffd63ff4a469948eafd.jpg",
    category: "Bracelet",
    material: "Sapphire",
    rating: 4.7,
    sales: 140,
    voucherName: "Sapphire Luxury",
    discount: 22,
  },
  {
    _id: "9",
    name: "Pearl Necklace",
    cost: 180,
    images:
      "https://i.pinimg.com/736x/4f/60/e1/4f60e1af35435ffd63ff4a469948eafd.jpg",
    category: "Necklace",
    material: "Pearl",
    rating: 4.2,
    sales: 80,
    voucherName: "Pearl Elegance",
    discount: 10,
  },
  {
    _id: "10",
    name: "Platinum Cufflinks",
    cost: 250,
    images:
      "https://i.pinimg.com/736x/4f/60/e1/4f60e1af35435ffd63ff4a469948eafd.jpg",
    category: "Cufflinks",
    material: "Platinum",
    rating: 4.4,
    sales: 100,
    voucherName: "Cufflink Platinum",
    discount: 15,
  },
  {
    _id: "11",
    name: "Gold Anklet",
    cost: 140,
    images:
      "https://i.pinimg.com/736x/4f/60/e1/4f60e1af35435ffd63ff4a469948eafd.jpg",
    category: "Anklet",
    material: "Gold",
    rating: 3.8,
    sales: 40,
    voucherName: "Golden Anklet Deal",
    discount: 7,
  },
  {
    _id: "12",
    name: "Diamond Earrings",
    cost: 600,
    images:
      "https://i.pinimg.com/736x/4f/60/e1/4f60e1af35435ffd63ff4a469948eafd.jpg",
    category: "Earrings",
    material: "Diamond",
    rating: 4.9,
    sales: 180,
    voucherName: "Diamond Shine",
    discount: 30,
  },
  {
    _id: "13",
    name: "Silver Brooch",
    cost: 100,
    images:
      "https://i.pinimg.com/736x/4f/60/e1/4f60e1af35435ffd63ff4a469948eafd.jpg",
    category: "Brooch",
    material: "Silver",
    rating: 3.7,
    sales: 30,
    voucherName: "Silver Style",
    discount: 8,
  },
  {
    _id: "14",
    name: "Gold Pendant",
    cost: 170,
    images:
      "https://i.pinimg.com/736x/4f/60/e1/4f60e1af35435ffd63ff4a469948eafd.jpg",
    category: "Pendant",
    material: "Gold",
    rating: 4.1,
    sales: 70,
    voucherName: "Golden Glow",
    discount: 12,
  },
];

const Page = () => {
  const [filteredData, setFilteredData] = useState<any[]>(fakeJewelryData);
  const [sortOption, setSortOption] = useState<string>("default");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    let isMounted = true;
    const getAllProducts = async () => {
      try {
        const data = await fetchProducts();
        console.log(data);
        if (isMounted) {
          // setPosts(data);
        }
      } catch (error) {
        console.error("Error loading posts:", error);
      }
    };
    getAllProducts();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSortChange = (option: string) => {
    setSortOption(option);
    let sortedData = [...filteredData];
    if (option === "price-asc") {
      sortedData.sort((a, b) => a.cost - b.cost);
    } else if (option === "price-desc") {
      sortedData.sort((a, b) => b.cost - a.cost);
    } else if (option === "bestseller") {
      sortedData.sort((a, b) => b.sales - a.sales);
    } else if (option === "rating") {
      sortedData.sort((a, b) => b.rating - a.rating);
    }
    setFilteredData(sortedData);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const displayedItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <div className="bg-[#EDF1F3] dark:bg-dark-200 h-[250px] flex justify-center items-center">
        <div>
          <h1 className="text-dark100_light500 font-light text-[84px]">SHOP</h1>
          <div className="flex justify-center items-center">
            <Link href="/">
              <span className="text-dark100_light500">Home</span>
            </Link>
            <Icon
              icon="solar:alt-arrow-right-line-duotone"
              width="24"
              height="16"
            />
            <Link href="/shop">
              <span className="text-primary-100">Shop</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full block md:flex mt-5">
        <div className="w-full p-4 md:w-[25%] px-14">
          <FilterProduct
            fakeJewelryData={fakeJewelryData}
            setFilteredData={setFilteredData}
          />
        </div>
        <div className="w-full md:w-[75%] px-16">
          <div className="flex justify-end items-center mb-5">
            <span className="text-base font-medium mr-3 text-[#939393]">
              Sort By:
            </span>
            <select
              value={sortOption}
              onChange={(e) => handleSortChange(e.target.value)}
              className="px-3 py-2 border rounded-md text-dark100_light500"
            >
              <option value="default">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="bestseller">Best Seller</option>
              <option value="rating">Rating</option>
            </select>
          </div>
          <div className="flex flex-wrap gap-8 justify-center ">
            {displayedItems.map((item) => (
              <ProductCard key={item._id} item={item} />
            ))}
          </div>
          {/* Pagination */}
          <div className="flex justify-center mt-5">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`mx-1 px-3 py-2 rounded ${
                  currentPage === index + 1
                    ? "bg-primary-100 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
