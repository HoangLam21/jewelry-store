"use client";
import InputEdit from "@/components/shared/input/InputEdit";
import InputSelection from "@/components/shared/input/InputSelection";
import InputUnEdit from "@/components/shared/input/InputUnEdit";
import SwiperProduct from "@/components/shared/swiper/SwiperImage";
import TableImport from "@/components/shared/table/TableImport";
import { Button } from "@/components/ui/button";
import { ProductsData } from "@/constants/data";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

interface ImageInfo {
  url: string;
  fileName: string;
}
interface Product {
  id: string;
  image: string;
  imageInfo: ImageInfo[];
  productName: string;
  price: string;
  material: string;
  description: string;
  vouchers: string;
  provider: string;
  size: string;
  color: string;
  category: string;
  quantity: number;
}

interface Props {
  detailProduct: Product;
  onBack: (value: boolean) => void;
}

const ProductEdit = ({ detailProduct, onBack }: Props) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [imageList, setImageList] = useState<ImageInfo[]>(
    detailProduct.imageInfo
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [item, setItem] = useState<Product>({
    id: "1",
    image: "",
    imageInfo: [
      {
        url: "",
        fileName: ""
      }
    ],
    productName: "",
    price: "",
    material: "",
    description: "",
    vouchers: "",
    provider: "",
    category: "",
    size: "",
    color: "",
    quantity: 0
  });
  const handleAdd = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files).map((file) => ({
        url: URL.createObjectURL(file), // Tạo URL để hiển thị ảnh
        fileName: file.name
      }));
      setImageList((prevList) => [...prevList, ...newFiles]); // Kết hợp ảnh mới với ảnh cũ
    }
  };
  const handleRemoveImage = (fileName: string) => {
    setImageList((prevList) =>
      prevList.filter((img) => img.fileName !== fileName)
    );
  };

  const handleChangeProductInputFields = (
    field: keyof Omit<
      Product,
      | "id"
      | "image"
      | "subImage"
      | "vouchers"
      | "provider"
      | "category"
      | "quantity"
    >,
    value: string
  ) => {
    setItem((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log("save");
  };

  const columns = [
    { header: "Image", accessor: "image" },
    {
      header: "Name",
      accessor: "name"
    }
  ];
  const renderRow = (img: ImageInfo) => (
    <tr
      key={img.fileName}
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
          onClick={() => handleRemoveImage(img.fileName)} // Xoá ảnh khi click
        />
      </td>
    </tr>
  );
  return (
    <div className="modal-overlay">
      <div className="w-[880px] h-[600px] rounded-lg background-light800_dark300 items-center justify-start flex flex-col shadow-sm drop-shadow-sm shadow-zinc-700 p-2 gap-4">
        <div className="flex flex-row justify-between items-start w-full h-fit">
          <InputEdit
            titleInput="Product Name"
            onChange={(e) =>
              handleChangeProductInputFields("productName", e.target.value)
            }
            width="w-[70%]"
            placeholder={detailProduct.productName}
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
                data={imageList}
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
          <div className="flex flex-col flex-grow-0 h-full justify-between items-center">
            <div className="flex flex-col gap-4 items-start justify-start w-full h-fit ">
              <div className="flex flex-row gap-4 w-full h-fit">
                <div className="w-1/2 h-fit gap-4 flex flex-col">
                  <InputUnEdit
                    titleInput="ID"
                    value={detailProduct.id}
                    width="w-full"
                  />
                  <InputSelection
                    width="w-full"
                    titleInput="Category"
                    options={["Gold", "Silver", "Bronze"]}
                    value={item?.category ?? "None"}
                    onChange={(value) => {
                      setItem((prev) => ({
                        ...prev!,
                        category: value
                      }));
                    }}
                  />
                </div>
                <div className="w-1/2 h-fit gap-4 flex flex-col">
                  <InputEdit
                    titleInput="Material"
                    onChange={(e) =>
                      handleChangeProductInputFields("material", e.target.value)
                    }
                    width="w-full"
                    placeholder={detailProduct.material}
                  />
                  <InputEdit
                    titleInput="Price"
                    onChange={(e) =>
                      handleChangeProductInputFields("price", e.target.value)
                    }
                    width="w-full"
                    placeholder={detailProduct.price}
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
                  placeholder={detailProduct.description}
                />
              </div>
              <div className="flex flex-row gap-4 w-full h-fit">
                <InputSelection
                  width="w-full"
                  titleInput="Voucher"
                  options={["20%", "40%", "None"]}
                  value={item?.vouchers ?? "None"}
                  onChange={(value) => {
                    setItem((prev) => ({
                      ...prev!,
                      vouchers: value
                    }));
                  }}
                />
                <InputUnEdit
                  titleInput="Quantity"
                  value={detailProduct.quantity ? detailProduct.quantity : 0}
                  width="w-full"
                />
              </div>
              <div className="flex flex-row gap-4 w-full h-fit">
                <InputEdit
                  titleInput="Size"
                  onChange={(e) =>
                    handleChangeProductInputFields("size", e.target.value)
                  }
                  width="w-full"
                  placeholder={detailProduct.size}
                />
                <InputEdit
                  titleInput="Color"
                  onChange={(e) =>
                    handleChangeProductInputFields("color", e.target.value)
                  }
                  width="w-full"
                  placeholder={detailProduct.color}
                />
              </div>
            </div>
            <div className="flex justify-end w-full items-center pr-4 pb-2">
              <Button
                className="bg-green-600 hover:bg-green-600 text-dark-100 paragraph-regular py-2 px-3 rounded-lg w-fit"
                onClick={handleSave}
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
  );
};

export default ProductEdit;
