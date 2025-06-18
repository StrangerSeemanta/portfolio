"use server";
import { ProjectType } from "@/components/sections/projects-section";
import { getCollection } from "@/lib/db/db";

export async function fetchProjectsActions() {
  try {
    const collection = await getCollection("projectDB", "projects");
    const projects = await collection.find({}).toArray();
    const response = projects.map((project) => ({
      id: project._id.toString("base64"),
      ...project,
      _id: {
        hex: project._id.toString("hex"),
        base64: project._id.toString("base64"),
      },
    })) as unknown as ProjectType[];
    return response;
  } catch (error) {
    throw new Error("Failed to fetch projects: " + error);
  }
}
