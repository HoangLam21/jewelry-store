"use client";
import TableSearch from "@/components/shared/table/TableSearch";
import { ImportData } from "@/constants/data";
import { PaginationProps } from "@/types/pagination";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import Link from "next/link";
import Table from "@/components/shared/table/Table";
import PaginationUI from "@/types/pagination/Pagination";
import { format } from "date-fns";
import MyButton from "@/components/shared/button/MyButton";
import LabelStatus from "@/components/shared/label/LabelStatus";

interface Staff {
  id: string;
  createAt: string;
  createBy: string;
  invoice: [
    {
      id: string;
      productName: string;
      unitPrice: number;
      quantity: number;
      discount: number;
    }
  ];
  status: boolean;
}

const columns = [
  { header: "ID", accessor: "id" },
  {
    header: "CreateAt",
    accessor: "createAt",
    className: "hidden md:table-cell",
  },
  {
    header: "CreateBy",
    accessor: "createBy",
    className: "hidden md:table-cell",
  },
  {
    header: "Total",
    accessor: "invoice",
    className: "hidden lg:table-cell",
  },
  {
    header: "Status",
    accessor: "status",
    className: "hidden md:table-cell",
  },

  { header: "Action", accessor: "action" },
];

const ImportList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;
  const totalResult = ImportData.length;
  const [filterOption, setFilterOption] = useState("");

  const [sortConfig, setSortConfig] = useState<{
    key: SortableKeys;
    direction: "ascending" | "descending";
  }>({
    key: "id",
    direction: "ascending",
  });
  type SortableKeys = "id" | "fullname" | "total" | "status" | "number";

  const getValueByKey = (item: (typeof ImportData)[0], key: SortableKeys) => {
    switch (key) {
      case "id":
        return item.id;
      case "fullname":
        return item.createBy;
      case "status":
        return item.status;
      case "total":
        return item.invoice.map((it) => it.quantity * it.unitPrice);
      default:
        return "";
    }
  };

  const sorted = [...ImportData].sort((a, b) => {
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
      item.createBy.toLowerCase().includes(lowerCaseQuery) ||
      item.createBy.toLowerCase().includes(lowerCaseQuery) ||
      item.invoice
        .map((it) => it.quantity * it.unitPrice)
        .toString()
        .toLowerCase()
        .includes(lowerCaseQuery);

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

  const renderRow = (item: Staff) => (
    <tr
      key={item.id}
      className="border-t border-gray-300 my-4 text-sm dark:text-dark-360"
    >
      <td className="px-4 py-2">
        <div className="flex flex-col">
          <p>Import Id</p>
          <p>#00{item.id}</p>
        </div>
      </td>
      <td className="px-4 py-2">{format(item.createAt, "PPP")}</td>
      <td className="px-4 py-2">{item.createBy}</td>

      <td className="px-4 py-2 hidden md:table-cell">
        {" "}
        {`${item.invoice
          .map((it) => it.quantity * it.unitPrice)
          .toLocaleString("vi-VN")} VND`}
      </td>
      <td className="px-4 py-2">
        {item.status ? (
          <LabelStatus
            title="Done"
            background="bg-custom-green"
            text_color="text-dark-green"
          />
        ) : (
          <LabelStatus
            title="Pending"
            background="bg-light-yellow"
            text_color="text-yellow-600"
          />
        )}
      </td>
      <td className="px-4 py-2 hidden lg:table-cell">
        <div className="flex items-center gap-2">
          <Link href={`/admin/import/${item.id}`}>
            <div className="w-7 h-7 flex items-center justify-center rounded-full">
              <Icon
                icon="tabler:eye"
                width={24}
                height={24}
                className="text-accent-blue bg-light-blue dark:bg-blue-800 dark:text-dark-360 rounded-md p-1"
              />
            </div>
          </Link>
          <Link href={`/admin/import/edit/${item.id}`}>
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
        onSort={(key: string) => requestSort(key as SortableKeys)}
      />
      <div className="p-4 mt-4 text-sm flex items-center justify-center md:justify-between text-gray-500 dark:text-dark-360">
        <PaginationUI paginationUI={paginationUI} />
      </div>
    </div>
  );
};

export default ImportList;
