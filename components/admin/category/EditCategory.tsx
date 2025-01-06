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
import {
  CategoryResponse,
  CreateCategory,
  ProductAdditionToCategory
} from "@/dto/CategoryDTO";
import MyButton from "@/components/shared/button/MyButton";
import InputEdit from "@/components/shared/input/InputEdit";
import { defaultCategory } from "./CategoryList";
import InputSelection from "@/components/shared/input/InputSelection";
import Format from "@/components/shared/card/ConfirmCard";
import { Checkbox } from "@/components/ui/checkbox";
import {
  addProductToCategory,
  getDetailCategory,
  updateInfoCategory
} from "@/lib/service/category.service";
import { Product } from "../product/ProductList";
import { ProductResponse } from "@/dto/ProductDTO";
import { fetchProduct } from "@/lib/service/product.service";
import ConfirmModal, { ConfirmModalProps } from "../product/ConfirmModal";

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
  const [productList, setProductList] = useState<Product[]>([]);
  const [category, setCategory] = useState<CategoryResponse>(defaultCategory);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
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
        const preId: string[] = foundItem.products.map((item) => item._id);
        setSelectedIds(preId);
      }
    }

    const fetchData = async () => {
      try {
        const result: ProductResponse[] = await fetchProduct();
        if (result) {
          const data: Product[] = result.map((item) => ({
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

          setProductList(data);
        }
      } catch (err: any) {
        console.error("Error fetching data:", err);
        const errorMessage = err?.message || "An unexpected error occurred.";
        alert(`Error fetching data: ${errorMessage}`);
      }
    };

    fetchData();
    //     const fetchDetail = async () => {
    //   if (id) {
    //     try {
    //       const result: CategoryResponse = await getDetailCategory(id);
    //       if (result) {
    //         setCategory(result);
    //       } else {
    //         alert("Can't get detail category.");
    //       }
    //     } catch (err: any) {
    //       console.error("Error get detail data:", err);
    //       const errorMessage = err?.message || "An unexpected error occurred.";
    //       alert(`Error get detail data: ${errorMessage}`);
    //     }
    //   }
    // };
    // fetchDetail();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (updateCategory) {
      setUpdateCategory({
        ...updateCategory,
        [e.target.name]: e.target.value
      });
    }
  };
  const handleSelect = (isChecked: any, id: string) => {
    setSelectedIds((prevSelected) => {
      if (isChecked) {
        // Thêm ID vào danh sách nếu chưa có
        return [...prevSelected, id];
      } else {
        // Loại bỏ ID khỏi danh sách nếu đã có
        return prevSelected.filter((productId) => productId !== id);
      }
    });
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

  const filteredproducts = productList.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.productName.toLowerCase().includes(query) ||
      item.price.toLowerCase().includes(query) ||
      item.id.toString().includes(query)
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

  const renderRow = (item: Product) => (
    <tr key={item.id} className="my-4 border-t border-gray-300 text-sm">
      <td className="px-4 py-2">
        <h3 className="text-base">{item.price}</h3>
      </td>
      <td className="hidden px-4 py-2 lg:table-cell">
        <p className="text-base">{item.productName}</p>
      </td>
      <td className="hidden px-4 py-2 lg:table-cell">
        <p className="text-base text-gray-500">{item.price}</p>
      </td>
      <td className="hidden px-4 py-2 lg:table-cell">
        <Checkbox
          value={item.id}
          id={item.id}
          checked={selectedIds.includes(item.id)} // Kiểm tra xem ID đã được chọn trước hay chưa
          onCheckedChange={(isChecked) => handleSelect(isChecked, item.id)}
          className="data-[state=checked]:bg-primary-100 border-light-600 dark:border-dark-100 border data-[state=checked]:text-light-800 data-[state=checked]:border-none h-5 w-5 rounded-full dark:data-[state=checked]:bg-primary-100 dark:data-[state=checked]:text-light-800"
        />
      </td>
    </tr>
  );
  const handleUpdate = async () => {
    try {
      const params: CreateCategory = {
        name: updateCategory.name,
        description: updateCategory.description
      };
      const result = await updateInfoCategory(updateCategory._id, params);
      if (result) {
        for (const item of selectedIds) {
          const param: ProductAdditionToCategory = {
            categoryId: result._id,
            productId: item
          };
          const addedProduct = await addProductToCategory(param);
          console.log("Added product:", addedProduct.product);
        }
        alert("Update category successfully.");
      } else {
        alert("Can't update category.");
      }
    } catch (err: any) {
      console.error("Error update data:", err);
      const errorMessage = err?.message || "An unexpected error occurred.";
      alert(`Error update data: ${errorMessage}`);
    }
  };
  const [isConfirm, setIsConfirm] = useState(false);
  const [confirm, setConfirm] = useState<ConfirmModalProps>({
    setConfirm: () => {},
    handleAction: () => {},
    name: "",
    action: ""
  });
  const handleConfirmUpdate = () => {
    setIsConfirm(true);
    setConfirm({
      setConfirm: setIsConfirm,
      handleAction: () => handleUpdate(),
      name: " this category",
      action: "update"
    });
  };
  return (
    <>
      <div className="w-full flex flex-col p-4 rounded-md shadow-md">
        {/* General Information */}

        <TitleSession icon="" title="General Information" />

        <div className="w-full p-6 flex flex-col gap-6 ">
          <div className="w-full flex">
            <div className="w-full grid grid-rows-3 gap-2">
              <LabelInformation content={category._id} title="ID" />
              <div className="flex flex-row gap-5">
                <InputEdit
                  titleInput="Name"
                  width="w-full"
                  name="name"
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
              <div className="flex w-full h-fit">
                <InputEdit
                  titleInput="Description"
                  width="w-full"
                  name="description"
                  onChange={handleChange}
                  placeholder={
                    category.description
                      ? category.description
                      : "Enter description..."
                  }
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
        {/* Footer */}
        <div className="w-full flex justify-end p-6 ">
          <MyButton
            event={handleConfirmUpdate}
            width="w-28"
            background="bg-primary-100"
            text_color="text-white"
            title="Update"
          />
        </div>
      </div>
      {isConfirm && <ConfirmModal confirm={confirm} />}
    </>
  );
};

export default EditCategoryInformation;
