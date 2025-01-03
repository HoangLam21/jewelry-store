export interface CategoryResponse {
  _id: string;
  name: string;
  hot: boolean;
  products: {
    _id: string;
    fullName: string;
    cost: number;
  }[];
  createAt: string;
}

export interface CreateCategory {
  name: string;
  description: string;
}
