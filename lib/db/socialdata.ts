import { ObjectId } from "mongodb";
import { getCollection } from "./db";

export interface SocialData {
  label: string;
  href: string;
}
export interface SocialDataWithObjectId extends SocialData {
  _id: ObjectId;
}

export async function getSocialMediaData() {
  try {
    const social_data_collection = await getCollection("portfolio", "socials");
    const social_data_list = await social_data_collection.find({}).toArray();
    const response = social_data_list as unknown as SocialDataWithObjectId[];
    return response;
  } catch (error) {
    throw new Error(String(error));
  }
}
