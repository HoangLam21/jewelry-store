import { CategoryResponse, CreateCategory } from "@/dto/CategoryDTO";

export async function fetchCategory(): Promise<CategoryResponse[]> {
  try {
    const response = await fetch(`/api/category/all-category`);
    if (!response.ok) {
      throw new Error("Error fetching category");
    }
    const data: CategoryResponse[] = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch category:", error);
    throw error;
  }
}
