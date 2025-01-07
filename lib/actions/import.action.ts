"use server";

import Import from "@/database/import.model";
import { connectToDatabase } from "../mongoose";
import Product from "@/database/product.model";
import { ObjectId } from "mongodb";
import ProductProvider from "@/database/provider.model";
import Staff from "@/database/staff.model";
import File from "@/database/file.model";
import Voucher from "@/database/voucher.model";

interface CreateImportInput {
  staff: string;
  provider: string;
  invoice: {
    productId: string;
    material: string;
    size: string;
    unitPrice: number;
    quantity: number;
    discount: string;
  }[];
}

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
    productImage: string;
    unitPrice: number;
    quantity: number;
    discount: number;
  }[];
  status: boolean;
  createAt: Date;
  createBy: string;
}

// export const createImport = async (
//   data: CreateImportInput
// ): Promise<ImportResponse> => {
//   try {
//     await connectToDatabase();

//     // Calculate total cost from invoice items
//     const totalCost = data.invoice.reduce((sum, item) => {
//       const itemCost = item.unitPrice * item.quantity;
//       const discountAmount = (parseFloat(item.discount) / 100) * itemCost;
//       return sum + (itemCost - discountAmount);
//     }, 0);

//     // Create import record
//     const newImport = await Import.create({
//       staff: new ObjectId(data.staff),
//       provider: new ObjectId(data.provider),
//       totalCost,
//       details: data.invoice,
//       status: false,
//     });

//     // Fetch related data for response
//     const populatedImport = await Import.findById(newImport._id)
//       .populate("staff", "fullname")
//       .populate("provider", "phoneNumber fullname address")
//       .populate("details.id", "name image");

//     if (!populatedImport) {
//       throw new Error("Failed to fetch created import");
//     }

//     // Transform to required response format
//     const response: ImportResponse = {
//       id: populatedImport._id.toString(),
//       supplier: {
//         id: populatedImport.provider._id.toString(),
//         phoneNumber: populatedImport.provider.phoneNumber,
//         fullname: populatedImport.provider.fullname,
//         address: populatedImport.provider.address,
//       },
//       invoice: populatedImport.details.map((detail: any) => ({
//         id: detail.id._id.toString(),
//         productName: detail.id.name,
//         productImage: detail.id.image,
//         unitPrice: detail.unitPrice,
//         quantity: detail.quantity,
//         discount: detail.discount,
//       })),
//       status: populatedImport.status,
//       createAt: populatedImport.createdAt,
//       createBy: populatedImport.staff.fullname,
//     };

//     return response;
//   } catch (error) {
//     console.error("Error creating Import: ", error);
//     throw new Error("Failed to create import");
//   }
// };

export const createImport = async (data: {
  staff: string;
  provider: string;
  invoice: {
    productId: string;
    material: string;
    size: string;
    unitPrice: number;
    quantity: number;
    discount: string;
  }[];
}) => {
  try {
    connectToDatabase();
    const totalCost = data.invoice.reduce((sum, item) => {
      const itemCost = item.unitPrice * item.quantity;
      const discountAmount = (parseFloat(item.discount) / 100) * itemCost;
      return sum + (itemCost - discountAmount);
    }, 0);

    const newOrder = await Import.create({
      staff: new ObjectId(data.staff),
      provider: new ObjectId(data.provider),
      totalCost,
      details: data.invoice,
      status: false,
    });
    return newOrder;
  } catch (error) {
    console.log("Error creating Order: ", error);
    throw new Error("Failed to create order");
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

// Interface cho populated documents
interface ImportDetail {
  id: ObjectId;
  material: string;
  size: string;
  unitPrice: number;
  quantity: number;
  discount: string;
}

interface StaffDocument {
  _id: ObjectId;
  fullName: string;
}

interface ProviderDocument {
  _id: ObjectId;
  phoneNumber: string;
  fullname: string;
  address: string;
}

interface ProductDocument {
  _id: ObjectId;
  name: string;
  provider: ProviderDocument;
  files: ObjectId[];
}

interface FileDocument {
  _id: ObjectId;
  url: string;
}

interface ImportDocument {
  _id: ObjectId;
  staff: StaffDocument;
  details: ImportDetail[];
  status: boolean;
  createdAt: Date;
}

export const getImports = async (): Promise<ImportResponse[]> => {
  try {
    await connectToDatabase();

    // Get imports with populated staff
    const rawImports = await Import.find().populate("staff").lean();

    // Type assertion với unknown trung gian
    const imports = rawImports as unknown as ImportDocument[];

    const result = await Promise.all(
      imports.map(async (importData) => {
        try {
          // Validate staff
          if (!importData.staff || !importData.details?.length) {
            throw new Error(`Invalid import data for ${importData._id}`);
          }

          // Get first product with populated provider
          const rawProduct = await Product.findById(importData.details[0].id)
            .populate("provider")
            .lean();

          // Type assertion với unknown trung gian
          const firstProduct = rawProduct as unknown as ProductDocument;

          if (!firstProduct?.provider) {
            throw new Error(
              `Product or provider not found for import ${importData._id}`
            );
          }

          // Process invoice details
          const invoices = await Promise.all(
            importData.details.map(async (detail) => {
              const rawProduct = await Product.findById(detail.id).lean();

              // Type assertion với unknown trung gian
              const product = rawProduct as unknown as ProductDocument;

              if (!product) {
                throw new Error(`Product not found: ${detail.id}`);
              }

              let productImage: string | null = null;
              if (product.files?.length) {
                const rawFile = await File.findById(product.files[0]).lean();
                const file = rawFile as unknown as FileDocument;
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
            })
          );

          return {
            id: importData._id.toString(),
            supplier: {
              id: firstProduct.provider._id.toString(),
              phoneNumber: firstProduct.provider.phoneNumber,
              fullname: firstProduct.provider.fullname,
              address: firstProduct.provider.address,
            },
            invoice: invoices,
            status: importData.status,
            createAt: importData.createdAt,
            createBy: importData.staff.fullName,
          };
        } catch (error) {
          console.error(`Error processing import ${importData._id}:`, error);
          return null;
        }
      })
    );

    return result.filter((item): item is ImportResponse => item !== null);
  } catch (error) {
    console.error("Error fetching Imports: ", error);
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
    const staff = await Staff.findById(importData.staff);
    const provider = await ProductProvider.findById(
      (
        await Product.findById(importData.details[0].id)
      ).provider
    );
    const invoices = await Promise.all(
      importData.details.map(async (detail: any) => {
        const product = await Product.findById(detail.id);
        const file = (await File.find({ _id: { $in: product.files } }))[0];
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
            const file = (await File.find({ _id: { $in: product.files } }))[0];
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
            const file = (await File.find({ _id: { $in: product.files } }))[0];
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
