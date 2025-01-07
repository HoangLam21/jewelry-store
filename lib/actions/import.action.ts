"use server";

import Import from "@/database/import.model";
import { connectToDatabase } from "../mongoose";
import Product from "@/database/product.model";
import { ObjectId } from "mongodb";
import ProductProvider from "@/database/provider.model";
import Staff from "@/database/staff.model";
import File from "@/database/file.model";
import mongoose from "mongoose";

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

// Đọc nhập hàng theo ID
export const getImportById = async (id: string) => {
    try {
        connectToDatabase();
        const importData = await Import.findById(id);
        if (!importData) {
            throw new Error("Import not found");
        }
        const staff = await Staff.findById(importData.staff);
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
                const staff = await Staff.findById(importData.staff);
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
                const staff = await Staff.findById(importData.staff);
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

// Response interfaces
interface ImportResponse {
    id: string;
    supplier: {
        id: string;
        phoneNumber: string;
        fullname: string;
        address: string;
    };
    invoice: {
        id: string;
        productName: string;
        productImage: string | null;
        unitPrice: number;
        quantity: number;
        discount: number;
    }[];
    status: boolean;
    createAt: Date;
    createBy: string;
}

// Raw document interfaces
interface RawImport {
    _id: mongoose.Types.ObjectId;
    staff: mongoose.Types.ObjectId;
    details: {
        id: mongoose.Types.ObjectId;
        material: string;
        size: string;
        unitPrice: number;
        quantity: number;
        discount: string;
    }[];
    status: boolean;
    createdAt: Date;
}

interface RawProduct {
    _id: mongoose.Types.ObjectId;
    name: string;
    provider: mongoose.Types.ObjectId;
    files: mongoose.Types.ObjectId[];
}

interface RawStaff {
    _id: mongoose.Types.ObjectId;
    fullName: string;
}

interface RawProvider {
    _id: mongoose.Types.ObjectId;
    phoneNumber: string;
    fullname: string;
    address: string;
}

interface RawFile {
    _id: mongoose.Types.ObjectId;
    url: string;
}

export const getImports = async (): Promise<ImportResponse[]> => {
    try {
        await connectToDatabase();

        // Get all imports
        const imports = (await Import.find().lean()) as unknown as RawImport[];

        // Extract all needed IDs
        const staffIds = new Set<string>();
        const productIds = new Set<string>();
        const fileIds = new Set<string>();
        const providerIds = new Set<string>();

        imports.forEach((importData) => {
            staffIds.add(importData.staff.toString());
            importData.details.forEach((detail) => {
                productIds.add(detail.id.toString());
            });
        });

        // Fetch all required data in parallel với type assertion
        const [staffData, productsData] = await Promise.all([
            Staff.find({
                _id: { $in: Array.from(staffIds) },
            })
                .lean()
                .then((data) => data as unknown as RawStaff[]),
            Product.find({
                _id: { $in: Array.from(productIds) },
            })
                .lean()
                .then((data) => data as unknown as RawProduct[]),
        ]);

        // Get provider IDs from products
        productsData.forEach((product) => {
            if (product.provider) {
                providerIds.add(product.provider.toString());
            }
            if (product.files?.length) {
                product.files.forEach((fileId) => {
                    fileIds.add(fileId.toString());
                });
            }
        });

        // Fetch providers and files với type assertion
        const [providersData, filesData] = await Promise.all([
            ProductProvider.find({
                _id: { $in: Array.from(providerIds) },
            })
                .lean()
                .then((data) => data as unknown as RawProvider[]),
            File.find({
                _id: { $in: Array.from(fileIds) },
            })
                .lean()
                .then((data) => data as unknown as RawFile[]),
        ]);

        // Create lookup maps
        const staffMap = new Map(
            staffData.map((staff) => [staff._id.toString(), staff])
        );
        const productMap = new Map(
            productsData.map((product) => [product._id.toString(), product])
        );
        const providerMap = new Map(
            providersData.map((provider) => [provider._id.toString(), provider])
        );
        const fileMap = new Map(
            filesData.map((file) => [file._id.toString(), file])
        );

        // Transform imports data
        const result = imports.map((importData) => {
            try {
                const staff = staffMap.get(importData.staff.toString());
                if (!staff || !importData.details?.length) {
                    throw new Error(
                        `Invalid import data for ${importData._id}`
                    );
                }

                // Get first product for supplier info
                const firstProduct = productMap.get(
                    importData.details[0].id.toString()
                );
                if (!firstProduct?.provider) {
                    throw new Error(
                        `Product or provider not found for import ${importData._id}`
                    );
                }

                const provider = providerMap.get(
                    firstProduct.provider.toString()
                );
                if (!provider) {
                    throw new Error(
                        `Provider not found for import ${importData._id}`
                    );
                }

                // Process invoice details
                const invoices = importData.details.map((detail) => {
                    const product = productMap.get(detail.id.toString());
                    if (!product) {
                        throw new Error(`Product not found: ${detail.id}`);
                    }

                    let productImage: string | null = null;
                    if (product.files?.length) {
                        const file = fileMap.get(product.files[0].toString());
                        productImage = file?.url || null;
                    }

                    return {
                        id: product._id.toString(),
                        productName: product.name,
                        productImage,
                        unitPrice: detail.unitPrice,
                        quantity: detail.quantity,
                        discount: Number(detail.discount) || 0,
                    };
                });

                return {
                    id: importData._id.toString(),
                    supplier: {
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
                console.error(
                    `Error processing import ${importData._id}:`,
                    error
                );
                return null;
            }
        });

        return result.filter((item): item is ImportResponse => item !== null);
    } catch (error) {
        console.error("Error fetching Imports: ", error);
        throw new Error("Failed to fetch imports");
    }
};
