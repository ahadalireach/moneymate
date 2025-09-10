import { firestore } from "../config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { ResponseType, UserDataType } from "../types";

export const updateUser = async (
  uid: string,
  updatedData: UserDataType
): Promise<ResponseType> => {
  try {
    const userRef = doc(firestore, "users", uid);
    await updateDoc(userRef, updatedData);

    return { success: true, msg: "User data updated successfully" };
  } catch (error: any) {
    console.log("Error updating user:", error);
    return { success: false, msg: error?.message };
  }
};
