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
import { deleteProductById, fetchProduct } from "@/lib/service/product.service";
import { FileContent, ProductResponse } from "@/dto/ProductDTO";
import { formatCurrency } from "@/lib/utils";
export interface Sizes {
  size: string;
  stock: number;
}
export interface Variant {
  material: string;
  sizes: Sizes[];
  addOn: number;
}
export interface ProductData {
  id: string;
  image: string;
  imageInfo: FileContent[];
  productName: string;
  price: string;
  collection: string;
  description: string;
  vouchers: string;
  provider: string;
  category: string;
  variants: Variant[];
}

export const defaultDetailProduct: ProductData = {
  id: "",
  image: "/assets/images/avatar.jpg",
  imageInfo: [],
  productName: "",
  price: "0",
  collection: "",
  description: "",
  vouchers: "",
  provider: "",
  category: "",
  variants: [
    {
      material: "",
      sizes: [
        {
          size: "",
          stock: 0
        }
      ],
      addOn: 0
    }
  ]
};

interface props {
  list: ProductData[];
  setList: React.Dispatch<React.SetStateAction<ProductData[]>>;
}

const ProductList = ({ list, setList }: props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState("");
  const [onDelete, setOnDelete] = useState(false);
  const [onEdit, setOnEdit] = useState(false);

  const [onDetail, setOnDetail] = useState(false);
  const [detailItem, setDetailItem] =
    useState<ProductData>(defaultDetailProduct);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result: ProductResponse[] = await fetchProduct();
        if (result) {
          const data: ProductData[] = result.map((item) => ({
            id: item._id,
            image: item.files[0].url,
            imageInfo: item.files,
            productName: item.name,
            price: formatCurrency(item.cost),
            collection: item.collections,
            description: item.description,
            vouchers: item.vouchers?.[item.vouchers.length - 1]?._id || "",
            provider: item.provider ? item.provider._id : "",
            category: item.category,
            variants: item.variants
          }));

          setList(data);
        }
      } catch (err: any) {
        console.error("Error fetching data:", err);
        const errorMessage = err?.message || "An unexpected error occurred.";
        alert(`Error fetching data: ${errorMessage}`);
      }
    };

    fetchData();
  }, []);
  const filterData = list.filter((item) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    // Lọc theo searchQuery
    const matchesSearch =
      item.productName.toLowerCase().includes(lowerCaseQuery) ||
      item.id.toLowerCase().includes(lowerCaseQuery) ||
      item.price.toLowerCase().includes(lowerCaseQuery);

    return matchesSearch;
  });

  const handleConfirmDelete = (id: string) => {
    const detail = filterData.find((item) => item.id === id);
    if (detail) setDetailItem(detail);
    setOnDelete(true);
  };
  const handleCancelConfirm = () => {
    setOnDelete(false);
  };

  const handleDelete = async (id: string) => {
    try {
      const result = await deleteProductById(id);
      if (result) {
        const detail = filterData.find((item) => item.id === id);
        if (detail)
          setList((prev) => prev.filter((item) => item.id !== detail.id));
        setOnDelete(false);
        alert("Delete product successfully.");
      } else {
        alert("Can't delete product.");
      }
    } catch (err: any) {
      console.error("Error delete data:", err);
      const errorMessage = err?.message || "An unexpected error occurred.";
      alert(`Error delete data: ${errorMessage}`);
    }
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
          {filterData.map((item) => (
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
          setList={setList}
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
