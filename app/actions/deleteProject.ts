"use server";

import { getCollection } from "@/lib/db/db";
import { ObjectId } from "mongodb";

export async function deleteProject(projectId: string) {
  try {
    const collection = await getCollection("projectDB", "projects");
    const project = await collection.findOne({ _id: new ObjectId(projectId) });
    if (!project) return;
    const deleteProjectResponse = await collection.deleteOne({
      _id: new ObjectId(projectId),
    });
    return deleteProjectResponse;
  } catch (error) {
    throw new Error("Failed to delete project " + String(error));
  }
}
