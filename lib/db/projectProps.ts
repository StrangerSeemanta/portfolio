import { ObjectId } from "mongodb";

export interface ProjectType {
  id: string;
  _id: ObjectId | string; // Use ObjectId for MongoDB compatibility
  title: string;
  category: string;
  description: string;
  image: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  details: {
    overview: string;
    features: string[];
    challenges:  string;
  };
}