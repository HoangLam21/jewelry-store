export interface Import {
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

export interface Invoice {
  id: string;
  productName: string;
  productImage: string;
  unitPrice: number;
  quantity: number;
  discount: number;
}
