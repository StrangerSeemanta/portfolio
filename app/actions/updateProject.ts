"use server";

import { getCollection } from "@/lib/db/db";
import { ProjectType } from "@/lib/db/projectProps";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";

export async function updateProjectAction(formData: FormData) {
  const id = formData.get("id") as string;

  const updatedData: Partial<ProjectType> = {
    id: id,
    // Convert formData to the appropriate types if necessary
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    category: formData.get("category") as string,
    githubUrl: formData.get("githubUrl") as string,
    liveUrl: formData.get("liveUrl") as string,
    featured: formData.get("featured") === "on",
    tech: (formData.getAll("tech[]") as string[])
      .map((tech) => tech.trim())
      .filter(Boolean),
    details: {
      overview: formData.get("overview") as string,
      challenges: formData.get("challenges") as string,
      features: (formData.getAll("features[]") as string[])
        .map((feature) => feature.trim())
        .filter(Boolean),
    },
  };

  const collection = await getCollection("projectDB", "projects");
  await collection.updateOne({ _id: new ObjectId(id) }, { $set: updatedData });

  redirect("/admin/project/edit/report?updated=true&projectId=" + id);
}
