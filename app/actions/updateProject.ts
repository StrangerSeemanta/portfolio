"use server";

import { getCollection } from "@/lib/db/db";
import { ProjectType } from "@/lib/db/projectProps";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";

export async function updateProjectAction(formData: FormData) {
  let isUpdated = false;
  let __error = ""
  let __id = ""
  try {
    const id = formData.get("id") as string;
    if (!id) throw new Error("No project id found !");
    __id = id
    const updatedData: Partial<ProjectType> = {
      id: id,
      // Convert formData to the appropriate types if necessary
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      category: formData.get("category") as string,
      githubUrl: formData.get("githubUrl") as string,
      liveUrl: formData.get("liveUrl") as string,
      featured: formData.get("featured") === "on",
      hidden:formData.get("hidden")==="on",
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
    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );
    isUpdated = true;
  } catch (error) {
    console.log(error);
    __error = String(error)
  }

  if (isUpdated) {
    redirect("/admin/project/report?updated=true&projectId="+__id);
  }else{
    redirect("/admin/project/report?updated=false&error_text=" + String(__error));
  }
}
