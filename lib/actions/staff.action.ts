"use server"
import Staff from "@/database/staff.model";
import { connectToDatabase } from "../mongoose";

export const createStaff = async (data: { fullName: string, phoneNumber: string, email: string, address: string, avatar: string, enrolledDate: Date, salary: string, position: string }) => {
  try {
    connectToDatabase();
    const newStaff = await Staff.create({
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      email: data.email,
      address: data.address,
      avatar: data.avatar,
      enrolledDate: data.enrolledDate,
      salary: data.salary,
      position: data.position,
      createdAt: new Date(),
    });
    return newStaff;
  } catch (error) {
    console.log("Error creating Staff: ", error);
    throw new Error("Failed to create staff");
  }
};

export const getStaffs = async () => {
  try {
    connectToDatabase();
    const staffs = await Staff.find();
    return staffs;
  } catch (error) {
    console.log("Error fetching Staffs: ", error);
    throw new Error("Failed to fetch staffs");
  }
};

export const getStaffById = async (id: string) => {
  try {
    connectToDatabase();
    const staff = await Staff.findById(id);
    if (!staff) {
      throw new Error("Staff not found");
    }
    return staff;
  } catch (error) {
    console.log("Error fetching Staff by ID: ", error);
    throw new Error("Failed to fetch staff");
  }
};

export const updateStaff = async (id: string, data: Partial<{ fullName: string, phoneNumber: string, email: string, address: string, avatar: string, enrolledDate: Date, salary: string, position: string }>) => {
  try {
    connectToDatabase();
    const updatedStaff = await Staff.findByIdAndUpdate(
      id,
      {
        ...data,
        updatedAt: new Date(),
      },
      { new: true }
    );
    if (!updatedStaff) {
      throw new Error("Staff not found");
    }
    return updatedStaff;
  } catch (error) {
    console.log("Error updating Staff: ", error);
    throw new Error("Failed to update staff");
  }
};

export const deleteStaff = async (id: string) => {
  try {
    connectToDatabase();
    const deletedStaff = await Staff.findByIdAndDelete(id);
    if (!deletedStaff) {
      throw new Error("Staff not found");
    }
    return true;
  } catch (error) {
    console.log("Error deleting Staff: ", error);
    throw new Error("Failed to delete staff");
  }
};
