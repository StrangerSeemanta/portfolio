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
    const prevMsgWithThisEmail = (await collection
      .find({ email: message.email })
      .toArray()) as unknown as MessageType[];
    if (prevMsgWithThisEmail.length > 0) {
      if (
        prevMsgWithThisEmail[0].email === message.email &&
        prevMsgWithThisEmail[0].name === message.name
      ) {
        const result = await collection.insertOne(message);
        return result;
      } else {
        throw new Error(
          "Message with this email already exists with different name",
        );
      }
    }
    const result = await collection.insertOne(message);
    return result;
  } catch (error) {
    throw new Error("Can't Write Message: " + String(error));
  }
}
