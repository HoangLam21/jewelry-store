import LabelInformation from "@/components/shared/label/LabelInformation";
import TitleSession from "@/components/shared/label/TitleSession";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useParams, useRouter } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { PaginationProps } from "@/types/pagination";
import TableSearch from "@/components/shared/table/TableSearch";
import Table from "@/components/shared/table/Table";
import PaginationUI from "@/types/pagination/Pagination";
import LabelStatus from "@/components/shared/label/LabelStatus";
import { getProviderById } from "@/lib/service/provider.service";
import { categoryData, Providers } from "@/constants/data";
import { CategoryResponse } from "@/dto/CategoryDTO";
import MyButton from "@/components/shared/button/MyButton";
import InputEdit from "@/components/shared/input/InputEdit";
import { defaultCategory } from "./CategoryList";
import InputSelection from "@/components/shared/input/InputSelection";
import Format from "@/components/shared/card/ConfirmCard";

interface productProp {
  _id: string;
  fullName: string;
  cost: number;
}
const defaultItem = {
  _id: "",
  fullName: "",
  cost: 0
};

const columns = [
  { header: "ID", accessor: "id" },
  {
    header: "Name",
    accessor: "name",
    className: "hidden lg:table-cell"
  },
  {
    header: "Price",
    accessor: "cost",
    className: "hidden md:table-cell"
  },
  {
    header: "Action",
    accessor: "action",
    className: "hidden md:table-cell"
  }
];

const EditCategoryInformation = () => {
  const { id } = useParams<{ id: string }>() as { id: string };
  const [searchQuery, setSearchQuery] = useState("");
  const [onDelete, setOnDelete] = useState(false);
  const [category, setCategory] = useState<CategoryResponse>(defaultCategory);
  const [product, setProduct] = useState<productProp[]>(category.products);
  const [updateCategory, setUpdateCategory] =
    useState<CategoryResponse>(defaultCategory);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;
  const [sortConfig, setSortConfig] = useState<{
    key: SortableKeys;
    direction: "ascending" | "descending";
  }>({
    key: "id",
    direction: "ascending"
  });
  type SortableKeys = "id" | "name" | "createAt";

  useEffect(() => {
    if (id) {
      const foundItem = categoryData.find((item) => item._id === id);
      if (foundItem) {
        setCategory(foundItem);
        setUpdateCategory(foundItem);
      }
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (updateCategory) {
      setUpdateCategory({
        ...updateCategory,
        [e.target.name]: e.target.value
      });
    }
  };

  const formatDate = (date: Date | string): string => {
    const parsedDate = new Date(date);
    return parsedDate instanceof Date && !isNaN(parsedDate.getTime()) // Check for a valid date
      ? parsedDate.toISOString()
      : "";
  };
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("vi-VN").format(value) + " vnd";
  };

  const requestSort = (key: SortableKeys) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const filteredproducts = product.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.fullName.toLowerCase().includes(query) ||
      formatCurrency(item.cost).toLowerCase().includes(query) ||
      item._id.toString().includes(query)
    );
  });

  const totalPages = Math.ceil(filteredproducts.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const dataLength = filteredproducts.length;
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedproducts = filteredproducts.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const paginationUI: PaginationProps = {
    currentPage,
    setCurrentPage,
    indexOfLastItem,
    indexOfFirstItem,
    totalPages,
    dataLength
  };
  const [detailItem, setDetailItem] = useState<productProp>(defaultItem);
  const handleDelete = async (id: string) => {
    // try {
    //   const result = await deleteCustomer(id);
    //   if (result) {
    //     setOnDelete(false);
    //     setDisplayedList((prev) => prev.filter((item) => item.id !== id));
    //     alert("Delete customer successfully.");
    //   } else {
    //     alert("Can't delete customer.");
    //   }
    // } catch (err: any) {
    //   console.error("Error delete data:", err);
    //   const errorMessage = err?.message || "An unexpected error occurred.";
    //   alert(`Error delete data: ${errorMessage}`);
    // }
    const detail = category.products.filter((item) => item._id !== id);
    if (detail) setProduct(detail);
    setOnDelete(false);
  };
  const handleConfirmDelete = (id: string) => {
    const detail = category.products.find((item) => item._id === id);
    if (detail) setDetailItem(detail);
    setOnDelete(true);
  };
  const handleCancelConfirm = () => {
    setOnDelete(false);
  };

  const handleSort = () => {
    console.log("this is sort");
  };

  const renderRow = (product: productProp) => (
    <tr
      key={product._id}
      className="border-t border-gray-300 text-sm dark:text-dark-360"
    >
      <td className="px-4 py-2 hidden md:table-cell">{product._id}</td>
      <td className="px-4 py-2">{product.fullName}</td>
      <td className="hidden px-4 py-2 lg:table-cell">
        {formatCurrency(product.cost)}
      </td>
      <td className="px-4 py-2 hidden lg:table-cell">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 flex items-center justify-center rounded-full cursor-pointer"
            onClick={() => handleConfirmDelete(product._id)}
          >
            <Icon
              icon="tabler:trash"
              width={24}
              height={24}
              className=" dark:text-red-950 font-bold bg-light-red text-red-600 dark:bg-dark-110 rounded-md p-1"
            />
          </div>
        </div>
      </td>
    </tr>
  );

  const handleUploadFile = () => {
    console.log("handle upload");
  };

  const handleDeleteFile = () => {
    console.log("handle delete file");
  };

  const handleUpdate = () => {
    console.log("update");
  };

  return (
    <div className="w-full flex flex-col p-4 rounded-md shadow-md">
      {/* General Information */}

      <TitleSession
        icon="flowbite:profile-card-outline"
        title="General Information"
      />

      <div className="w-full p-6 flex flex-col gap-6 ">
        <div className="w-full flex">
          <div className="w-1/5">
            <Image
              alt="avatar"
              src="/assets/images/avatar.jpg"
              width={115}
              height={130}
              className="rounded-md"
            />
          </div>

          <div className="w-full grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-5">
              <LabelInformation content={category._id} title="ID" />
              <InputEdit
                titleInput="Fullname"
                width="w-full"
                name="fullName"
                onChange={handleChange}
                placeholder={category.name ? category.name : "Enter name"}
              />
              <InputSelection
                width="w-full"
                titleInput="Provider"
                options={["Best Category", "Normal"]}
                value={category.hot ? "Best Category" : "Normal"}
                onChange={(value) => {
                  setCategory((prev) => ({
                    ...prev!,
                    hot: value === "Best Category" ? true : false
                  }));
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <TitleSession icon="humbleicons:money" title="Number of salesitems" />

      <div className="flex flex-col gap-6 w-full pt-6">
        <TableSearch onSearch={setSearchQuery} onSort={handleSort} />
        <div className="flex flex-col gap-6 w-full p-6">
          <Table
            columns={columns}
            data={paginatedproducts}
            renderRow={renderRow}
            onSort={handleSort}
          />
          <div className="p-4 mt-4 text-sm flex items-center justify-center md:justify-between text-gray-500 dark:text-dark-360">
            <PaginationUI paginationUI={paginationUI} />
          </div>
        </div>
      </div>
      {onDelete && (
        <Format
          onClose={handleCancelConfirm}
          label="Delete"
          content="delete"
          userName={detailItem.fullName}
          onConfirmDelete={() => handleDelete(detailItem._id)}
          type="delete"
        />
      )}
    </div>
  );
};

export default EditCategoryInformation;
