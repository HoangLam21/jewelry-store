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

interface productProp {
  _id: string;
  fullName: string;
  cost: number;
}

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
  }
];

const CategoryInformation = () => {
  const { id } = useParams<{ id: string }>() as { id: string };
  const [detail, setDetail] = useState<CategoryResponse | null>(null); // Store Provider data safely
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  // useEffect(() => {
  //   const fetchStaffData = async () => {
  //     try {
  //       if (id) {
  //         const foundItem = await getProviderById(id);
  //         setProvider(foundItem);
  //       }
  //     } catch (error) {
  //       console.error("Lỗi khi lấy thông tin nhân viên:", error);
  //     }
  //   };

  //   fetchStaffData();
  // }, []);

  // if (!provider) {
  //   return <p>Loading staff information...</p>;
  // }

  const [sortConfig, setSortConfig] = useState<{
    key: SortableKeys;
    direction: "ascending" | "descending";
  }>({
    key: "id",
    direction: "ascending"
  });
  type SortableKeys = "id" | "name" | "createAt";

  const getValueByKey = (item: CategoryResponse, key: SortableKeys) => {
    switch (key) {
      case "id":
        return item._id;
      case "name":
        return item.name;
      case "createAt":
        return new Date(item.createAt);
      default:
        return "";
    }
  };

  useEffect(() => {
    if (id) {
      const foundItem = categoryData.find((item) => item._id === id);
      if (foundItem) {
        setDetail(foundItem);
      }
    }
  }, [id]);

  if (!detail) {
    return <p>Loading category information...</p>;
  }

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

  const filteredproducts = detail.products.filter((item) => {
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
    </tr>
  );

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
              <LabelInformation content={detail._id} title="ID" />
              <LabelInformation content={detail.name} title="Fullname" />
              <LabelInformation
                content={detail.hot ? "Best category" : ""}
                title="Hot"
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
    </div>
  );
};

export default CategoryInformation;
