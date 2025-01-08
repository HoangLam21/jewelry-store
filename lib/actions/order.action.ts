"use server";

import Order from "@/database/order.model";
import { connectToDatabase } from "../mongoose";
import Product from "@/database/product.model";
import { ObjectId } from "mongodb";
import Customer from "@/database/customer.model";
import File from "@/database/file.model";
import ProductProvider from "@/database/provider.model";
import Staff from "@/database/staff.model";
import Voucher from "@/database/voucher.model";
import { createFinance } from "./finance.action";

export const getOrders = async () => {
  try {
    await connectToDatabase();
    const orders = await Order.find().populate("customer").populate("staff");

    const orderResponse = [];
    for (const order of orders) {
      const products = [];
      for (const detail of order.details) {
        const product = await Product.findById(detail.id.toString())
          .populate("vouchers")
          .populate("provider")
          .populate("files");

        if (!product) {
          throw new Error("Product not found");
        }
        products.push({
          product: {
            ...product.toObject(),
            vouchers: product.vouchers,
            provider: product.provider,
            files: product.files
          },
          material: detail.material,
          size: detail.size,
          quantity: detail.quantity,
          unitPrice: detail.unitPrice,
          discount: detail.discount
        });
      }
      orderResponse.push({
        ...order.toObject(),
        customer: order.customer,
        staff: order.staff,
        products: products
      });
    }
    return orderResponse;
  } catch (error) {
    console.log("Error fetching Orders: ", error);
    return [];
    throw new Error("Failed to fetch orders");
  }
};

export const createOrder = async (data: {
  cost: number;
  discount: number;
  details: {
    id: string;
    material: string;
    size: string;
    unitPrice: number;
    quantity: number;
    discount: string;
  }[];
  status: string;
  shippingMethod: string;
  ETD: Date;
  customer?: string;
  phoneNumber?: string;
  note?: string;
  address?: string;
  staff: string;
}) => {
  try {
    await connectToDatabase();
    const newOrder = await Order.create({
      cost: data.cost,
      discount: data.discount,
      details: data.details,
      status: data.status,
      shippingMethod: data.shippingMethod,
      ETD: data.ETD,
      customer: new ObjectId(data.customer),
      phoneNumber: data.phoneNumber,
      note: data.note,
      address: data.address,
      staff: new ObjectId(data.staff)
    });
    return newOrder;
  } catch (error) {
    console.log("Error creating Order: ", error);
    throw new Error("Failed to create order");
  }
};

// Hủy đơn hàng
export const cancelOrder = async (id: string) => {
  try {
    await connectToDatabase();
    const order = await Order.findById(id);
    if (!order) {
      throw new Error("Order not found");
    }
    if (
      order.status !== "ordered" &&
      order.status !== "confirmed" &&
      order.status !== "preparing"
    ) {
      throw new Error("Cannot cancel order at this stage");
    }
    await Order.findByIdAndUpdate(id, { status: "canceled" }, { new: true });
    return true;
  } catch (error) {
    console.log("Error canceling Order: ", error);
    throw new Error("Failed to cancel order");
  }
};

// Xóa đơn hàng
export const deleteOrder = async (id: string) => {
  try {
    await connectToDatabase();
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      throw new Error("Order not found");
    }
    return true;
  } catch (error) {
    console.log("Error deleting Order: ", error);
    throw new Error("Failed to delete order");
  }
};

export const updateOrderStatus = async (id: string, status: string) => {
  try {
    // Kết nối cơ sở dữ liệu
    await connectToDatabase();
    console.log(id, status, "statussssssss");
    // Lấy thông tin đơn hàng
    const order = await Order.findById(id);
    if (!order) {
      throw new Error("Order not found");
    }

    // Nếu trạng thái mới là 'delivered', cập nhật kho hàng và số lượng bán
    if (status === "delivered") {
      for (const detail of order.details) {
        const product = await Product.findById(detail.id);
        if (!product) {
          throw new Error(`Product with ID ${detail.id} not found`);
        }

        // Cập nhật tồn kho và số lượng bán
        const variant = product.variants.find(
          (v: any) => v.material === detail.material
        );
        if (!variant) {
          throw new Error(
            `Variant with material ${detail.material} not found in product ${product.name}`
          );
        }

        const sizeDetail = variant.sizes.find(
          (s: any) => s.size === detail.size
        );
        if (!sizeDetail) {
          throw new Error(
            `Size ${detail.size} not found in material ${variant.material}`
          );
        }

        if (sizeDetail.stock < detail.quantity) {
          throw new Error(
            `Not enough stock for product ${product.name}, material ${variant.material}, size ${sizeDetail.size}`
          );
        }

        sizeDetail.stock -= detail.quantity;
        product.sales += detail.quantity;
        await product.save();
      }
    }

    // Cập nhật trạng thái đơn hàng
    await Order.findByIdAndUpdate(id, { status }, { new: true });

    if (status === "delivered") {
      await createFinance({
        type: "income",
        date: new Date(),
        value: order.cost // Dùng giá trị cost của đơn hàng làm value
      });
    }

    return { success: true, message: "Order status updated successfully" };
  } catch (error) {
    console.error("Error updating order status:", error);
    throw new Error("Failed to update order status");
  }
};

export const getOrderById = async (id: string) => {
  try {
    await connectToDatabase();
    const order = await Order.findById(id);
    if (!order) {
      throw new Error("Order not found");
    }
    const orderDetails = order.details;
    const products = [];
    for (const detail of orderDetails) {
      const product = await Product.findById(detail.id.toString());
      if (!product) {
        throw new Error("Product not found");
      }
      const vouchers = await Voucher.find({
        _id: { $in: product.vouchers }
      });
      const provider = await ProductProvider.findById(product.provider);
      const files = await File.find({ _id: { $in: product.files } });
      products.push({
        product: {
          ...product.toObject(),
          vouchers: vouchers,
          provider: provider,
          files: files
        },
        material: detail.material,
        size: detail.size,
        quantity: detail.quantity,
        unitPrice: detail.unitPrice,
        discount: detail.discount
      });
    }
    const customer = await Customer.findById(order.customer);
    const staff = await Staff.findById(order.staff);
    return {
      order: {
        ...order.toObject(),
        customer: customer,
        staff: staff
      },
      products: products
    };
  } catch (error) {
    console.log("Error fetching Order: ", error);
    throw new Error("Failed to fetch order");
  }
};
