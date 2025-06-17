import { getCollection } from "./db";

interface MessageType {
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
}
export async function sendMessage(message: MessageType) {
  try {
    // Insert the message
    const collection = await getCollection("portfolio", "messages");
    const result = await collection.insertOne(message);
    return result;
  } catch (error) {
    throw new Error("Can't Write Message: " + String(error));
  }
}
