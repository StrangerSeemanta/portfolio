import { ProjectType } from "@/components/sections/projects-section";
import { getCollection } from "@/lib/db/db";

export async function fetchProjects() {
  try {
    const collection = await getCollection("projectDB", "projects");
    const projects = await collection.find({}).toArray();
    return projects.map((project) => ({
      id: project._id.toString("base64"),
      ...project,
    })) as unknown as ProjectType[];
  } catch (error) {
    throw new Error("Failed to fetch projects: " + error);
  }
}
