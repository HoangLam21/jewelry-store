// category.action
import Category from "@/database/category.model";
import Product from "@/database/product.model";
import mongoose from "mongoose";
import { connectToDatabase } from "../mongoose";

// Create a new category
export const createCategory = async (data: {
    name: string;
    description: string;
}) => {
    try {
        await connectToDatabase();
        const newCategory = await Category.create({
            name: data.name,
            description: data.description,
        });
        return newCategory;
    } catch (error) {
        console.log("Error creating category: ", error);
        await mongoose.connection.close();
        throw new Error("Failed to create category");
    } finally {
        await mongoose.connection.close();
    }
};

// Get all categories
export const getCategories = async () => {
    try {
        await connectToDatabase();
        const categories = await Category.find();
        return categories;
    } catch (error) {
        console.log("Error fetching categories: ", error);
        await mongoose.connection.close();
        throw new Error("Failed to fetch categories");
    } finally {
        await mongoose.connection.close();
    }
};

// Get a category by ID
export const getCategoryById = async (id: string) => {
    try {
        await connectToDatabase();
        const category = await Category.findById(id);
        if (!category) {
            throw new Error("Category not found");
        }
        return category;
    } catch (error) {
        console.log("Error fetching category: ", error);
        await mongoose.connection.close();
        throw new Error("Failed to fetch category");
    } finally {
        await mongoose.connection.close();
    }
};

// Update a category
export const updateCategory = async (
    id: string,
    data: Partial<{
        name: string;
        description: string;
    }>
) => {
    try {
        await connectToDatabase();
        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            {
                ...data,
            },
            { new: true }
        );
        if (!updatedCategory) {
            throw new Error("Category not found");
        }
        return updatedCategory;
    } catch (error) {
        console.log("Error updating category: ", error);
        await mongoose.connection.close();
        throw new Error("Failed to update category");
    } finally {
        await mongoose.connection.close();
    }
};

// Delete a category
export const deleteCategory = async (id: string) => {
    try {
        await connectToDatabase();
        const deletedCategory = await Category.findByIdAndDelete(id);
        if (!deletedCategory) {
            throw new Error("Category not found");
        }
        return true;
    } catch (error) {
        console.log("Error deleting category: ", error);
        await mongoose.connection.close();
        throw new Error("Failed to delete category");
    } finally {
        await mongoose.connection.close();
    }
};

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
