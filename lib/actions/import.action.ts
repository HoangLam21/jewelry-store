"use server";

import Import from "@/database/import.model";
import { connectToDatabase } from "../mongoose";
import Product from "@/database/product.model";
import { ObjectId } from "mongodb";

// Tạo nhập hàng mới
export const createImport = async (data: {
    staff: string;
    totalCost: number;
    details: { [key: string]: number };
}) => {
    try {
        connectToDatabase();
        const newImport = await Import.create({
            staff: new ObjectId(data.staff),
            totalCost: data.totalCost,
            details: data.details,
            status: false,
        });
        return newImport;
    } catch (error) {
        console.log("Error creating Import: ", error);
        throw new Error("Failed to create import");
    }
};

// Sửa nhập hàng
export const editImport = async (
    id: string,
    data: {
        staff?: string;
        totalCost?: number;
        details?: { [key: string]: number };
    }
) => {
    try {
        connectToDatabase();
        const importData = await Import.findById(id);
        if (!importData) {
            throw new Error("Import not found");
        }
        if (importData.status) {
            throw new Error("Cannot edit verified import");
        }
        const updatedImport = await Import.findByIdAndUpdate(
            id,
            {
                staff: data.staff ? new ObjectId(data.staff) : importData.staff,
                totalCost: data.totalCost || importData.totalCost,
                details: data.details || importData.details,
            },
            { new: true }
        );
        return updatedImport;
    } catch (error) {
        console.log("Error editing Import: ", error);
        throw new Error("Failed to edit import");
    }
};

// Xóa nhập hàng
export const deleteImport = async (id: string) => {
    try {
        connectToDatabase();
        const importData = await Import.findById(id);
        if (!importData) {
            throw new Error("Import not found");
        }
        if (importData.status) {
            throw new Error("Cannot delete verified import");
        }
        await Import.findByIdAndDelete(id);
        return true;
    } catch (error) {
        console.log("Error deleting Import: ", error);
        throw new Error("Failed to delete import");
    }
};

// Xác nhận nhập hàng
export const verifyImport = async (id: string) => {
    try {
        connectToDatabase();
        const importData = await Import.findById(id);
        if (!importData) {
            throw new Error("Import not found");
        }
        if (importData.status) {
            throw new Error("Import already verified");
        }
        const importDetails = importData.details;
        for (const productId in importDetails) {
            const product = await Product.findById(productId);
            if (!product) {
                throw new Error("Product not found");
            }
            for (const variant of product.variants) {
                for (const size of variant.sizes) {
                    size.stock += importDetails[productId];
                }
            }
            await product.save();
        }
        await Import.findByIdAndUpdate(id, { status: true }, { new: true });
        return true;
    } catch (error) {
        console.log("Error verifying Import: ", error);
        throw new Error("Failed to verify import");
    }
};

// Đọc tất cả nhập hàng
export const getImports = async () => {
    try {
        connectToDatabase();
        const imports = await Import.find();
        return imports;
    } catch (error) {
        console.log("Error fetching Imports: ", error);
        throw new Error("Failed to fetch imports");
    }
};

// Đọc nhập hàng theo ID
export const getImportById = async (id: string) => {
    try {
        connectToDatabase();
        const importData = await Import.findById(id);
        if (!importData) {
            throw new Error("Import not found");
        }
        return importData;
    } catch (error) {
        console.log("Error fetching Import: ", error);
        throw new Error("Failed to fetch import");
    }
};
