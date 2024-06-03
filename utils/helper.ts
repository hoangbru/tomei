import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const imageResize = (src: string, dimension: string = "w200") =>
  `${process.env.NEXT_PUBLIC_IMAGE_URL}/${dimension}${src}`;

export const generateUniqueId = () => Math.floor(Math.random() * 1000000);

export const getRandomElement = (array: any[]) => {
  if (array?.length === 0) {
    return null;
  }
  let randomIndex = Math.floor(Math.random() * array?.length);
  return array[randomIndex];
};

export const getErrorMessage = (error: any) => {
  let errorMessage;

  if (error) {
    if ("status" in error) {
      const errMsg =
        "error" in error ? error.error : JSON.stringify(error.data);

      errorMessage = errMsg;
    } else {
      errorMessage = error.message;
    }
  } else {
    errorMessage = "Unable to fetch the data. Please try again later.";
  }

  return errorMessage;
};

export const saveTheme = (theme: string) => {
  localStorage.setItem("theme", theme);
};

export const getTheme = () => {
  if (typeof window !== "undefined") {
    const theme = localStorage.getItem("theme");
    return theme ? theme : "";
  }
};
