import { User } from "@/types";

export const storeUserInLocalStorage = (
  name: string,
  email: string,
  profilePicture: string
) => {
  localStorage.setItem("name", name);
  localStorage.setItem("email", email);
  localStorage.setItem("profilePicture", profilePicture || "");
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("name");
  localStorage.removeItem("email");
  localStorage.removeItem("profilePicture");
};

export const getUserFromLocalStorage = (): User => {
  const name = localStorage.getItem("name") || "";
  const email = localStorage.getItem("email") || "";
  const profilePicture = localStorage.getItem("profilePicture") || "";

  return { name, email, profilePicture };
};
