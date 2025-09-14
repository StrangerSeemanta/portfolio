import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getValidImageHostnames(): string[] {
  const validHostnames = ["https://images.pexels.com"];
  return validHostnames
}
export function isImageUrlValid(image_url: string): boolean {
  const validHostnames = getValidImageHostnames();
  const validation = validHostnames.some((hostname) =>
    image_url.includes(hostname)
  );
  return validation;
}
