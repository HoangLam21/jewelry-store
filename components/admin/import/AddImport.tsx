import TitleSession from "@/components/shared/label/TitleSession";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ImportData, ProductsData } from "@/constants/data";
import { format } from "date-fns";
import InputEdit from "@/components/shared/input/InputEdit";
import InputSelection from "@/components/shared/input/InputSelection";
import LabelInformation from "@/components/shared/label/LabelInformation";
import ImportCard from "@/components/shared/card/ImportCard";
import { formatPrice } from "@/lib/utils";
import ImportOrderCard from "@/components/shared/card/ImportOrderCard";

interface Invoice {
  id: string;
  productName: string;
  productImage: string;
  unitPrice: number;
  quantity: number;
  discount: number;
}

interface Import {
  id: string;
  suplier: {
    id: string;
    phoneNumber: string;
    fullname: string;
    address: string;
  };
  invoice: Invoice[];
  status: "Pending";
  createAt: Date;
  createBy: string;
}

interface Product {
  id: string;
  image: string;
  productName: string;
  price: string;
  material: string;
  quantity: number;
}

const stockInfTitle = "font-medium text-[16px] ";

const AddImport = () => {
  const [item, setItem] = useState<Import>({
    id: "",
    suplier: {
      id: "",
      phoneNumber: "",
      fullname: "",
      address: "",
    },
    invoice: [], // Khởi tạo mảng rỗng
    status: "Pending",
    createAt: new Date(), // Ngày hiện tại
    createBy: "",
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // State to store the selected product

  if (!item || !item.invoice) {
    return (
      <div className="flex w-full h-full items-center justify-center bg-white">
        <div className="loader"></div>
      </div>
    );
  }

  // Handle saving the import
  const handleSave = () => {
    if (item) {
      console.log("Saved product: ", item);
    }
  };

  // Handle supplier field changes
  const changeSuplierField = (
    field: keyof Import["suplier"],
    value: string
  ) => {
    setItem((prev) => ({
      ...prev,
      suplier: {
        ...prev.suplier,
        [field]: value,
      },
    }));
  };

  // Function to add product to cart
  const [cartItems, setCartItems] = useState<Product[]>([]); // State to store products in the cart

  // Function to add product to cart

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        // Update quantity if item already exists in cart
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateCart = (updatedItem: Product) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const totalAmount = cartItems.reduce(
    (total, item) =>
      total + parseFloat(item.price.replace("$", "")) * item.quantity,
    0
  );

  const totalDiscount = cartItems.reduce(
    (total, item) =>
      total +
      parseFloat(item.price.replace("$", "")) *
        item.quantity *
        (item.quantity / 100),
    0
  );

  console.log(cartItems, "this iss carrt iteam");

  return (
    <div className="w-full h-full rounded-md shadow-md">
      <div className="p-4 flex flex-col gap-4">
        {/* Import Information */}
        <div className="w-full flex gap-20 items-center">
          <div className="rounded-lg w-28 h-20 flex items-center justify-center border">
            <p>NH {item.id}</p>
          </div>
          <div className="flex-1 grid grid-cols-1 gap-2">
            <LabelInformation
              title="Create At"
              content={`${format(item.createAt, "PPP")}`}
            />
            <LabelInformation title="Status" content={item.status} />
            <LabelInformation title="Staff id" content={item.createBy} />
          </div>
        </div>

        {/* Supplier Information */}
        <TitleSession title="Supplier Information" />
        <div className="grid grid-cols-1 gap-2">
          <InputEdit
            titleInput="Name"
            value={item.suplier.fullname}
            onChange={(e) => changeSuplierField("fullname", e.target.value)}
            width="w-full"
            placeholder="Enter suplier name..."
          />
          <InputEdit
            titleInput="Phone number"
            value={item.suplier.phoneNumber}
            onChange={(e) => changeSuplierField("phoneNumber", e.target.value)}
            width="w-full"
            placeholder="Enter suplier phone number..."
          />
          <InputEdit
            titleInput="Address"
            value={item.suplier.address}
            onChange={(e) => changeSuplierField("address", e.target.value)}
            width="w-full"
            placeholder="Enter suplier address..."
          />
        </div>

        {/* Invoice Detail */}
        <TitleSession title="Import Product" />
        <div className="w-full h-4/6 flex overflow-hidden">
          <div className="container grid md:grid-cols-3 lg:grid-cols-5 grid-cols-1 w-full gap-8 max-h-[400px] md:w-2/3 lg:w-3/4 overflow-y-auto pr-2">
            {ProductsData.map((product: Product) => (
              <ImportCard
                key={product.id}
                item={product}
                onClick={() => addToCart(product)}
              />
            ))}
          </div>

          {/* Cart Section */}
          <div className="flex flex-col md:w-2/5 w-2/3 lg:w-2/5 max-h-[400px]">
            {cartItems.length > 0 ? (
              <div className="container w-full flex flex-col overflow-y-auto rounded-lg p-4 pt-2">
                <h4 className="text-[18px] font-semibold">In cart:</h4>
                <hr className="my-2" />
                <div>
                  {/* Map over cart items and display them */}
                  {cartItems.map((cartItem) => (
                    <div key={cartItem.id} className="flex flex-col gap-4">
                      <ImportOrderCard
                        item={cartItem}
                        updateCart={updateCart}
                      />
                    </div>
                  ))}
                </div>

                <hr className="my-2" />

                {/* Cart summary section */}
                <div className="w-full flex flex-col gap-4 p-2">
                  <div className="HDNH_maincontent_footer_total flex justify-between">
                    <span className={stockInfTitle}>Sub total:</span>
                    <div className="HDNH_total">{totalAmount}</div>
                  </div>
                  <div className="HDNH_maincontent_footer_discount flex justify-between">
                    <span className={stockInfTitle}>Discount:</span>
                    <div className="HDNH_discount">{totalDiscount}</div>
                  </div>
                  <hr className="my-2" />
                  <div className="HDNH_maincontent_footer_finaltotal flex justify-between">
                    <span className="font-bold text-[16px]">Total:</span>
                    <div className="HDNH_finaltotal font-bold">
                      {totalAmount - totalDiscount}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddImport;
