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

const defaultDetails = {
  "gold-S": 0,
  "gold-M": 0,
  "gold-L": 0,
  "silver-S": 0,
  "silver-M": 0,
  "silver-L": 0,
};
