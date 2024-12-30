interface Import {
  id: string;
  suplier: {
    id: string;
    phoneNumber: string;
    fullname: string;
    address: string;
  };
  invoice: {
    id: string;
    productName: string;
    productImage: string;
    unitPrice: number;
    quantity: number;
    discount: number;
  }[];
  status: boolean;
  createAt: Date;
  createBy: string;
}

[
  {
    staff: "string",
    totalCost: 0,
    details: {
      additionalProp1: 0,
      additionalProp2: 0,
      additionalProp3: 0,
    },
  },
];
