import { CreateProduct, ProductResponse } from "@/dto/ProductDTO";

export async function fetchProduct(): Promise<ProductResponse[]> {
  try {
    const response = await fetch(`/api/product/all`);
    if (!response.ok) {
      throw new Error("Error fetching customer");
    }
    const data: ProductResponse[] = await response.json();

    return data;
  } catch (error) {
    console.error("Failed to fetch customers:", error);
    throw error;
  }
}

export async function getDetailProduct(
  productId: string
): Promise<ProductResponse | null> {
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
    const response = await fetch(`/api/product/id?id=${productId}`);
    if (!response.ok) {
      throw new Error("Không thể lấy thông tin khach hang.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi khi lấy thông tin san pham:", error);
    throw error;
  }
}

export async function deleteProductById(productId: string) {
  try {
    console.log(`/api/product/delete?id=${productId}`, "delete ");
    const response = await fetch(`/api/product/delete?id=${productId}`, {
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

export async function createProduct(
  params: CreateProduct
  // token: string
): Promise<ProductResponse> {
  try {
    console.log(params, "param");
    const response = await fetch(`/api/customer/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        // Authorization: `${token}`,
      },
      body: JSON.stringify({
        name: params.name,
        cost: params.cost,
        description: params.description,
        vouchers: params.vouchers,
        provider: params.provider,
        category: params.category,
        collections: params.collections,
        variants: params.variants.map((variant) => ({
          _id: variant._id,
          addOn: variant.addOn,
          material: variant.material,
          sizes: variant.sizes.map((size) => ({
            _id: size._id,
            size: size.size,
            stock: size.stock
          }))
        }))
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

export async function updateInfoProduct(
  id: string,
  params: CreateProduct
): Promise<any> {
  try {
    console.log(id, params, "update params");

    const response = await fetch(`/api/product/update?id=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: params.name,
        cost: params.cost,
        description: params.description,
        vouchers: params.vouchers,
        provider: params.provider,
        category: params.category,
        collections: params.collections,
        variants: params.variants.map((variant) => ({
          _id: variant._id,
          addOn: variant.addOn,
          material: variant.material,
          sizes: variant.sizes.map((size) => ({
            _id: size._id,
            size: size.size,
            stock: size.stock
          }))
        }))
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
