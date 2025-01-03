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

export const getOrders = async () => {
  try {
    connectToDatabase();
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
            files: product.files,
          },
          material: detail.material,
          size: detail.size,
          quantity: detail.quantity,
          unitPrice: detail.unitPrice,
          discount: detail.discount,
        });
      }
      orderResponse.push({
        ...order.toObject(),
        customer: order.customer,
        staff: order.staff,
        products: products,
      });
    }
    return orderResponse;
  } catch (error) {
    console.log("Error fetching Orders: ", error);
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
    phoneNumber?:string;
    note?:string;
    staff: string;
}) => {
    try {
        connectToDatabase();
        const newOrder = await Order.create({
            cost: data.cost,
            discount: data.discount,
            details: data.details,
            status: data.status,
            shippingMethod: data.shippingMethod,
            ETD: data.ETD,
            customer: new ObjectId(data.customer),
            phoneNumber:data.phoneNumber,
            note:data.note,
            staff: new ObjectId(data.staff),
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
    connectToDatabase();
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
    connectToDatabase();
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

// Cập nhật trạng thái đơn hàng
export const updateOrderStatus = async (id: string, status: string) => {
  try {
    connectToDatabase();
    const order = await Order.findById(id);
    if (!order) {
      throw new Error("Order not found");
    }
    if (status === "delivered") {
      const orderDetails = order.details;
      for (const detail of orderDetails) {
        const product = await Product.findById(detail.id.toString());
        if (!product) {
          throw new Error("Product not found");
        }
        for (const variant of product.variants) {
          if (variant.material === detail.material) {
            for (const size of variant.sizes) {
              if (size.size === detail.size) {
                size.stock -= detail.quantity;
              }
            }
          }
        }
        product.sales += detail.quantity;
        await product.save();
      }
    }
    await Order.findByIdAndUpdate(id, { status: status }, { new: true });
    return true;
  } catch (error) {
    console.log("Error updating Order status: ", error);
    throw new Error("Failed to update order status");
  }
};

export const getOrderById = async (id: string) => {
  try {
    connectToDatabase();
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
        _id: { $in: product.vouchers },
      });
      const provider = await ProductProvider.findById(product.provider);
      const files = await File.find({ _id: { $in: product.files } });
      products.push({
        product: {
          ...product.toObject(),
          vouchers: vouchers,
          provider: provider,
          files: files,
        },
        material: detail.material,
        size: detail.size,
        quantity: detail.quantity,
        unitPrice: detail.unitPrice,
        discount: detail.discount,
      });
    }
    const customer = await Customer.findById(order.customer);
    const staff = await Staff.findById(order.staff);
    return {
      order: {
        ...order.toObject(),
        customer: customer,
        staff: staff,
      },
      products: products,
    };
  } catch (error) {
    console.log("Error fetching Order: ", error);
    throw new Error("Failed to fetch order");
  }
};
