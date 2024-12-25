import cloudinary from "@/cloudinary";
import Image, { IImage } from "@/database/image.model";
import formidable from "formidable";

export const createImage = async (file: formidable.File) => {
  try {
    const createdImage = await cloudinary.uploader.upload(file.filepath);
    return await Image.create({
      fileName: createdImage.fileName,
      url: createdImage.url,
      publicId: createdImage.publicId,
      bytes: createdImage.bytes,
      width: createdImage.width,
      height: createdImage.height,
      format: createdImage.format,
    });
  } catch (error) {
    console.log("Error create Image: ", error);
  }
};

export const deleteImage = async (publicId: string) => {
  try {
    await cloudinary.uploader.destroy(publicId);
    return true;
  } catch (error) {
    console.log("Error delete Image: ", error);
    return false;
  }
};
