import { getCollection } from "@/lib/db/db";
import { ProjectType } from "./projectProps";

export async function fetchProjects(): Promise<ProjectType[]> {
  try {
    const collection = await getCollection("projectDB", "projects");
    const projects = (await collection
      .find({})
      .toArray()) as unknown as ProjectType[];

    return projects.map((project) => ({
      ...project,
      id: typeof project._id ==="string"?project._id:project._id.toString("hex"),
      _id: project._id,
      details: {
        ...project.details,
        features: project.details.features || [],
        challenges: project.details.challenges || "No Challanges Listed",
      },
      image: project.image || "",
      tech: project.tech || [],
      liveUrl: project.liveUrl || "",
      githubUrl: project.githubUrl || "",
      featured: project.featured || false,
      category: project.category || "Uncategorized",
      description: project.description || "No description available",
      title: project.title || "Untitled Project",
    }));
  } catch (error) {
    throw new Error("Failed to fetch projects: " + error);
  }
}
