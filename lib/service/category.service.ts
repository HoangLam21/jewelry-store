import { CategoryResponse, CreateCategory } from "@/dto/CategoryDTO";
import { CreateProduct, ProductResponse } from "@/dto/ProductDTO";

export async function fetchCategory(): Promise<CategoryResponse[]> {
  try {
    const response = await fetch(`/api/category/all`);
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

export async function getDetailCategory(
  id: string
): Promise<CategoryResponse | null> {
  // const token = localStorage.getItem("token");
  // if (!token) {
  //   console.error("Không tìm thấy token");
  //   throw new Error("Thiếu token xác thực.");
  // }

  try {
    // const response = await fetch(`/api/customer/${customerId}`, {
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   }
    // });
    const response = await fetch(`/api/category/get?id=${id}`);
    if (!response.ok) {
      throw new Error("Không thể lấy thông tin loai hang.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi khi lấy thông tin loai hang:", error);
    throw error;
  }
}

export async function deleteCategoryById(id: string) {
  try {
    console.log(`/api/category/remove?id=${id}`, "delete ");
    const response = await fetch(`/api/category/remove?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error deleting product");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to delete product:", error);
    throw error;
  }
}

export async function createCategory(
  params: CreateCategory
  // token: string
): Promise<CategoryResponse> {
  try {
    console.log(params, "param");
    const response = await fetch(`/api/category/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        // Authorization: `${token}`,
      },
      body: JSON.stringify({
        name: params.name,
        description: params.description
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error creating media");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to create media:", error);
    throw error;
  }
}

export async function updateInfoCategory(
  id: string,
  params: CreateCategory
): Promise<any> {
  try {
    console.log(id, params, "update params");

    const response = await fetch(`/api/category/update?id=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: params.name,
        description: params.description
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error updating customer");
    }

    const updatedCustomer = await response.json();
    return updatedCustomer;
  } catch (error) {
    console.error("Failed to update customer:", error);
    throw error;
  }
}

export async function getProductFromCategory() {}
