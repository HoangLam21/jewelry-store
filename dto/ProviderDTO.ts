export interface ImportInvoice {
  id: string;
  createAt: string;
  createBy: string;
  total: number;
  status: number;
}

export interface Provider {
  _id: string;
  name: string;
  address: string;
  representativeName: string;
  createAt: Date;
  contact: string;
  city: string;
  country: string;
  email: string;
  numberImportInvoice: ImportInvoice[];
}
