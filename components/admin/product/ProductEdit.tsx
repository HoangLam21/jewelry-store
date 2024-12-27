import InputUnEdit from "@/components/shared/input/InputUnEdit";
import SwiperProduct from "@/components/shared/swiper/SwiperImage";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface Product {
  id: string;
  image: string;
  subImage: string[];
  productName: string;
  price: string;
  material: string;
  description: string;
  vouchers: string;
  provider: string;
  category: string;
  size: string;
  color: string;
  quantity: number;
}

interface Props {
  detailProduct: Product;
  onBack: (value: boolean) => void;
}

const ProductEdit = ({ detailProduct, onBack }: Props) => {
  const router = useRouter();

  const handleSave = () => {
    router.push("/admin/import/add");
  };

  return (
    <div className="modal-overlay">
      <div className="w-[880px] h-[600px] rounded-lg background-light800_dark300 items-center justify-start flex flex-col shadow-sm drop-shadow-sm shadow-zinc-700 p-2 gap-4">
        {/* <div className="flex flex-col w-[50%] h-full items-start justify-start gap-4 flex-grow-0">
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
              subImage={detailProduct.subImage}
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
                className="bg-green-600 hover:bg-green-600 text-dark-100 paragraph-regular py-2 px-3 rounded-lg w-fit"
                onClick={handleSave}
              >
                Save
              </Button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ProductEdit;
