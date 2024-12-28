"use client";
import TableSearch from "@/components/shared/table/TableSearch";
import { CustomerData } from "@/constants/data";
import { PaginationProps } from "@/types/pagination";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import Link from "next/link";
import Table from "@/components/shared/table/Table";
import PaginationUI from "@/types/pagination/Pagination";

interface OrderCustomer {
  id: string;
  createAt: Date;
  createBy: string;
  cost: number;
}

interface Customer {
  id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  address: string;
  avatar: string;
  point: number;
  sales: number;
  orders: OrderCustomer[];
}

const columns = [
  { header: "Customer Name", accessor: "name" },
  {
    header: "Phone",
    accessor: "phone",
    className: "hidden md:table-cell"
  },
  {
    header: "Email",
    accessor: "email",
    className: "hidden md:table-cell"
  },
  {
    header: "Sales",
    accessor: "sales",
    className: "hidden lg:table-cell"
  },
  { header: "Point", accessor: "point", className: "hidden lg:table-cell" },
  { header: "Action", accessor: "action" }
];

const CustomerList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOption, setFilterOption] = useState("");

  const [sortConfig, setSortConfig] = useState<{
    key: SortableKeys;
    direction: "ascending" | "descending";
  }>({
    key: "id",
    direction: "ascending"
  });
  type SortableKeys = "id" | "fullname" | "point" | "sales";

  const getValueByKey = (item: (typeof CustomerData)[0], key: SortableKeys) => {
    switch (key) {
      case "id":
        return item.id;
      case "fullname":
        return item.fullName;
      case "point":
        return item.point;
      case "sales":
        return item.sales;
      default:
        return "";
    }
  };

  const sorted = [...CustomerData].sort((a, b) => {
    const aValue = getValueByKey(a, sortConfig.key);
    const bValue = getValueByKey(b, sortConfig.key);

    if (aValue < bValue) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key: SortableKeys) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const filterData = sorted.filter((item) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    // Lọc theo searchQuery
    const matchesSearch =
      item.fullName.toLowerCase().includes(lowerCaseQuery) ||
      item.email.toLowerCase().includes(lowerCaseQuery) ||
      item.point === parseInt(lowerCaseQuery, 10) ||
      item.phoneNumber.toString().toLowerCase().includes(lowerCaseQuery) ||
      item.id.toLowerCase().includes(lowerCaseQuery);

    return matchesSearch;
  });

  const dataLength = filterData.length;
  const itemsPerPage = 8;
  const totalPages = Math.ceil(dataLength / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filterData.slice(startIndex, endIndex);
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

  const handleSort = () => {
    console.log("this is sort");
  };

  const renderRow = (item: Customer) => (
    <tr
      key={item.id}
      className="border-t border-gray-300 my-4 text-sm dark:text-dark-360"
    >
      <td className="px-4 py-2">
        <div className="flex flex-col">
          <p>{item.fullName}</p>
          <p>#00{item.id}</p>
        </div>
      </td>
      <td className="px-4 py-2">{item.phoneNumber}</td>
      <td className="px-4 py-2">{item.email}</td>

      <td className="px-4 py-2 hidden md:table-cell">
        {" "}
        {`${item.sales.toLocaleString("vi-VN")} VND`}
      </td>
      <td className="px-4 py-2">{item.point}</td>

      <td className="px-4 py-2 hidden lg:table-cell">
        <div className="flex items-center gap-2">
          <Link href={`/admin/customer/${item.id}`}>
            <div className="w-7 h-7 flex items-center justify-center rounded-full">
              <Icon
                icon="tabler:eye"
                width={24}
                height={24}
                className="text-accent-blue bg-light-blue dark:bg-blue-800 dark:text-dark-360 rounded-md p-1"
              />
            </div>
          </Link>
          <Link href={`/admin/Customer/edit/${item.id}`}>
            <div className="w-7 h-7 flex items-center justify-center rounded-full">
              <Icon
                icon="tabler:edit"
                width={24}
                height={24}
                className="text-white  dark:bg-dark-150 bg-dark-green rounded-md  p-1"
              />
            </div>
          </Link>
          <div className="w-7 h-7 flex items-center justify-center rounded-full">
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
  return (
    <div className="w-full flex flex-col p-4 rounded-md shadow-sm">
      <TableSearch onSearch={setSearchQuery} onSort={handleSort} />
      <Table
        columns={columns}
        data={currentData}
        renderRow={renderRow}
        onSort={handleSort}
      />
      <div className="p-4 mt-4 text-sm flex items-center justify-center md:justify-between text-gray-500 dark:text-dark-360">
        <PaginationUI paginationUI={paginationUI} />
      </div>
    </div>
  );
};

export default CustomerList;
