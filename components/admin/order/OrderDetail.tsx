import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ImportData } from "@/constants/data";
import LabelInformation from "@/components/shared/label/LabelInformation";
import TitleSession from "@/components/shared/label/TitleSession";
import TableImport from "@/components/shared/table/TableImport";
import { format } from "date-fns";
import Image from "next/image";

interface Invoice {
  id: string;
  productName: string;
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
  status: boolean;
  createAt: Date;
  createBy: string;
}

const columns = [
  { header: "Products", accessor: "products" },
  { header: "Products Name", accessor: "productName" },
  { header: "Unit price", accessor: "unitPrice" },
  { header: "Quantity", accessor: "quantity" },
  { header: "Amount", accessor: "amount" },
];

const OrderDetail = () => {
  const { id } = useParams();
  const [isImport, setIsImport] = useState<Import | null>(null);

  useEffect(() => {
    if (id) {
      const foundItem = ImportData.find((item) => item.id === id);
      if (foundItem) {
        setIsImport(foundItem);
      }
    }
  }, [id]);

  if (!isImport || !isImport.invoice) {
    return (
      <div className="flex w-full h-full items-center justify-center bg-white">
        <div className="loader"></div>
      </div>
    );
  }

  const renderRow = (it: Invoice) => (
    <>
      <tr
        key={it.id}
        className="border-t border-gray-300 my-4 text-sm dark:text-dark-360"
      >
        <td className="px-4 py-2">
          <div className="flex items-center">
            <div className="w-[50px] h-115px ">
              <Image
                src="https://i.pinimg.com/736x/4f/2c/33/4f2c33c135491cf44af2685e5cca8902.jpg"
                alt="productImage"
                width={50}
                height={115}
                className="rounded-md object-cover w-full h-full"
              />
            </div>
          </div>
        </td>
        <td className="px-4 py-2">{it.productName}</td>
        <td className="px-4 py-2">{it.unitPrice}</td>
        <td className="px-4 py-2">{it.quantity}</td>
        <td className="px-4 py-2 hidden md:table-cell">
          {`${(it.quantity * it.unitPrice).toLocaleString("vi-VN")} VND`}
        </td>
      </tr>
    </>
  );

  const calculateTotal = (invoiceItems: any[]) => {
    let subtotal = 0;
    let totalDiscount = 0;

    // Calculate the subtotal and discount for each product in the invoice
    invoiceItems.forEach((item: any) => {
      const itemSubtotal = item.unitPrice * item.quantity; // Total price before discount
      const itemDiscount = (itemSubtotal * item.discount) / 100; // Discount amount

      subtotal += itemSubtotal;
      totalDiscount += itemDiscount;
    });

    // Calculate the total after discount
    const total = subtotal - totalDiscount;

    return {
      subtotal,
      totalDiscount,
      total,
    };
  };

  // Calculate the grand total for all invoices in the data
  const grandTotal = isImport.invoice.reduce(
    (acc, item) => {
      const { subtotal, totalDiscount, total } = calculateTotal([item]);
      acc.subtotal += subtotal;
      acc.totalDiscount += totalDiscount;
      acc.total += total;
      return acc;
    },
    { subtotal: 0, totalDiscount: 0, total: 0 }
  );

  return (
    <div className="w-full h-full rounded-md shadow-md">
      <div className="p-4 flex flex-col gap-4">
        {/* Import Information */}
        <div className="w-full flex gap-20 items-center">
          <div className="rounded-lg w-28 h-20 flex items-center justify-center border">
            <p># {id}</p>
          </div>
          <div className="flex-1 grid grid-cols-1">
            <LabelInformation
              title="Create At"
              content={`${format(isImport.createAt, "PPP")}`}
            />
            <LabelInformation
              title="Status"
              content={`${isImport.status ? "Done" : "Pending"}`}
            />
            <LabelInformation
              title="Created By"
              content={`${isImport.createBy}`}
            />
          </div>
        </div>

        {/* Supplier Information */}
        <TitleSession title="Supplier Information" />
        <div className="grid grid-cols-1 gap-2 ">
          <LabelInformation
            title="Name"
            content={`${isImport.suplier.fullname}`}
          />
          <LabelInformation
            title="Phone number"
            content={`${isImport.suplier.phoneNumber}`}
          />
          <LabelInformation
            title="Address"
            content={`${isImport.suplier.address}`}
          />
        </div>

        {/* Invoice Detail */}

        <TitleSession title="Order Detail" />
        <p className="font-semibold text-[16px]">Purchased product</p>
        <TableImport
          columns={columns}
          data={isImport.invoice}
          renderRow={renderRow}
        />

        <div className=" w-full flex flex-col justify-start items-end py-8">
          <div className="w-1/3 flex justify-between">
            <h3 className="font-semibold text-[20px]">Sub Total:</h3>
            <p className="text-[16px]">
              {grandTotal.subtotal.toLocaleString("vi-VN")} VND
            </p>
          </div>
          <div className="w-1/3 flex justify-between">
            <h3 className="font-semibold text-[20px]">Discount:</h3>
            <p className="text-[16px]">
              {grandTotal.totalDiscount.toLocaleString("vi-VN")} VND
            </p>
          </div>
          <div className="w-1/3 flex justify-between">
            <h3 className="font-semibold text-[20px]">Total:</h3>
            <p className="text-[16px]">
              {grandTotal.total.toLocaleString("vi-VN")} VND
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
