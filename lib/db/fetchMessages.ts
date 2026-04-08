import { getCollection } from "./db";
import { MessageType } from "./msgProps";

export async function fetchInbox() {
  try {
    const collection = await getCollection("portfolio", "messages");
    const msgs = await collection.find({}).toArray() as unknown as MessageType[];
    return msgs;
  } catch (error) {
    throw new Error("Failed to fetch inbox: " + error);
  }
}

export async function fetchMessagesByEmail(email: string) {
  try {
    const collection = await getCollection("portfolio", "messages");
    const msgs = await collection.find({ email }).toArray() as unknown as MessageType[];
    return msgs;
  } catch (error) {
    throw new Error("Failed to fetch messages by email: " + error);
  } 
}