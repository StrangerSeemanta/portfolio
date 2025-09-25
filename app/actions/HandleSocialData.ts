"use server";

import { getCollection } from "@/lib/db/db";
import { ObjectId } from "mongodb";

export async function addNewSocialData(label: string, href: string) {
  try {
    const collection = await getCollection("portfolio", "socials");
    const modified_href =
      label.toLowerCase() === "email" && !href.includes("mailto:")
        ? "mailto:" + href
        : href;
    const response = await collection.insertOne({
      label: label,
      href: modified_href,
    });
    return response.acknowledged;
  } catch (error) {
    return false;
  }
}

export async function updateSocialData(
  id: string,
  label: string,
  newhref: string
) {
  try {
    const collection = await getCollection("portfolio", "socials");
    const data = await collection.findOne({ _id: new ObjectId(id) });
    if (!data) throw new Error("No document found with the id");
    const modified_href =
      label.toLowerCase() === "email" && !newhref.includes("mailto:")
        ? "mailto:" + newhref
        : newhref;
    const response = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { href: modified_href } }
    );
    return response.acknowledged;
  } catch (error) {
    return false;
  }
}
export async function deleteSocialData(id: string) {
  try {
    const collection = await getCollection("portfolio", "socials");
    const data = await collection.findOne({ _id: new ObjectId(id) });
    if (!data) throw new Error("No document found with the id");
    const response = await collection.deleteOne({ _id: new ObjectId(id) });
    return response.acknowledged;
  } catch (error) {
    return false;
  }
}
