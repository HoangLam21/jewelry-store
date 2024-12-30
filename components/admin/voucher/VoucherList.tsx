"use client";
import TableSearch from "@/components/shared/table/TableSearch";
import { Vouchers } from "@/constants/data";
import { PaginationProps } from "@/types/pagination";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import Link from "next/link";
import Table from "@/components/shared/table/Table";
import PaginationUI from "@/types/pagination/Pagination";
import { format } from "date-fns";

interface Voucher {
  id: string;
  name: string;
  discount: string;
  expDate: Date;
}

const columns = [
  { header: "ID", accessor: "id" },
  {
    header: "Name",
    accessor: "name",
    className: "hidden md:table-cell",
  },
  {
    header: "Discount",
    accessor: "discount",
    className: "hidden md:table-cell",
  },
  {
    header: "Expire Date",
    accessor: "expDate",
    className: "hidden lg:table-cell",
  },
  { header: "Action", accessor: "action" },
];

const VoucherList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  const [sortConfig, setSortConfig] = useState<{
    key: SortableKeys;
    direction: "ascending" | "descending";
  }>({
    key: "id",
    direction: "ascending",
  });
  type SortableKeys = "id" | "name" | "expDate" | "discount";

  const getValueByKey = (item: (typeof Vouchers)[0], key: SortableKeys) => {
    switch (key) {
      case "name":
        return item.name;
      case "discount":
        return item.discount;
      case "expDate":
        return item.expDate;
      default:
        return "";
    }
  };

  const sorted = [...Vouchers].sort((a, b) => {
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
      item.id.toLowerCase().includes(lowerCaseQuery) ||
      item.name.toLowerCase().includes(lowerCaseQuery) ||
      item.discount.toString().toLowerCase().includes(lowerCaseQuery) ||
      item.expDate.toString().toLowerCase().includes(lowerCaseQuery);

    return matchesSearch;
  });

  const totalPages = Math.ceil(filterData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = filterData.slice(startIndex, endIndex);

  const dataLength = filterData.length;
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginationUI: PaginationProps = {
    currentPage,
    setCurrentPage,
    indexOfLastItem,
    indexOfFirstItem,
    totalPages,
    dataLength,
  };

  const handleSort = () => {
    console.log("this is sort");
  };

  const renderRow = (item: Voucher) => (
    <tr
      key={item.id}
      className="border-t border-gray-300 my-4 text-sm dark:text-dark-360"
    >
      <td className="px-4 py-2">
        <div className="flex flex-col">
          <p>{item.name}</p>
          <p>#00{item.id}</p>
        </div>
      </td>
      <td className="px-4 py-2">{item.name}</td>
      <td className="px-4 py-2">{item.discount}</td>
      <td className="px-4 py-2">{format(item.expDate, "PPP")}</td>

      <td className="px-4 py-2 hidden lg:table-cell">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 flex items-center justify-center rounded-full hover:cursor-pointer">
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
        onSort={(key: string) => requestSort(key as SortableKeys)}
      />
      <div className="p-4 mt-4 text-sm flex items-center justify-center md:justify-between text-gray-500 dark:text-dark-360">
        <PaginationUI paginationUI={paginationUI} />
      </div>
    </div>
  );
};

export default VoucherList;