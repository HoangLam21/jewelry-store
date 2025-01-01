"use client";
import Format from "@/components/shared/card/ConfirmCard";
import InputEdit from "@/components/shared/input/InputEdit";
import InputVariant from "@/components/shared/input/InputProduct";
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
interface Sizes {
  size: string;
  stock: number;
}
interface Variant {
  material: string;
  sizes: Sizes[];
}
interface Product {
  id: string;
  image: string;
  imageInfo: ImageInfo[];
  productName: string;
  price: string;
  description: string;
  vouchers: string;
  provider: string;
  category: string;
  variants: Variant[];
}

interface Props {
  detailProduct: Product;
  onBack: (value: boolean) => void;
}

const ProductEdit = ({ detailProduct, onBack }: Props) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [onRemove, setOnRemove] = useState(false);
  const [imageList, setImageList] = useState<ImageInfo[]>(
    detailProduct.imageInfo
  );
  const [variantList, setVariantList] = useState<Variant[]>(
    detailProduct.variants
  );
  const [sizeToRemove, setSizeToRemove] = useState<{
    material: string;
    size: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  //Images
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
    price: "0.00",
    description: "",
    vouchers: "",
    provider: "",
    category: "",
    variants: [
      {
        material: "gold",
        sizes: [
          { size: "X", stock: 10 },
          { size: "M", stock: 15 },
          { size: "L", stock: 5 }
        ]
      },
      {
        material: "silver",
        sizes: [
          { size: "X", stock: 20 },
          { size: "M", stock: 10 },
          { size: "L", stock: 8 }
        ]
      }
    ]
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

  //Variant
  const handleSelectSizeToRemove = (material: string, size: string) => {
    setSizeToRemove({ material, size });
  };
  const handleRemoveSize = () => {
    if (sizeToRemove) {
      const { material, size } = sizeToRemove;

      // Cập nhật lại danh sách sizes và variants sau khi xóa size
      setVariantList(
        (prevVariants) =>
          prevVariants
            .map((variant) => {
              if (variant.material === material) {
                const updatedSizes = variant.sizes.filter(
                  (s) => s.size !== size
                );
                return { ...variant, sizes: updatedSizes };
              }
              return variant;
            })
            .filter((variant) => variant.sizes.length > 0) // Xóa material nếu không còn size
      );
      setOnRemove(false);
      setSizeToRemove(null); // Sau khi xóa, reset state
    }
  };
  const handleCancelConfirm = () => {
    setOnRemove(false);
    setSizeToRemove(null);
  };
  const handleConfirmRemoveSize = (material: string, size: string) => {
    setOnRemove(true);
    handleSelectSizeToRemove(material, size);
  };
  const handleAddVariant = () => {
    setVariantList((prevVariants) => [
      ...prevVariants,
      {
        material: "New Material",
        sizes: []
      }
    ]);
  };
  // Hàm xử lý thay đổi các trường trong Variant (ngoài size)
  const handleChangeVariantInputFields = (
    material: string,
    field: keyof Variant,
    value: any
  ) => {
    setVariantList((prevVariants) =>
      prevVariants.map((variant) =>
        variant.material === material ? { ...variant, [field]: value } : variant
      )
    );
  };
  // Hàm xử lý thay đổi giá trị của size trong mảng sizes
  const handleChangeSizeInVariant = (
    material: string,
    size: string,
    field: keyof Sizes,
    value: any
  ) => {
    setVariantList((prevVariants) =>
      prevVariants.map((variant) =>
        variant.material === material
          ? {
              ...variant,
              sizes: variant.sizes.map((s) =>
                s.size === size ? { ...s, [field]: value } : s
              )
            }
          : variant
      )
    );
  };

  const handleChangeProductInputFields = (
    field: keyof Omit<
      Product,
      "id" | "image" | "subImage" | "vouchers" | "provider" | "category"
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

  const columnsVariant = [
    { header: "Material", accessor: "material" },
    {
      header: "Size",
      accessor: "size"
    },
    {
      header: "Stock",
      accessor: "stock"
    }
  ];
  const renderRowVariant = (variant: Variant) => {
    return (
      <>
        <tr
          key={variant.material}
          className="border-t border-gray-300 text-sm dark:text-dark-360"
        >
          {/* Cột Material */}
          <td rowSpan={variant.sizes.length || 1} className="px-4 py-2">
            <InputVariant
              value={variant.material}
              placeholder={variant.material}
              onChange={(e) =>
                handleChangeVariantInputFields(
                  variant.material, // Xác định variant nào cần thay đổi
                  "material", // Trường cần thay đổi
                  e.target.value // Giá trị mới
                )
              }
              width="w-full"
            />
          </td>
          {/* Hiển thị Size và Stock từ hàng đầu tiên */}
          {variant.sizes.length > 0 ? (
            <>
              <td className="px-4 py-2">
                <InputVariant
                  value={variant.sizes[0].size}
                  placeholder={variant.sizes[0].size}
                  onChange={(e) =>
                    handleChangeSizeInVariant(
                      variant.material, // Xác định variant nào cần thay đổi
                      variant.sizes[0].size, // Xác định size nào cần thay đổi
                      "size", // Trường cần thay đổi (size hoặc stock)
                      e.target.value // Giá trị mới
                    )
                  }
                  width="w-full"
                />
              </td>
              <td className="px-4 py-2 flex items-center justify-between">
                <p className="text-sm dark:text-dark-360">
                  {variant.sizes[0].stock}
                </p>
              </td>
            </>
          ) : (
            <>
              <td colSpan={2} className="px-4 py-2 text-center">
                No sizes available
              </td>
            </>
          )}
          <td className="px-4 py-2">
            <Icon
              icon="gg:trash"
              width={18}
              height={18}
              className="text-red-700 cursor-pointer"
              onClick={() =>
                handleConfirmRemoveSize(variant.material, variant.sizes[0].size)
              }
            />
          </td>
        </tr>
        {/* Các hàng còn lại hiển thị thông tin sizes */}
        {variant.sizes.slice(1).map((sizeInfo, index) => (
          <tr
            key={`${variant.material}-${sizeInfo.size}-${index}`}
            className="border-t border-gray-300 text-sm dark:text-dark-360"
          >
            <td className="px-4 py-2">
              <InputVariant
                value={sizeInfo.size}
                placeholder={sizeInfo.size}
                onChange={(e) =>
                  handleChangeSizeInVariant(
                    variant.material,
                    variant.sizes[0].size,
                    "size",
                    e.target.value
                  )
                }
                width="w-full"
              />
            </td>
            <td className="px-4 py-2 flex items-center justify-between">
              <p className="text-sm dark:text-dark-360">{sizeInfo.stock}</p>
            </td>
            <td className="px-4 py-2">
              <Icon
                icon="gg:trash"
                width={18}
                height={18}
                className="text-red-700 cursor-pointer"
                onClick={() =>
                  handleConfirmRemoveSize(variant.material, sizeInfo.size)
                }
              />
            </td>
          </tr>
        ))}
      </>
    );
  };
  return (
    <>
      <div className="modal-overlay">
        <div className="w-[1200px] h-[700px] rounded-lg background-light800_dark300 items-center justify-start flex flex-col shadow-sm drop-shadow-sm shadow-zinc-700 p-2 gap-3 overflow-y-scroll overflow-x-hidden scrollable">
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
            <div className="flex flex-col flex-grow-0 w-[50%] h-full justify-start gap-4 items-center">
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
                      options={["Rings", "Bracelets"]}
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
                      data={variantList}
                      renderRow={renderRowVariant}
                    />
                  </div>
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

      {onRemove && (
        <Format
          onClose={handleCancelConfirm}
          label="Remove"
          content="remove"
          userName={sizeToRemove?.size || ""}
          onConfirmDelete={handleRemoveSize}
          type="delete"
        />
      )}
    </>
  );
};

export default ProductEdit;
