"use client";
import InputEdit from "@/components/shared/input/InputEdit";
import InputSelection from "@/components/shared/input/InputSelection";
import InputUnEdit from "@/components/shared/input/InputUnEdit";
import SwiperProduct from "@/components/shared/swiper/SwiperImage";
import TableImport from "@/components/shared/table/TableImport";
import { Button } from "@/components/ui/button";
import { ProductsData } from "@/constants/data";
import { formatCurrency, generateRandomID, parseCurrency } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { defaultDetailProduct, Product } from "./ProductList";
import { CombinedVariant, groupVariants } from "./ProductEdit";
import ConfirmModal, { ConfirmModalProps } from "./ConfirmModal";
import AddVariant from "./AddVariant";
import { fetchProvider } from "@/lib/service/provider.service";
import { fetchVoucher } from "@/lib/service/voucher.service";
import { CreateProduct, FileContent } from "@/dto/ProductDTO";
import { createProduct } from "@/lib/service/product.service";

export const convertFilesToFileContent = (files: File[]): FileContent[] => {
  return files.map((file) => ({
    _id: "", // Tạo ID duy nhất
    fileName: file.name, // Tên file
    url: URL.createObjectURL(file), // Tạo URL tạm thời từ File
    publicId: "", // Giá trị mặc định, có thể gán sau
    bytes: file.size.toString(), // Kích thước file (dạng chuỗi)
    width: "", // Giá trị mặc định, cần tính toán thêm nếu có
    height: "", // Giá trị mặc định, cần tính toán thêm nếu có
    format: file.type.split("/")[1] || "", // Định dạng file (phần sau `/` trong `type`)
    type: file.type // MIME type
  }));
};

interface Props {
  onBack: (value: boolean) => void;
  setList: React.Dispatch<React.SetStateAction<Product[]>>;
}

const AddProduct = ({ onBack, setList }: Props) => {
  const [onAdd, setOnAdd] = useState(false);
  const [randomValue, setRandomValue] = useState<string>(generateRandomID(8));
  const [selectedFiles, setSelectedFiles] = useState<FileContent[]>([]);
  const [providerList, setProviderList] = useState<string[]>([]);
  const [voucherList, setVoucherList] = useState<string[]>([]);
  const [combinedData, setCombinedData] = useState<CombinedVariant[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const fetchDataProvider = async () => {
      try {
        const result = await fetchProvider();

        if (result) {
          const providerId: string[] = result.map((item: any) => item._id);
          setProviderList(providerId);
        }
      } catch (err: any) {
        console.error("Error fetching data:", err);
        const errorMessage = err?.message || "An unexpected error occurred.";
        alert(`Error fetching data: ${errorMessage}`);
      }
    };

    const fetchDataVoucher = async () => {
      try {
        const result = await fetchVoucher();

        if (result) {
          const voucherId: string[] = result.map((item: any) => item._id);
          setVoucherList(voucherId);
        }
      } catch (err: any) {
        console.error("Error fetching data:", err);
        const errorMessage = err?.message || "An unexpected error occurred.";
        alert(`Error fetching data: ${errorMessage}`);
      }
    };
    fetchDataProvider();
    fetchDataVoucher();
  }, []);

  //RENDER IMAGE
  const handleRemoveFile = (url: string) => {
    const newFiles = selectedFiles.filter((file) => file.url !== url);
    setSelectedFiles(newFiles);
  };
  const [item, setItem] = useState<Product>(defaultDetailProduct);
  const handleAdd = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // Chuyển đổi các file thành dạng FileContent trước
      const fileArray = Array.from(files);
      const convertedFiles = convertFilesToFileContent(fileArray);

      // Cập nhật lại trạng thái với các file đã chuyển đổi
      setSelectedFiles((prevFiles) => [...prevFiles, ...convertedFiles]);
    }
  };
  const columns = [
    { header: "Image", accessor: "image" },
    {
      header: "Name",
      accessor: "name"
    }
  ];
  const renderRow = (img: FileContent) => {
    return (
      <tr
        key={`${img.fileName}`}
        className="border-t border-gray-300 text-sm dark:text-dark-360"
      >
        <td className="px-4 py-2">
          <Image
            src={img.url}
            alt="editImg"
            width={40}
            height={40}
            className="rounded-lg object-cover w-10 h-10"
          />
        </td>
        <td className="px-4 py-2">
          <p className="text-sm dark:text-dark-360">{img.fileName}</p>
        </td>
        <td className="px-4 py-2">
          <Icon
            icon="gg:trash"
            width={18}
            height={18}
            className="text-red-700 cursor-pointer"
            onClick={() => handleRemoveFile(img.url)}
          />
        </td>
      </tr>
    );
  };

  const handleChangeProductInputFields = (
    field: keyof Omit<
      Product,
      "id" | "vouchers" | "provider" | "category" | "quantity"
    >,
    value: string
  ) => {
    setItem((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  //RENDER VARIANT
  const handleDelete = (material: string, size: string) => {
    setCombinedData((prev) =>
      prev.filter((item) => !(item.material === material && item.size === size))
    );
  };
  const [isConfirm, setIsConfirm] = useState(false);
  const [confirm, setConfirm] = useState<ConfirmModalProps>({
    setConfirm: () => {},
    handleAction: () => {},
    name: "",
    action: ""
  });
  const handleConfirmDelete = (material: string, size: string) => {
    setIsConfirm(true);
    setConfirm({
      setConfirm: setIsConfirm,
      handleAction: () => handleDelete(material, size),
      name: " this variant",
      action: "remove"
    });
  };
  const handleAddVariant = () => {
    setOnAdd(true);
  };
  const columnsVariant = [
    { header: "Material", accessor: "material" },
    {
      header: "Size",
      accessor: "size"
    },
    {
      header: "Stock",
      accessor: "stock"
    },
    {
      header: "Added",
      accessor: "addOn"
    }
  ];
  const renderRowVariant = (data: CombinedVariant) => {
    return (
      <tr
        key={`${data.material}-${data.size}`}
        className="border-t border-gray-300 text-sm dark:text-dark-360"
      >
        {/* Cột Material */}
        <td className="px-4 py-2">
          <p className="text-sm dark:text-dark-360">{data.material}</p>
        </td>
        {/* Cột Size */}
        <td className="px-4 py-2">
          <p className="text-sm dark:text-dark-360">{data.size}</p>
        </td>
        {/* Cột Stock */}
        <td className="px-4 py-2">
          <p className="text-sm dark:text-dark-360">{data.stock}</p>
        </td>
        {/* Cột AddOn */}
        <td className="px-4 py-2">
          <p className="text-sm dark:text-dark-360">
            {formatCurrency(data.addOn)}
          </p>
        </td>
        {/* Cột Action */}
        <td className="px-4 py-2">
          <Icon
            icon="gg:trash"
            width={18}
            height={18}
            className="text-red-700 cursor-pointer"
            onClick={() => handleConfirmDelete(data.material, data.size)}
          />
        </td>
      </tr>
    );
  };

  //SAVE
  const handleSave = async () => {
    if (item) {
      const data: CreateProduct = {
        name: item.productName,
        cost: parseCurrency(item.price),
        description: item.description,
        images: selectedFiles,
        vouchers: item.vouchers,
        provider: item.provider,
        category: item.category,
        collections: item.collection,
        variants: groupVariants(combinedData)
      };
      console.log(data);
      const result = await createProduct(data);
      console.log(result);
      if (result) {
        setList((prev) => [
          ...prev,
          {
            id: item.id,
            image: item.image,
            imageInfo: selectedFiles,
            productName: item.productName,
            price: formatCurrency(Number(item.price)),
            collection: item.collection,
            description: item.description,
            vouchers: item.vouchers,
            provider: item.provider,
            category: item.category,
            variants: groupVariants(combinedData)
          }
        ]);

        alert("Update information of customer");
      } else {
        alert("Can't update information of customer");
      }
    } else alert("No information of customer to update");
    console.log("save");
  };
  const handleConfirmSave = () => {
    setIsConfirm(true);
    setConfirm({
      setConfirm: setIsConfirm,
      handleAction: handleSave,
      name: "new product",
      action: "create"
    });
  };

  return (
    <>
      <div className="modal-overlay">
        <div className="w-[1200px] h-[600px] rounded-lg background-light800_dark300 items-center justify-start flex flex-col shadow-sm drop-shadow-sm shadow-zinc-700 p-2 gap-4 overflow-y-scroll overflow-x-hidden scrollable">
          <div className="flex flex-row justify-between items-start w-full h-fit">
            <InputEdit
              titleInput="Product Name"
              onChange={(e) =>
                handleChangeProductInputFields("productName", e.target.value)
              }
              width="w-[70%]"
              placeholder="Enter the name of product"
            />
            <Icon
              icon="iconoir:cancel"
              width={24}
              height={24}
              className="text-dark100_light500 cursor-pointer"
              onClick={() => onBack(false)}
            />
          </div>

          <div className="flex flex-row justify-between items-start w-full h-full">
            <div className="flex flex-col gap-2 w-[45%]">
              <p className="text-text-dark-400">Image List:</p>
              <div className="flex border border-border-color rounded-lg w-full h-fit">
                <TableImport
                  columns={columns}
                  data={selectedFiles}
                  renderRow={renderRow}
                />
              </div>
              <div className="flex w-full h-fit justify-end items-center mt-2">
                <Button
                  className="bg-import-bg-blue hover:bg-import-bg-blue text-primary-100 paragraph-regular p-2 rounded-[20px] gap-[2px] w-fit"
                  onClick={handleAdd}
                >
                  <Icon
                    icon="ic:round-add"
                    height={16}
                    width={16}
                    className="text-primary-100"
                  />
                  Add
                </Button>
              </div>
            </div>
            <div className="flex flex-col flex-grow-0 w-[50%] h-full justify-start items-center gap-4">
              <div className="flex flex-col gap-4 items-start justify-start w-full h-fit ">
                <div className="flex flex-row gap-4 w-full h-fit">
                  <div className="w-1/2 h-fit gap-4 flex flex-col">
                    <InputUnEdit
                      titleInput="ID"
                      value={randomValue}
                      width="w-full"
                    />
                    <InputSelection
                      width="w-full"
                      titleInput="Provider"
                      options={providerList}
                      value={item?.provider ?? "None"}
                      onChange={(value) => {
                        setItem((prev) => ({
                          ...prev!,
                          provider: value
                        }));
                      }}
                    />
                  </div>
                  <div className="w-1/2 h-fit gap-4 flex flex-col">
                    <InputSelection
                      width="w-full"
                      titleInput="Voucher"
                      options={voucherList}
                      value={item?.vouchers ?? "None"}
                      onChange={(value) => {
                        setItem((prev) => ({
                          ...prev!,
                          vouchers: value
                        }));
                      }}
                    />
                    <InputEdit
                      titleInput="Price"
                      onChange={(e) =>
                        handleChangeProductInputFields("price", e.target.value)
                      }
                      width="w-full"
                      placeholder="Enter price of product..."
                    />
                  </div>
                </div>
                <div className="flex w-full h-fit">
                  <InputEdit
                    titleInput="Description"
                    onChange={(e) =>
                      handleChangeProductInputFields(
                        "description",
                        e.target.value
                      )
                    }
                    width="w-full"
                    placeholder="Enter some description..."
                  />
                </div>

                <div className="flex flex-col gap-4 w-full h-fit">
                  <div className="w-full h-fit flex justify-end items-end">
                    <Button
                      onClick={handleAddVariant}
                      className="bg-primary-100 hover:bg-primary-100 text-dark-100 paragraph-regular py-2 px-3 rounded-lg w-fit"
                    >
                      Add more Material
                    </Button>
                  </div>
                  <div className="flex border border-border-color rounded-lg w-full h-fit">
                    <TableImport
                      columns={columnsVariant}
                      data={combinedData}
                      renderRow={renderRowVariant}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end w-full items-center pr-4 pb-2">
                <Button
                  className="bg-green-600 hover:bg-green-600 text-dark-100 paragraph-regular py-2 px-3 rounded-lg w-fit"
                  onClick={handleConfirmSave}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* Input file ẩn để chọn file */}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          multiple // Cho phép chọn nhiều file
          onChange={handleFileChange}
        />
      </div>
      {isConfirm && <ConfirmModal confirm={confirm} />}
      {onAdd && (
        <AddVariant setCombinedData={setCombinedData} setOnAdd={setOnAdd} />
      )}
    </>
  );
};

export default AddProduct;
