import Customer from "@/database/customer.model";
import { ICustomer } from "@/database/customer.model";
import { connectToDatabase } from "../mongoose";

export const createCustomer = async (data: ICustomer) => {
  try {
    connectToDatabase();
    const newCustomer = await Customer.create({
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      email: data.email,
      address: data.address,
      point: data.point || 0,
      orders: data.orders || [],
      createAt: new Date()
    });
    return newCustomer;
  } catch (error) {
    console.log("Error creating Customer: ", error);
    throw new Error("Failed to create customer");
  }
};

export const getCustomers = async () => {
  try {
    connectToDatabase();
    const customers = await Customer.find().populate("orders");
    return customers;
  } catch (error) {
    console.log("Error fetching Customers: ", error);
    throw new Error("Failed to fetch customers");
  }
};

export const getCustomerById = async (id: string) => {
  try {
    connectToDatabase();
    const customer = await Customer.findById(id).populate("orders");
    if (!customer) {
      throw new Error("Customer not found");
    }
    return customer;
  } catch (error) {
    console.log("Error fetching Customer by ID: ", error);
    throw new Error("Failed to fetch customer");
  }
};

export const updateCustomer = async (id: string, data: Partial<ICustomer>) => {
  try {
    connectToDatabase();
    const updatedCustomer = await Customer.findByIdAndUpdate(
      id,
      {
        ...data,
        updatedAt: new Date(),
      },
      { new: true }
    ).populate("orders");
    if (!updatedCustomer) {
      throw new Error("Customer not found");
    }
    return updatedCustomer;
  } catch (error) {
    console.log("Error updating Customer: ", error);
    throw new Error("Failed to update customer");
  }
};

export const deleteCustomer = async (id: string) => {
  try {
    connectToDatabase();
    const deletedCustomer = await Customer.findByIdAndDelete(id);
    if (!deletedCustomer) {
      throw new Error("Customer not found");
    }
    return true;
  } catch (error) {
    console.log("Error deleting Customer: ", error);
    throw new Error("Failed to delete customer");
  }
};
