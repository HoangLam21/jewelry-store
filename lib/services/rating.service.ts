import { FileContent } from "@/dto/ProductDTO";
import { CreateRatingDTO } from "@/dto/RatingDTO";

export async function getReviewById(id: string) {
  try {
    const response = await fetch(`/api/rating/product?productId=${id}`);
    if (!response.ok) {
      throw new Error("Error fetching products");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
}

export async function createReview(params: CreateRatingDTO) {
  const userId = localStorage.getItem("userId");
  const formDataToSend = new FormData();
  formDataToSend.append("userId", userId || "");
  formDataToSend.append("productId", params.productId);
  formDataToSend.append("point", params.point.toString());
  formDataToSend.append("content", params.content);
  params.images &&
    params.images.forEach((file: FileContent) => {
      formDataToSend.append("images", file.url);
    });

  try {
    const response = await fetch("/api/your-api-path", {
      method: "POST",
      body: formDataToSend
    });

    if (!response.ok) {
      throw new Error("Failed to create rating");
    }

    const result = await response.json();
    console.log("Rating created successfully: ", result);
  } catch (error) {
    console.error("Error submitting form: ", error);
  }
}
