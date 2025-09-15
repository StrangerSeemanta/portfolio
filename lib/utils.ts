import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getValidImageHostnames(): string[] {
  const validHostnames = ["https://images.pexels.com"];
  return validHostnames;
}
export function isImageUrlValid(image_url: string): boolean {
  const validHostnames = getValidImageHostnames();
  const validation = validHostnames.some((hostname) =>
    image_url.includes(hostname)
  );
  return validation;
}


export function object_to_string_array(o: Record<string, any>): any[] {
  const isPrimitive = (v: unknown): v is string | number | boolean =>
    typeof v === "string" || typeof v === "number" || typeof v === "boolean";

  return Object.values(o).map((value) => {
    if (isPrimitive(value)) return String(value);
    // Special case for MongoDB ObjectId
    if (Array.isArray(value)) {
      return value.flatMap((item) => {
        if (isPrimitive(item)) return String(item);
        if (item && typeof item === "object")
          return object_to_string_array(item);
        return [];
      });
    }

    if (value && typeof value === "object") {
      return object_to_string_array(value);
    }

    return [];
  });
}
