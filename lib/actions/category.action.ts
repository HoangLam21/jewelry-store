"use server";

import Category from "@/database/category.model";
import Product from "@/database/product.model";
import mongoose from "mongoose";
import { connectToDatabase } from "../mongoose";

// Add a product to a category
export const addProductToCategory = async (
    categoryId: string,
    productId: string
) => {
    try {
        await connectToDatabase();
        const category = await Category.findById(categoryId);
        if (!category) {
            throw new Error("Category not found");
        }
        const product = await Product.findById(productId);
        if (!product) {
            throw new Error("Product not found");
        }
        category.products.push(productId);
        product.category = categoryId;
        await category.save();
        await product.save();
        await mongoose.connection.close();
        return { category, product };
    } catch (error) {
        console.log("Error adding product to category: ", error);
        await mongoose.connection.close();
        throw new Error("Failed to add product to category");
    }
};

// Remove a product from a category
export const removeProductFromCategory = async (
    categoryId: string,
    productId: string
) => {
    try {
        await connectToDatabase();
        const category = await Category.findById(categoryId);
        if (!category) {
            throw new Error("Category not found");
        }
        const product = await Product.findById(productId);
        if (!product) {
            throw new Error("Product not found");
        }
        category.products = category.products.filter(
            (id: any) => id.toString() !== productId
        );
        product.category = null;
        await category.save();
        await product.save();
        await mongoose.connection.close();
        return { category, product };
    } catch (error) {
        console.log("Error removing product from category: ", error);
        await mongoose.connection.close();
        throw new Error("Failed to remove product from category");
    }
};

// Edit a product's category
export const editProductCategory = async (
    productId: string,
    newCategoryId: string
) => {
    try {
        await connectToDatabase();
        const product = await Product.findById(productId);
        if (!product) {
            throw new Error("Product not found");
        }
        const oldCategory = await Category.findById(product.category);
        if (oldCategory) {
            oldCategory.products = oldCategory.products.filter(
                (id: any) => id.toString() !== productId
            );
            await oldCategory.save();
        }
        const newCategory = await Category.findById(newCategoryId);
        if (!newCategory) {
            throw new Error("New category not found");
        }
        newCategory.products.push(productId);
        product.category = newCategoryId;
        await newCategory.save();
        await product.save();
        await mongoose.connection.close();
        return { product, newCategory };
    } catch (error) {
        console.log("Error editing product category: ", error);
        await mongoose.connection.close();
        throw new Error("Failed to edit product category");
    }
};

// Get all products of a category
export const getProductsOfCategory = async (categoryId: string) => {
    try {
        await connectToDatabase();
        const category = await Category.findById(categoryId);
        if (!category) {
            throw new Error("Category not found");
        }
        const products = await Product.find({
            _id: { $in: category.products },
        });
        await mongoose.connection.close();
        return products;
    } catch (error) {
        console.log("Error getting products of category: ", error);
        await mongoose.connection.close();
        throw new Error("Failed to get products of category");
    }
};
