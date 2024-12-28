"use client";
import ProductFrame from "@/components/shared/card/ProductCard";
import TableSearch from "@/components/shared/table/TableSearch";
import { ProductsData } from "@/constants/data";
import { PaginationProps } from "@/types/pagination";
import PaginationUI from "@/types/pagination/Pagination";
import React, { useEffect, useState } from "react";
import ProductDetail from "./ProductDetail";
import ProductEdit from "./ProductEdit";
import Format from "@/components/shared/card/ConfirmCard";
interface ImageInfo {
  url: string;
  fileName: string;
}
interface Sizes {
  size: string;
  stock: number;
}
interface Variant {
  material: string;
  sizes: Sizes[];
}
interface Product {
  id: string;
  image: string;
  imageInfo: ImageInfo[];
  productName: string;
  price: string;
  description: string;
  vouchers: string;
  provider: string;
  category: string;
  variants: Variant[];
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
  description: "No description available.",
  vouchers: "No vouchers",
  provider: "Unknown Provider",
  category: "Uncategorized",
  variants: [
    {
      material: "Unknown Material",
      sizes: [
        {
          size: "Unknown Size",
          stock: 0
        }
      ]
    }
  ]
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

  const [displayedProduct, setDisplayedProduct] =
    useState<Product[]>(filterData);

  const handleConfirmDelete = (id: string) => {
    const detail = filterData.find((item) => item.id === id);
    if (detail) setDetailItem(detail);
    setOnDelete(true);
  };
  const handleCancelConfirm = () => {
    setOnDelete(false);
  };

  const handleDelete = (id: string) => {
    const detail = filterData.find((item) => item.id === id);
    if (detail)
      setDisplayedProduct((prev) =>
        prev.filter((item) => item.id !== detail.id)
      );
    setOnDelete(false);
    console.log("delete");
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
              onDelete={() => handleConfirmDelete(item.id)}
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

      {onDelete && (
        <Format
          onClose={handleCancelConfirm}
          label="Delete"
          content="delete"
          userName={detailItem.productName}
          onConfirmDelete={() => handleDelete(detailItem.id)}
          type="delete"
        />
      )}
    </>
  );
};

export default ProductList;
