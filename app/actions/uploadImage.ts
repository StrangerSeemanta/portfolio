"use server";
import { getCollection } from "@/lib/db/db";
import { getValidImageHostnames, isImageUrlValid } from "@/lib/utils";
import { put } from "@vercel/blob";

export async function uploadImageFileToVercel(file: File, id: string) {
  const collectionName = await getCollection("projectDB", "projects");
  const project = await collectionName.findOne({ id });
  if (!project) {
    throw new Error("Project not found");
  }
  const vercelBlob = await put(`project_thumbnails/${id}/${file.name}`, file, {
    token: process.env.BLOB_READ_WRITE_TOKEN,
    contentType: file.type,
    access: "public",
    cacheControlMaxAge: 60 * 60 * 24, // 1 day
    addRandomSuffix: true, // Ensures unique file names
  });
  if (!vercelBlob) {
    throw new Error("Failed to upload image");
  }
  // Update the project with the new image URL
  await collectionName.updateOne({ id }, { $set: { image: vercelBlob.url } });
  return vercelBlob;
}

export async function updateImageUrl(image_url: string, id: string) {

  const collectionName = await getCollection("projectDB", "projects");
  const project = await collectionName.findOne({ id });
  if (!project) {
    throw new Error("Project not found");
  }
  if (image_url.length === 0) {
    throw new Error("Image URl is missing. Failed to update");
  }
  if (!isImageUrlValid(image_url)) {
    throw new Error(
      `Unknown hostname. Image url need to be copied from  (${getValidImageHostnames().join(
        ", "
      )}) websites.`
    );
  }
  // Update the project with the new image URL
  await collectionName.updateOne({ id }, { $set: { image: image_url } });
}
