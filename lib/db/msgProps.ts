import { ObjectId } from "mongodb";

export interface MessageType {
  _id:string | ObjectId;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
}