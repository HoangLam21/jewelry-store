import InputUnEdit from "@/components/shared/input/InputUnEdit";
import SwiperProduct from "@/components/shared/swiper/SwiperImage";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

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
  onEdit: (id: string) => void;
  onBack: (value: boolean) => void;
}

const ProductDetail = ({ detailProduct, onBack, onEdit }: Props) => {
  const router = useRouter();

  const handleAddImport = () => {
    router.push("/admin/import/add");
  };

  return (
    <div className="modal-overlay">
      <div className="w-[880px] h-[600px] rounded-lg background-light800_dark300 items-center justify-start flex flex-row shadow-sm drop-shadow-sm shadow-zinc-700 pr-2 pb-6 gap-5">
        <div className="flex flex-col w-[50%] h-full items-start justify-start gap-4 flex-grow-0">
          <div className="flex w-full h-fit items-start justify-start">
            <Image
              src={detailProduct.image}
              alt="productImage"
              width={50}
              height={115}
              className="rounded-lg object-cover w-[750px] h-[350px]"
            />
          </div>
          <div className="w-full h-[80px] flex ">
            <SwiperProduct
              urlImage={detailProduct.imageInfo.map((item) => item.url)}
              width="80"
              height="80"
            />
          </div>
        </div>

        <div className="flex flex-col flex-grow h-full justify-between items-center">
          <div className="flex flex-col gap-6 w-full h-fit">
            <div className="flex flex-row items-start justify-between w-full h-fit pt-2">
              <div className="flex w-fit h-fit pt-4">
                <p className="text-dark100_light500 h3-bold">
                  {detailProduct.productName}
                </p>
              </div>
              <div className="flex w-fit h-fit justify-end items-center">
                <Icon
                  icon="iconoir:cancel"
                  width={24}
                  height={24}
                  className="text-dark100_light500 cursor-pointer"
                  onClick={() => onBack(false)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 items-start justify-start w-full h-fit pr-4">
              <div className="flex flex-row gap-4 w-full h-fit">
                <div className="w-1/2 h-fit gap-4 flex flex-col">
                  <InputUnEdit
                    titleInput="ID"
                    value={detailProduct.id}
                    width="w-full"
                  />
                  <InputUnEdit
                    titleInput="Category"
                    value={detailProduct.category}
                    width="w-full"
                  />
                </div>
                <div className="w-1/2 h-fit gap-4 flex flex-col">
                  <InputUnEdit
                    titleInput="Material"
                    value={detailProduct.material}
                    width="w-full"
                  />
                  <InputUnEdit
                    titleInput="Price"
                    value={detailProduct.price}
                    width="w-full"
                  />
                </div>
              </div>

              <div className="flex w-full h-fit">
                <InputUnEdit
                  titleInput="Description"
                  value={detailProduct.description}
                  width="w-full"
                  height="h-[70px]"
                />
              </div>
              <div className="flex flex-row gap-4 w-full h-fit">
                <InputUnEdit
                  titleInput="Voucher"
                  value={detailProduct.vouchers}
                  width="w-full"
                />
                <InputUnEdit
                  titleInput="Quantity"
                  value={detailProduct.quantity ? detailProduct.quantity : 0}
                  width="w-full"
                />
              </div>
              <div className="flex flex-row gap-4 w-full h-fit">
                <InputUnEdit
                  titleInput="Size"
                  value={detailProduct.size}
                  width="w-full"
                />
                <InputUnEdit
                  titleInput="Color"
                  value={detailProduct.color}
                  width="w-full"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end w-full items-center pr-4 pb-2">
            <div className="flex flex-row w-full h-fit gap-6 justify-end">
              <Button
                onClick={() => onEdit(detailProduct.id)}
                className="paragraph-regular text-primary-100 py-2 px-3 rounded-lg border-primary-100 w-fit shadow-none border"
              >
                Edit
              </Button>
              <Button
                className="bg-primary-100 hover:bg-primary-100 text-dark-100 paragraph-regular py-2 px-3 rounded-lg w-fit"
                onClick={handleAddImport}
              >
                Add import
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;