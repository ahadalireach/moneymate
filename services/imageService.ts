import axios from "axios";
import Constants from "expo-constants";
import { ResponseType } from "../types";

const CLOUD_NAME = Constants.expoConfig?.extra?.CLOUD_NAME;
const UPLOAD_PRESET = Constants.expoConfig?.extra?.UPLOAD_PRESET;
const CLOUDINARY_API_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

export const getProfileImage = (file: any) => {
  console.log(file);

  if (file && typeof file == "string") return file;
  if (file && typeof file == "object") return file.uri;

  return require("../assets/images/defaultAvatar.png");
};

export const getProfilePath = (file: any) => {
  console.log(file);

  if (file && typeof file == "string") return file;
  if (file && typeof file == "object") return file.uri;

  return null;
};

export const uploadFileToCloudinary = async (
  file: { uri?: string } | string,
  folderName: string
): Promise<ResponseType> => {
  try {
    if (!file) return { success: true, data: null };
    if (typeof file == "string") {
      return { success: true, data: file };
    }

    if (file && file.uri) {
      const formData = new FormData();
      formData.append("file", {
        uri: file?.uri,
        type: "image/jpeg",
        name: file?.uri?.split("/").pop() || "file.jpg",
      } as any);

      formData.append("upload_preset", UPLOAD_PRESET);
      formData.append("folder", folderName);

      const response = await axios.post(CLOUDINARY_API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return { success: true, data: response?.data?.secure_url };
    }
    return { success: true };
  } catch (error: any) {
    console.log("Error uploading file/image", error);
    return { success: false, msg: error.message || "Could not upload file" };
  }
};
