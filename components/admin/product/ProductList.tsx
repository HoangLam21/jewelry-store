"use client";
import ProductFrame from "@/components/shared/card/ProductCard";
import TableSearch from "@/components/shared/table/TableSearch";
import { ProductsData } from "@/constants/data";
import { PaginationProps } from "@/types/pagination";
import PaginationUI from "@/types/pagination/Pagination";
import React, { useEffect, useState } from "react";
import ProductDetail from "./ProductDetail";
import ProductEdit from "./ProductEdit";
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
const defaultDetail: Product = {
  id: "",
  image: "",
  imageInfo: [
    {
      url: "",
      fileName: ""
    }
  ],
  productName: "Unknown Product",
  price: "0",
  material: "Unknown",
  description: "No description available.",
  vouchers: "No vouchers",
  provider: "Unknown Provider",
  category: "Uncategorized",
  size: "",
  color: "",
  quantity: 0
};
const ProductList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [onEdit, setOnEdit] = useState(false);
  const [onDelete, setOnDelete] = useState(false);
  const [onDetail, setOnDetail] = useState(false);
  const [detailItem, setDetailItem] = useState<Product>(defaultDetail);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOption, setFilterOption] = useState("");

  const filterData = ProductsData.filter((item) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    // Lọc theo searchQuery
    const matchesSearch =
      item.productName.toLowerCase().includes(lowerCaseQuery) ||
      item.id.toLowerCase().includes(lowerCaseQuery) ||
      item.price.toLowerCase().includes(lowerCaseQuery);

    return matchesSearch;
  });

  const dataLength = filterData.length;
  const itemsPerPage = 12;
  const totalPages = Math.ceil(dataLength / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginationUI: PaginationProps = {
    currentPage,
    setCurrentPage,
    indexOfLastItem,
    indexOfFirstItem,
    totalPages,
    dataLength
  };

  const [displayedProduct, setDisplayedProduct] =
    useState<Product[]>(filterData);

  const handleDelete = (id: string) => {
    setDisplayedProduct((prev) => prev.filter((item) => item.id !== id));
    console.log("delete");
    setOnDelete(true);
  };

  const handleEdit = (id: string) => {
    const detail = filterData.find((item) => item.id === id);
    if (detail) setDetailItem(detail);
    console.log("edit");
    setOnDetail(false);
    setOnEdit(true);
  };

  const handleDetail = (id: string) => {
    const detail = filterData.find((item) => item.id === id);
    if (detail) setDetailItem(detail);
    setOnDetail(true);
  };

  const handleBack = (value: boolean) => {
    setOnDelete(value);
    setOnDetail(value);
    setOnEdit(value);
  };
  return (
    <>
      <div className="flex w-full flex-col p-4 rounded-md shadow-sm">
        <TableSearch onSearch={setSearchQuery} onSort={() => {}} />
        <div className="flex flex-row flex-wrap items-start justify-items-stretch gap-7 mt-6 max-h-[550px] h-[550px] overflow-x-auto container">
          {displayedProduct.map((item) => (
            <ProductFrame
              key={item.id}
              param={item}
              onDelete={() => handleDelete(item.id)}
              onDetail={() => handleDetail(item.id)}
              onEdit={() => handleEdit(item.id)}
            />
          ))}
        </div>
      </div>

      {onDetail && (
        <ProductDetail
          detailProduct={detailItem}
          onBack={(value: boolean) => handleBack(value)}
          onEdit={(id: string) => handleEdit(id)}
        />
      )}

      {onEdit && (
        <ProductEdit
          detailProduct={detailItem}
          onBack={(value: boolean) => handleBack(value)}
        />
      )}
    </>
  );
};

export default ProductList;
