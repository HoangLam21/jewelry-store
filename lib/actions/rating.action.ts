"use server";
import Rating from "@/database/rating.model";
import { connectToDatabase } from "@/lib/mongoose";

export const createRating = async (data: {
  userId: string;
  productId: string;
  point: number;
  content: string;
}) => {
  try {
    await connectToDatabase();
    const newRating = await Rating.create({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return newRating;
  } catch (error) {
    console.error("Error creating Rating:", error);
    throw new Error("Failed to create rating");
  }
};

export const getAllRatings = async () => {
  try {
    await connectToDatabase();
    const ratings = await Rating.find(); 
    return ratings;
  } catch (error) {
    console.error("Error fetching all ratings: ", error);
    throw new Error("Failed to fetch all ratings");
  }
};

export const getRatingsByProductId = async (productId: string) => {
  try {
    await connectToDatabase();
    const ratings = await Rating.find({ productId });
    return ratings;
  } catch (error) {
    console.error("Error fetching Ratings by ProductId:", error);
    throw new Error("Failed to fetch ratings");
  }
};

export const getRatingById = async (id: string) => {
  try {
    await connectToDatabase();
    const rating = await Rating.findById(id);
    if (!rating) {
      throw new Error("Rating not found");
    }
    return rating;
  } catch (error) {
    console.error("Error fetching Rating by ID:", error);
    throw new Error("Failed to fetch rating");
  }
};

export const updateRating = async (
  id: string,
  data: Partial<{ point: number; content: string }>
) => {
  try {
    await connectToDatabase();
    const updatedRating = await Rating.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updatedRating) {
      throw new Error("Rating not found");
    }
    return updatedRating;
  } catch (error) {
    console.error("Error updating Rating:", error);
    throw new Error("Failed to update rating");
  }
};

export const deleteRating = async (id: string) => {
  try {
    await connectToDatabase();
    const deletedRating = await Rating.findByIdAndDelete(id);
    if (!deletedRating) {
      throw new Error("Rating not found");
    }
    return deletedRating;
  } catch (error) {
    console.error("Error deleting Rating:", error);
    throw new Error("Failed to delete rating");
  }
};
