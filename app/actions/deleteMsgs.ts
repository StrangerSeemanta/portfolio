"use server";

import { getCollection } from "@/lib/db/db";

export async function deleteMessages() {
  try {
    const collection = await getCollection("portfolio", "messages");
    const deleteResponse = await collection.deleteMany({});
    return deleteResponse;
  } catch (error) {
    throw new Error("Failed to delete messages: " + String(error));
  }
}

export async function deleteMessagesByEmail(email: string) {
  try {
    const collection = await getCollection("portfolio", "messages");
    const deleteResponse = await collection.deleteMany({ email });
    return deleteResponse;
  } catch (error) {
    throw new Error("Failed to delete messages by email: " + String(error));
  }
}
