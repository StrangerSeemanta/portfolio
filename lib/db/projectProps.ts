import { ObjectId } from "mongodb";

export interface ProjectType {
  id: string;
  _id: ObjectId | string; // Use ObjectId for MongoDB compatibility
  title: string;
  hidden:boolean;
  featured: boolean;
  category: string;
  description: string;
  image: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  details: {
    overview: string;
    features: string[];
    challenges: string;
  };
}
