export interface CategoryResponse {
  _id: string;
  name: string;
  hot: boolean;
  description: string;
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

export interface ProductAdditionToCategory {
  categoryId: string;
  productId: string;
}
