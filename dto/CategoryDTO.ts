export interface CategoryResponse {
  name: string;
  hot: boolean;
  products: string[];
}

export interface CreateCategory {
  name: string;
  description: string;
}
