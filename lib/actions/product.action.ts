"use server";
import Product from "@/database/product.model";
import { connectToDatabase } from "../mongoose";
import mongoose, { Schema } from "mongoose";
import formidable from "formidable";
import { createFile, deleteFile } from "./file.action";

// Tạo sản phẩm mới
export const createProduct = async (data: {
  name: string;
  cost: number;
  images: formidable.File[];
  description: string;
  vouchers?: string[];
  provider: string;
  category?: string;
  variants: {
    size: string;
    color: string;
    price: number;
    sales: number;
    stock: number;
  }[];
}) => {
  try {
    connectToDatabase();
    const imageIds: string[] = [];
    for (const image of data.images) {
      const createdImage = await createFile(image);
      imageIds.push(createdImage._id);
    }
    const newProduct = await Product.create({
      name: data.name,
      cost: data.cost,
      files: imageIds,
      description: data.description,
      vouchers: data.vouchers?.map(
        (voucher) => new mongoose.Types.ObjectId(voucher)
      ),
      provider: new mongoose.Types.ObjectId(data.provider),
      category: new mongoose.Types.ObjectId(data.category),
      variants: data.variants,
      createdAt: new Date(),
    });
    return newProduct;
  } catch (error) {
    console.log("Error creating Product: ", error);
    throw new Error("Failed to create product");
  }
};

export const getProducts = async () => {
  try {
    connectToDatabase();
    const products = await Product.find().populate("files provider vouchers");
    return products;
  } catch (error) {
    console.log("Error fetching Products: ", error);
    throw new Error("Failed to fetch products");
  }
};

export const getProductById = async (id: string) => {
  try {
    connectToDatabase();
    const product = await Product.findById(id).populate("files provider vouchers");
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  } catch (error) {
    console.log("Error fetching Product by ID: ", error);
    throw new Error("Failed to fetch product");
  }
};

export const updateProduct = async (
  id: string,
  data: Partial<{
    name: string;
    cost: number;
    files: formidable.File[];
    description: string;
    vouchers: string[];
    provider: string;
    category: string;
    variants: {
      size: string;
      color: string;
      price: number;
      sales: number;
      stock: number;
    }[];
  }>
) => {
  try {
    connectToDatabase();
    const updateImageIds: string[] = [];
    const existProduct = await Product.findById(id);
    for (const id of existProduct.files) {
      await deleteFile(id);
    }
    if (data.files) {
      for (const image of data.files) {
        const createdImage = await createFile(image);
        updateImageIds.push(createdImage._id);
      }
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        ...data,
        images: updateImageIds,
      },
      { new: true }
    ).populate("files provider vouchers");
    if (!updatedProduct) {
      throw new Error("Product not found");
    }
    return updatedProduct;
  } catch (error) {
    console.log("Error updating Product: ", error);
    throw new Error("Failed to update product");
  }
};

export const deleteProduct = async (id: string) => {
  try {
    connectToDatabase();
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      throw new Error("Product not found");
    }
    return true;
  } catch (error) {
    console.log("Error deleting Product: ", error);
    throw new Error("Failed to delete product");
  }
};
