"use server";

import Import from "@/database/import.model";
import { connectToDatabase } from "../mongoose";
import Product from "@/database/product.model";
import { ObjectId } from "mongodb";
import ProductProvider from "@/database/provider.model";
import User from "@/database/user.model"; // Changed to use User model instead of Staff model
import File from "@/database/file.model";
import Voucher from "@/database/voucher.model";

// Tạo nhập hàng mới
export const createImport = async (data: {
    staff: string;
    totalCost: number;
    details: {
        id: string;
        material: string;
        size: string;
        unitPrice: number;
        quantity: number;
        discount: string;
    }[];
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
        details?: {
            id: string;
            material: string;
            size: string;
            unitPrice: number;
            quantity: number;
            discount: string;
        }[];
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
        for (const detail of importDetails) {
            const product = await Product.findById(detail.id);
            if (!product) {
                throw new Error("Product not found");
            }
            for (const variant of product.variants) {
                if (variant.material === detail.material) {
                    for (const size of variant.sizes) {
                        if (size.size === detail.size) {
                            size.stock += detail.quantity;
                        }
                    }
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
        const result = await Promise.all(
            imports.map(async (importData) => {
                const staff = await User.findById(importData.staff);
                const provider = await ProductProvider.findById(
                    (
                        await Product.findById(importData.details[0].id)
                    ).provider
                );
                const invoices = await Promise.all(
                    importData.details.map(async (detail: any) => {
                        const product = await Product.findById(detail.id);
                        const file = (
                            await File.find({ _id: { $in: product.files } })
                        )[0];
                        return {
                            id: product._id.toString(),
                            productName: product.name,
                            productImage: file.url,
                            unitPrice: detail.unitPrice,
                            quantity: detail.quantity,
                            discount: Number(detail.discount),
                        };
                    })
                );
                return {
                    id: importData._id.toString(),
                    suplier: {
                        id: provider._id.toString(),
                        phoneNumber: provider.phoneNumber,
                        fullname: provider.fullname,
                        address: provider.address,
                    },
                    invoice: invoices,
                    status: importData.status,
                    createAt: importData.createdAt,
                    createBy: staff.fullName,
                };
            })
        );
        return result;
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
        const staff = await User.findById(importData.staff);
        const provider = await ProductProvider.findById(
            (
                await Product.findById(importData.details[0].id)
            ).provider
        );
        const invoices = await Promise.all(
            importData.details.map(async (detail: any) => {
                const product = await Product.findById(detail.id);
                const file = (
                    await File.find({ _id: { $in: product.files } })
                )[0];
                return {
                    id: product._id.toString(),
                    productName: product.name,
                    productImage: file.url,
                    unitPrice: detail.unitPrice,
                    quantity: detail.quantity,
                    discount: Number(detail.discount),
                };
            })
        );
        return {
            id: importData._id.toString(),
            suplier: {
                id: provider._id.toString(),
                phoneNumber: provider.phoneNumber,
                fullname: provider.fullname,
                address: provider.address,
            },
            invoice: invoices,
            status: importData.status,
            createAt: importData.createdAt,
            createBy: staff.fullName,
        };
    } catch (error) {
        console.log("Error fetching Import: ", error);
        throw new Error("Failed to fetch import");
    }
};

// Lấy tất cả nhập hàng của một nhà cung cấp
export const getAllImportsOfProvider = async (providerId: string) => {
    try {
        connectToDatabase();
        const imports = await Import.find();
        const result = await Promise.all(
            imports.map(async (importData) => {
                const staff = await User.findById(importData.staff);
                const provider = await ProductProvider.findById(
                    (
                        await Product.findById(importData.details[0].id)
                    ).provider
                );
                const invoices = await Promise.all(
                    importData.details.map(async (detail: any) => {
                        const product = await Product.findById(detail.id);
                        const file = (
                            await File.find({ _id: { $in: product.files } })
                        )[0];
                        return {
                            id: product._id.toString(),
                            productName: product.name,
                            productImage: file.url,
                            unitPrice: detail.unitPrice,
                            quantity: detail.quantity,
                            discount: Number(detail.discount),
                        };
                    })
                );
                if (provider._id.toString() === providerId) {
                    return {
                        id: importData._id.toString(),
                        suplier: {
                            id: provider._id.toString(),
                            phoneNumber: provider.phoneNumber,
                            fullname: provider.fullname,
                            address: provider.address,
                        },
                        invoice: invoices,
                        status: importData.status,
                        createAt: importData.createdAt,
                        createBy: staff.fullName,
                    };
                } else {
                    return null;
                }
            })
        );
        return result.filter((importData) => importData !== null);
    } catch (error) {
        console.log("Error fetching Imports of Provider: ", error);
        throw new Error("Failed to fetch imports of provider");
    }
};

// Lấy tất cả nhập hàng của một nhân viên
export const getAllImportsOfStaff = async (staffId: string) => {
    try {
        connectToDatabase();
        const imports = await Import.find({ staff: new ObjectId(staffId) });
        const result = await Promise.all(
            imports.map(async (importData) => {
                const staff = await User.findById(importData.staff);
                const provider = await ProductProvider.findById(
                    (
                        await Product.findById(importData.details[0].id)
                    ).provider
                );
                const invoices = await Promise.all(
                    importData.details.map(async (detail: any) => {
                        const product = await Product.findById(detail.id);
                        const file = (
                            await File.find({ _id: { $in: product.files } })
                        )[0];
                        return {
                            id: product._id.toString(),
                            productName: product.name,
                            productImage: file.url,
                            unitPrice: detail.unitPrice,
                            quantity: detail.quantity,
                            discount: Number(detail.discount),
                        };
                    })
                );
                return {
                    id: importData._id.toString(),
                    suplier: {
                        id: provider._id.toString(),
                        phoneNumber: provider.phoneNumber,
                        fullname: provider.fullname,
                        address: provider.address,
                    },
                    invoice: invoices,
                    status: importData.status,
                    createAt: importData.createdAt,
                    createBy: staff.fullName,
                };
            })
        );
        return result;
    } catch (error) {
        console.log("Error fetching Imports of Staff: ", error);
        throw new Error("Failed to fetch imports of staff");
    }
};
