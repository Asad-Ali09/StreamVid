import { SignUpDataType, User, loginDataType, loginReturnType } from "@/types";
import {
  removeUserFromLocalStorage,
  storeUserInLocalStorage,
} from "@/utils/handleLocalStorage";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

const base_url = `${process.env.NEXT_PUBLIC_SERVER_URL}/user`;

const login = async (body: loginDataType): Promise<User | boolean> => {
  try {
    const result = await axios.post<loginReturnType>(`${base_url}`, body, {
      withCredentials: true,
    });

    const user = result.data.data;
    storeUserInLocalStorage(user.name, user.email, user.profilePicture || "");
    return user;
  } catch (error: any) {
    let message;
    if (axios.isAxiosError(error) && error.response) {
      message = error.response?.data.message;
    } else message = error.message || error.toString();

    toast.error(message);

    return false;
  }
};

const isUserLoggedIn = async () => {
  try {
    const result = await axios.get<boolean>(`${base_url}/is-logged-in`, {
      withCredentials: true,
    });
    return result.data;
  } catch (error: any) {
    return false;
  }
};

const logout = async () => {
  try {
    await axios.get(`${base_url}`, { withCredentials: true });
    removeUserFromLocalStorage();
  } catch (error: any) {}
};

const registerUser = async (body: SignUpDataType): Promise<User | boolean> => {
  try {
    const result = await axios.post<loginReturnType>(
      `${base_url}/signup`,
      body,
      {
        withCredentials: true,
      }
    );

    const user = result.data.data;
    storeUserInLocalStorage(user.name, user.email, user.profilePicture || "");
    return user;
  } catch (error: any) {
    let message;
    if (axios.isAxiosError(error) && error.response) {
      message = error.response?.data.message;
    } else message = error.message || error.toString();

    toast.error(message);

    return false;
  }
};

export { login, isUserLoggedIn, logout, registerUser };
