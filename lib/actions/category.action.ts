// category.action
import Category from "@/database/category.model";
import Product from "@/database/product.model";
import mongoose, { ObjectId } from "mongoose";
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
      description: data.description
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

// Modified getProductsOfCategory function
export const getProductsOfCategory = async (categoryId: string) => {
  try {
    await connectToDatabase();
    const category = await Category.findById(categoryId);
    if (!category) {
      throw new Error("Category not found");
    }
    // Populate necessary fields
    const products = await Product.find({
      _id: { $in: category.products }
    })
      .populate("files")
      .populate("vouchers")
      .populate("provider")
      .populate("category");

    await mongoose.connection.close();
    return products;
  } catch (error) {
    console.log("Error getting products of category: ", error);
    await mongoose.connection.close();
    throw new Error("Failed to get products of category");
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

// Interface cho Product sau khi populate
interface ProductPopulated {
  _id: ObjectId;
  fullName: string;
  cost: number;
  files: {
    _id: ObjectId;
    url: string;
  }[];
  description: string;
  vouchers: ObjectId[];
  provider: {
    _id: ObjectId;
    fullname: string;
    phoneNumber: string;
    address: string;
  };
  category: ObjectId;
  collections: string;
  variants: {
    material: string;
    sizes: {
      size: string;
      stock: number;
    }[];
    addOn: number;
  }[];
  sales: number;
  createdAt: Date;
  updatedAt: Date;
}

// Interface cho Category sau khi populate products
interface CategoryPopulated {
  _id: ObjectId;
  name: string;
  hot: boolean;
  products: ProductPopulated[];
  createdAt: Date;
  updatedAt: Date;
}

export const getCategoryById = async (id: string) => {
  try {
    await connectToDatabase();

    // Populate toàn bộ thông tin sản phẩm và các relationships của sản phẩm
    const rawCategory = await Category.findById(id)
      .populate({
        path: "products",
        populate: [
          {
            path: "files",
            select: "url" // Chỉ lấy url của file
          },
          {
            path: "provider",
            select: "fullname phoneNumber address" // Lấy thông tin cần thiết của provider
          }
        ]
      })
      .lean();
    // Type assertion
    const category = rawCategory as unknown as CategoryPopulated;

    if (!category) {
      throw new Error("Category not found");
    }

    // Transform dữ liệu trước khi trả về nếu cần
    return {
      id: category._id.toString(),
      name: category.name,
      hot: category.hot,
      products: category.products.map((product) => ({
        id: product._id.toString(),
        name: product.fullName,
        cost: product.cost,

        images: product.files
          ? product.files.map((file) => ({
              id: file._id.toString(),
              url: file.url
            }))
          : [],
        description: product.description,
        provider: product.provider
          ? {
              id: product.provider._id.toString(),
              fullname: product.provider.fullname,
              phoneNumber: product.provider.phoneNumber,
              address: product.provider.address
            }
          : null,
        variants: product.variants,
        sales: product.sales,
        collections: product.collections,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt
      })),
      createdAt: category.createdAt,
      updatedAt: category.updatedAt
    };
  } catch (error) {
    console.log("Error fetching category: ", error);
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
        ...data
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
