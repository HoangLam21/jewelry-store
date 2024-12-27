"use server"
import cloudinary from "@/cloudinary";
import File from "@/database/file.model";
import formidable from "formidable";

export const createFile = async (file: formidable.File) => {
  try {
    const createdFile = await cloudinary.uploader.upload(file.filepath);
    return await File.create({
      fileName: createdFile.fileName,
      url: createdFile.url,
      publicId: createdFile.publicId,
      bytes: createdFile.bytes,
      width: createdFile.width,
      height: createdFile.height,
      format: createdFile.format,
    });
  } catch (error) {
    console.log("Error create FIle: ", error);
  }
};

export const deleteFile = async (publicId: string) => {
  try {
    await cloudinary.uploader.destroy(publicId);
    return true;
  } catch (error) {
    console.log("Error delete File: ", error);
    return false;
  }
};
