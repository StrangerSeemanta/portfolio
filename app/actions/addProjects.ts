"use server";

import { getCollection } from "@/lib/db/db";
import { ObjectId } from "mongodb";
export async function addProjectToDatabase(formData: FormData) {
  const _id = new ObjectId();
  const id = _id.toString("hex");
  const title = formData.get("title")?.toString().trim();
  const category = formData.get("category")?.toString().trim().split(",").map((cat) => cat.trim());
  const description = formData.get("description")?.toString().trim();
  const image = formData.get("image")?.toString().trim() || null;
  const githubUrl = formData.get("githubUrl")?.toString().trim();
  const liveUrl = formData.get("liveUrl")?.toString().trim();
  const overview = formData.get("overview")?.toString().trim();
  const challenges = formData.get("challenges")?.toString().trim();
  const featured = formData.get("featured") === "on";

  const features = formData.getAll("features[]").filter(Boolean) as string[];
  const tech = formData.getAll("tech[]").filter(Boolean) as string[];

  if (!id || !title || !category || !description) {
    throw new Error("Missing required fields");
  }
  const DATA = {
    id,
    _id,
    title,
    category,
    description,
    image: image,
    githubUrl: githubUrl || "",
    liveUrl: liveUrl || "",
    featured: featured || false,
    tech: tech.length > 0 ? tech : [],
    details: {
      overview: overview || "",
      features: features.length > 0 ? features : [],
      challenges: challenges || "",
    },
  };
  const collection = await getCollection("projectDB", "projects");

  await collection.insertOne(DATA);

  return {
    success: true,
    message: "Project added successfully",
  };
}
