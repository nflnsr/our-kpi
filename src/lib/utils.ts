import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_API as string,
});

const axiosPrivateInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_API as string,
  withCredentials: true,
});

function getFileNameFromURL(url?: string) {
  if (!url) {
    return;
  }
  const urlObject = new URL(url as string);
  console.log(urlObject);

  const pathname = urlObject.pathname;
  console.log(pathname);
  
  const fileName = pathname.split('/').pop();
  
  return fileName;
}

export { axiosInstance, axiosPrivateInstance, getFileNameFromURL };