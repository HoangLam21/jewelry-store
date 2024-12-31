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
import { ImportInvoice, Provider } from "@/dto/ProviderDTO";
import { Providers } from "@/constants/data";

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
];

const ProviderInformation = () => {
  const { id } = useParams<{ id: string }>() as { id: string };
  const [provider, setProvider] = useState<Provider | null>(null); // Store Provider data safely
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
    direction: "ascending",
  });
  type SortableKeys = "id" | "fullname" | "total" | "status" | "number";

  const getValueByKey = (item: ImportInvoice, key: SortableKeys) => {
    switch (key) {
      case "id":
        return item.id;
      case "fullname":
        return item.createBy;
      case "status":
        return item.status;
      case "total":
        return item.total;
      default:
        return "";
    }
  };

  useEffect(() => {
    if (id) {
      const foundItem = Providers.find((item) => item._id === id);
      if (foundItem) {
        setProvider(foundItem);
      }
    }
  }, [id]);

  if (!provider) {
    return <p>Loading staff information...</p>;
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

  const filteredInvoices = provider.numberImportInvoice.filter((invoice) => {
    const query = searchQuery.toLowerCase();
    return (
      invoice.createBy.toLowerCase().includes(query) ||
      invoice.createAt.toLowerCase().includes(query) ||
      invoice.id.toString().includes(query)
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

  const renderRow = (invoice: ImportInvoice) => (
    <tr
      key={invoice.id}
      className="border-t border-gray-300 text-sm dark:text-dark-360"
    >
      <td className="px-4 py-2 hidden md:table-cell">{invoice.id}</td>
      <td className="hidden px-4 py-2 md:table-cell">
        {format(new Date(invoice.createAt), "PPP")}
      </td>
      <td className="px-4 py-2">{invoice.createBy}</td>
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
              <LabelInformation content={provider._id} title="ID" />
              <LabelInformation content={provider.name} title="Fullname" />
              <LabelInformation content={provider.email} title="Email" />
            </div>
            <div className="flex flex-col gap-5">
              <LabelInformation
                content={provider.representativeName}
                title="Representative"
              />
              <LabelInformation
                content={provider.contact}
                title="Phone Number"
              />
            </div>
          </div>
        </div>

        <div className="w-full grid grid-cols-3 gap-4">
          <LabelInformation content={provider.address} title="Address" />
          <LabelInformation content={provider.city} title="City" />
          <LabelInformation content={provider.country} title="Country" />
        </div>
        {/* <LabelInformation content={Provider.experience} title="Experience" /> */}
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
