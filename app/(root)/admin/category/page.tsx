"use client";
import { useEffect, useState } from "react";
import Headers from "@/components/shared/Headers";
import TableSearch from "@/components/shared/table/TableSearch";
import { format } from "date-fns";
import Link from "next/link";
import { Icon } from "@iconify/react";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
} from "@radix-ui/react-menubar";
// import {Pagination} from "@/components/ui/pagination";
import { PaginationProps } from "@/types/pagination";
import Table from "@/components/shared/table/Table";
import PaginationUI from "@/types/pagination/Pagination";
import { Button } from "@/components/ui/button";
// import { fetchUsers } from "@/lib/services/user.service";

type OrderTable = {
  _id: string;
  name: string;
  createAt: string;
  hot: string;
  //   createdBy: boolean;
  // enrolled: Date;
};

const columns = [
  { header: "Category ID", accessor: "categoryId" },
  { header: "Name", accessor: "name" },
  { header: "created At", accessor: "createAt" },
  { header: "Hot", accessor: "hot" },
  { header: "Action", accessor: "action" },
];

const Page = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState("");
  const [usersData, setUsersdata] = useState<any[]>([]);

  // useEffect(() => {
  //   let isMounted = true;
  //   const fetchUser = async () => {
  //     const data = await fetchUsers();
  //     const formattedData = data.map((user: any) => ({
  //       id: user._id,
  //       fullname: `${user.firstName} ${user.lastName}`,
  //       email: user.email,
  //       phone: user.phoneNumber,
  //       status: user.status,
  //       enrolled: new Date(user.createAt),
  //     }));
  //     if (isMounted) {
  //       setUsersdata(formattedData);
  //     }
  //   };
  //   fetchUser();
  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);

  const [sortConfig, setSortConfig] = useState<{
    key: SortableKeys;
    direction: "ascending" | "descending";
  }>({
    key: "_id",
    direction: "ascending",
  });

  type SortableKeys =
    | "_id"
    | "name"
    // | "createdBy"
    | "hot"
    | "createdAt";

  const getValueByKey = (item: OrderTable, key: SortableKeys) => {
    switch (key) {
      case "_id":
        return item._id;
      case "name":
        return item.name;
      //   case "createdBy":
      //     return item.createdBy;
      case "hot":
        return item.hot;
      case "createdAt":
        return item.createAt;
      default:
        return "";
    }
  };

  const sorted = [...usersData].sort((a, b) => {
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

    // Lọc theo searchQuery: fullname, email, và phone
    const matchesSearch =
      item.fullname.toLowerCase().includes(lowerCaseQuery) ||
      item.email.toLowerCase().includes(lowerCaseQuery) ||
      item.phone.toLowerCase().includes(lowerCaseQuery) ||
      format(item.enrolled, "dd/MM/yyyy")
        .toLowerCase()
        .includes(lowerCaseQuery);

    // Lọc theo bộ lọc trạng thái (online/offline)
    const matchesFilter =
      (filterOption === "online" && item.status === "Active") ||
      (filterOption === "offline" && item.status === "Inactive") ||
      !filterOption; // Không có bộ lọc nào được chọn thì hiển thị tất cả

    return matchesSearch && matchesFilter;
  });
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;
  // const totalPages = Math.ceil(userData.length / rowsPerPage);
  // const totalResult = filterData.length;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = filterData.slice(startIndex, endIndex);
  const [isMounted, setIsMounted] = useState(false);

  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginationUI: PaginationProps = {
    currentPage,
    setCurrentPage,
    indexOfLastItem,
    indexOfFirstItem,
    totalPages: Math.ceil(filterData.length / itemsPerPage),
    dataLength: filterData.length,
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const renderRow = (item: OrderTable) => (
    <tr key={item._id} className=" my-4 border-t border-gray-300  text-sm ">
      <td className="px-4 py-2">
        {/* <Link href={`/user/${item._id}`}> */}
        <h3 className="text-base">#{item._id}</h3>
        {/* <p className="text-base text-gray-500">#{item.id}</p> */}
        {/* </Link> */}
      </td>
      <td className="hidden px-4 py-2 lg:table-cell">
        <p className="text-base ">{item.name}</p>
      </td>
      <td className="hidden px-4 py-2 lg:table-cell">
        <p className="text-base text-gray-500">{item.hot}</p>
      </td>
      <td className="hidden px-4 py-2 md:table-cell">
        <div className="flex w-full flex-col ">
          <p className="text-base">{format(item.createAt, "PPP")}</p>
          <p className="pt-1 text-base text-gray-500">
            {new Date(item.createAt).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </p>
        </div>
      </td>

      <td className="hidden px-4 py-2 lg:table-cell">
        {/* {item.status === true ? <Active /> : <Off />} */}
      </td>
    </tr>
  );
  return (
    <div className="background-light700_dark400 text-dark100_light500 flex size-full flex-col p-4 text-base">
      <Headers
        title={""}
        titleFirstButton={""}
        firstIcon={""}
        titleSecondButton={""}
        secondIcon={""}
        onClickFirstButton={function (): void {
          throw new Error("Function not implemented.");
        }}
        onClickSecondButton={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <div className=" mt-4 w-full rounded-md shadow-md">
        <div className=" mt-0 flex w-full flex-col items-center justify-between gap-4 rounded-md md:flex-row">
          <div className="w-full px-4">
            <TableSearch
              onSearch={setSearchQuery}
              onSort={function (searchQuery: string): void {
                throw new Error("Function not implemented.");
              }}
            />
          </div>
          <div className="flex items-center justify-between gap-4 p-4">
            <Menubar className="relative border-none bg-transparent py-4 shadow-none">
              <MenubarMenu>
                <MenubarTrigger className="flex items-center gap-2">
                  <Button className=" flex h-[35px] items-center gap-1 rounded-lg border-2 px-4 py-2 text-sm shadow-md transition-opacity duration-300 hover:opacity-75">
                    <Icon
                      icon="tabler:adjustments-horizontal"
                      width={14}
                      height={14}
                      className="text-dark100_light500"
                    />
                    <p className="text-dark100_light500">Filter</p>
                  </Button>
                </MenubarTrigger>
                <MenubarContent className="text-dark100_light500 absolute -right-12 top-full z-50 mt-3 h-auto w-40 bg-gray-50 font-sans text-sm shadow-md">
                  <MenubarItem
                    className="flex w-full cursor-pointer items-center justify-start px-2 text-center hover:bg-primary-100 hover:text-white"
                    onSelect={() => setFilterOption("online")}
                  >
                    <p className="p-1 pb-2">Active</p>
                  </MenubarItem>
                  <MenubarItem
                    className="flex w-full cursor-pointer items-center justify-start px-2 text-center hover:bg-primary-100 hover:text-white"
                    onSelect={() => setFilterOption("offline")}
                  >
                    <p className="p-1 pb-2">InActive</p>
                  </MenubarItem>
                  <MenubarSeparator />
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
        {/* LIST */}
        <div className="w-full px-4">
          <Table
            columns={columns}
            renderRow={renderRow}
            data={currentData}
            onSort={(key: string) => requestSort(key as SortableKeys)}
          />
        </div>
        {/* PAGINATION */}
        <div className=" mt-4 flex items-center justify-center p-4 text-sm text-gray-500 md:justify-between">
          <PaginationUI paginationUI={paginationUI} />
        </div>
      </div>
    </div>
  );
};

export default Page;
