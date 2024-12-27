"use server";
import Product from "@/database/product.model";
import { connectToDatabase } from "../mongoose";
import { Schema } from "mongoose";
import formidable from "formidable";

// Tạo sản phẩm mới
export const createProduct = async (data: {
  name: string;
  cost: number;
  images?: formidable.File[];
  description: string;
  vouchers?: Schema.Types.ObjectId[];
  provider: Schema.Types.ObjectId;
  category?: Schema.Types.ObjectId;
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
    const newProduct = await Product.create({
      name: data.name,
      cost: data.cost,
      images: data.images,
      description: data.description,
      vouchers: data.vouchers,
      provider: data.provider,
      category: data.category,
      variants: data.variants,
      createdAt: new Date(),
    });
    return newProduct;
  } catch (error) {
    console.log("Error creating Product: ", error);
    throw new Error("Failed to create product");
  }
};

// Lấy danh sách tất cả sản phẩm
export const getProducts = async () => {
  try {
    connectToDatabase();
    const products = await Product.find().populate(
      "images vouchers provider category"
    );
    return products;
  } catch (error) {
    console.log("Error fetching Products: ", error);
    throw new Error("Failed to fetch products");
  }
};

// Lấy thông tin sản phẩm theo ID
export const getProductById = async (id: string) => {
  try {
    connectToDatabase();
    const product = await Product.findById(id).populate(
      "images vouchers provider category"
    );
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  } catch (error) {
    console.log("Error fetching Product by ID: ", error);
    throw new Error("Failed to fetch product");
  }
};

// Cập nhật thông tin sản phẩm
export const updateProduct = async (
  id: string,
  data: Partial<{
    name: string;
    cost: number;
    images: Schema.Types.ObjectId[];
    description: string;
    vouchers: Schema.Types.ObjectId[];
    provider: Schema.Types.ObjectId;
    category: Schema.Types.ObjectId;
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
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        ...data,
        updatedAt: new Date(),
      },
      { new: true }
    ).populate("images vouchers provider category");
    if (!updatedProduct) {
      throw new Error("Product not found");
    }
    return updatedProduct;
  } catch (error) {
    console.log("Error updating Product: ", error);
    throw new Error("Failed to update product");
  }
};

// Xóa sản phẩm
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
