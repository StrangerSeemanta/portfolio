"use server";

import { getCollection } from "@/lib/db/db";
import { ObjectId } from "mongodb";

export async function updateSocialData(
  id: string,
  label: string,
  newhref: string
) {
  try {
    const collection = await getCollection("portfolio", "socials");
    const data = await collection.findOne({ _id: new ObjectId(id) });
    if (!data) throw new Error("No document found with the id");
    const response = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { href: newhref } }
    );
    return response.acknowledged;
  } catch (error) {
    return { error: String(error) };
  }
}
