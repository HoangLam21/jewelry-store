"use server"
import ProductProvider from "@/database/provider.model";
import { connectToDatabase } from "../mongoose";

export const createProvider = async (data: { 
  name: string; 
  address: string; 
  contact: string;
}) => {
  try {
    connectToDatabase();
    const newProvider = await ProductProvider.create({
      name: data.name,
      address: data.address,
      contact: data.contact,
    });
    return newProvider;
  } catch (error) {
    console.log("Error creating Provider: ", error);
    throw new Error("Failed to create provider");
  }
};

export const getProviders = async () => {
  try {
    connectToDatabase();
    const providers = await ProductProvider.find();
    return providers;
  } catch (error) {
    console.log("Error fetching Providers: ", error);
    throw new Error("Failed to fetch providers");
  }
};

export const getProviderById = async (id: string) => {
  try {
    connectToDatabase();
    const provider = await ProductProvider.findById(id);
    if (!provider) {
      throw new Error("Provider not found");
    }
    return provider;
  } catch (error) {
    console.log("Error fetching Provider by ID: ", error);
    throw new Error("Failed to fetch provider");
  }
};

export const updateProvider = async (id: string, data: Partial<{ 
  name: string; 
  address: string; 
  contact: string;
}>) => {
  try {
    connectToDatabase();
    const updatedProvider = await ProductProvider.findByIdAndUpdate(
      id,
      {
        ...data
      },
      { new: true }
    );
    if (!updatedProvider) {
      throw new Error("Provider not found");
    }
    return updatedProvider;
  } catch (error) {
    console.log("Error updating Provider: ", error);
    throw new Error("Failed to update provider");
  }
};

export const deleteProvider = async (id: string) => {
  try {
    connectToDatabase();
    const deletedProvider = await ProductProvider.findByIdAndDelete(id);
    if (!deletedProvider) {
      throw new Error("Provider not found");
    }
    return true;
  } catch (error) {
    console.log("Error deleting Provider: ", error);
    throw new Error("Failed to delete provider");
  }
};
