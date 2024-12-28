import LabelInformation from "@/components/shared/label/LabelInformation";
import TitleSession from "@/components/shared/label/TitleSession";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useParams, useRouter } from "next/navigation";
import { StaffData } from "@/constants/data";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { PaginationProps } from "@/types/pagination";
import TableSearch from "@/components/shared/table/TableSearch";
import Table from "@/components/shared/table/Table";
import PaginationUI from "@/types/pagination/Pagination";
import LabelStatus from "@/components/shared/label/LabelStatus";

interface SaleInvoice {
  id: string;
  customer: string;
  createDate: Date;
  note: string;
  total: number;
  status: number;
}

interface Staff {
  id: string;
  gender: string;
  position: string;
  earning: number;
  phone: string;
  fullname: string;
  dob: Date;
  email: string;
  address: string;
  city: string;
  country: string;
  experience: string; // Experience as string, adjust if it's an object
  kindOfJob: string;
  description: string;
  dow: Date;
  numberSaleInvoice: SaleInvoice[];
}

const columns = [
  { header: "Customer", accessor: "customer" },
  {
    header: "ID",
    accessor: "id",
    className: "hidden md:table-cell",
  },
  {
    header: "Create Date",
    accessor: "createDate",
    className: "hidden md:table-cell",
  },
  {
    header: "Note",
    accessor: "note",
    className: "hidden lg:table-cell",
  },
  { header: "Total", accessor: "total", className: "hidden lg:table-cell" },
  { header: "Status", accessor: "status" },
];

const ProviderInformation = () => {
  const { id } = useParams<{ id: string }>() as { id: string };
  const [staff, setStaff] = useState<Staff | null>(null); // Store staff data safely
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
  type SortableKeys = "id" | "customer" | "createDate" | "total" | "status";

  useEffect(() => {
    if (id) {
      const foundItem = StaffData.find((item) => item.id === id);
      if (foundItem) {
        setStaff(foundItem);
      }
    }
  }, [id]);

  // Render nothing if staff is not loaded yet
  if (!staff) {
    return <p>Loading provider information...</p>;
  }

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("vi-VN").format(value) + " vnd";
  };

  const getValueByKey = (item: (typeof StaffData)[0], key: SortableKeys) => {
    switch (key) {
      case "id":
        return item.id;
      case "customer":
        return item.fullname;
      case "createDate":
        return item.position;
      case "status":
        return item.earning;
      default:
        return "";
    }
  };

  const sorted = [...StaffData].sort((a, b) => {
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

  const filteredInvoices = staff.numberSaleInvoice.filter((invoice) => {
    const query = searchQuery.toLowerCase();
    return (
      invoice.customer.toLowerCase().includes(query) ||
      invoice.note.toLowerCase().includes(query) ||
      invoice.total.toString().includes(query)
    );
  });

  const totalPages = Math.ceil(filteredInvoices.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const dataLength = filteredInvoices.length;
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedInvoices = filteredInvoices.slice(
    startIndex,
    startIndex + rowsPerPage
  );

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

  const renderRow = (invoice: SaleInvoice) => (
    <tr
      key={invoice.id}
      className="border-t border-gray-300 text-sm dark:text-dark-360"
    >
      <td className="px-4 py-2">{invoice.customer}</td>
      <td className="px-4 py-2 hidden md:table-cell">{invoice.id}</td>
      <td className="hidden px-4 py-2 md:table-cell">
        {format(new Date(invoice.createDate), "PPP")}
      </td>
      <td className="hidden px-4 py-2 lg:table-cell">{invoice.note}</td>
      <td className="hidden px-4 py-2 lg:table-cell">
        {formatCurrency(invoice.total)}
      </td>
      <td className="px-4 py-2">
        {invoice.status === 0 ? (
          <LabelStatus
            background="bg-light-red"
            text_color="text-dark-red"
            title="Just created"
          />
        ) : invoice.status === 1 ? (
          <LabelStatus
            background="bg-light-blue"
            text_color="text-accent-blue"
            title="In progress"
          />
        ) : (
          <LabelStatus
            background="bg-custom-green"
            text_color="text-dark-green"
            title="Done"
          />
        )}
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
              <LabelInformation content={staff.fullname} title="Fullname" />
              <LabelInformation
                content={format(new Date(staff.dob), "PPP")}
                title="Date of Birth"
              />
              <LabelInformation content={staff.gender} title="Gender" />
            </div>
            <div className="flex flex-col gap-5">
              <LabelInformation content={staff.id} title="ID" />
              <LabelInformation content={staff.email} title="Email" />
              <LabelInformation content={staff.phone} title="Phone Number" />
            </div>
          </div>
        </div>

        <div className="w-full grid grid-cols-3 gap-4">
          <LabelInformation content={staff.address} title="Address" />
          <LabelInformation content={staff.city} title="City" />
          <LabelInformation content={staff.country} title="Country" />
        </div>
        {/* <LabelInformation content={staff.experience} title="Experience" /> */}
      </div>

      {/* Number of sales invoices */}

      <TitleSession icon="humbleicons:money" title="Number of sales invoices" />

      <div className="flex flex-col gap-6 w-full pt-6">
        <TableSearch onSearch={setSearchQuery} onSort={handleSort} />
        <div className="flex flex-col gap-6 w-full p-6">
          <Table
            columns={columns}
            data={paginatedInvoices}
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

export default ProviderInformation;
