import { Provider } from "@/dto/ProviderDTO";

export async function fetchProvider(): Promise<[]> {
  try {
    const response = await fetch(`/api/provider/all`);
    if (!response.ok) {
      throw new Error("Error fetching posts");
    }
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    throw error;
  }
}

export async function getProviderById(
  providerId: string
): Promise<Provider | null> {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("Không tìm thấy token");
    throw new Error("Thiếu token xác thực.");
  }

  try {
    const response = await fetch(`/api/provider/${providerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Không thể lấy thông tin nhân viên.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi khi lấy thông tin nhân viên:", error);
    throw error;
  }
}
