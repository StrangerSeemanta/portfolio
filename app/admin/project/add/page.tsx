"use client";
import { redirect } from "next/navigation";
import { getCollection } from "@/lib/db/db";
import { ObjectId } from "mongodb";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addProjectToDatabase } from "@/app/actions/addProjects";
import { useState } from "react";

export default function AddProjectPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  async function handleSubmit(formData: FormData) {
    try {
      setIsSubmitting(true);
      const result = await addProjectToDatabase(formData);
      if (result.success) {
        console.log(result.message);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Error adding project:", error);
      // Handle error (e.g., show a notification)
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="text-black bg-gradient-to-b from-yellow-100 to-gray-100 min-h-screen p-8">
      <div className="p-10 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Add New Project
        </h1>
        <form action={handleSubmit} className="space-y-6">
          <Input
            className="text-black bg-gray-200"
            required
            name="title"
            placeholder="Project Title"
          />
          <Input
            className="text-black bg-gray-200"
            required
            name="category"
            placeholder="Category"
          />
          <Input
            className="text-black bg-gray-200"
            name="image"
            placeholder="Image URL"
          />
          <Textarea
            className="bg-gray-200 text-black"
            required
            name="description"
            placeholder="Short Description"
          />
          <Textarea
            className="bg-gray-200 text-black"
            name="overview"
            placeholder="Overview"
          />
          <Textarea
            className="bg-gray-200 text-black"
            name="challenges"
            placeholder="Challenges"
          />

          <div className="space-y-2">
            <label className="block font-semibold">Features</label>
            <Input
              className="text-black bg-gray-200"
              name="features[]"
              placeholder="Feature 1"
            />
            <Input
              className="text-black bg-gray-200"
              name="features[]"
              placeholder="Feature 2"
            />
            <Input
              className="text-black bg-gray-200"
              name="features[]"
              placeholder="Feature 3"
            />
            <Button type="button" className="text-white">
              + Add More Features
            </Button>
          </div>

          <div className="space-y-2">
            <label className="block font-semibold">Tech Stack</label>
            <Input
              className="text-black bg-gray-200"
              name="tech[]"
              placeholder="Tech 1"
            />
            <Input
              className="text-black bg-gray-200"
              name="tech[]"
              placeholder="Tech 2"
            />
            <Input
              className="text-black bg-gray-200"
              name="tech[]"
              placeholder="Tech 3"
            />
            <Button type="button" className="text-white">
              + Add More Tech
            </Button>
          </div>

          <Input
            className="text-black bg-gray-200"
            name="githubUrl"
            type="url"
            placeholder="GitHub URL"
          />
          <Input
            className="text-black bg-gray-200"
            name="liveUrl"
            type="url"
            placeholder="Live URL"
          />

          <div className="flex items-center space-x-2">
            <input
              className="text-black bg-gray-200 w-4 h-4"
              type="checkbox"
              name="featured"
              id="featured"
            />
            <label htmlFor="featured">Mark as Featured Project</label>
          </div>

          <Button type="submit" variant={"themed_glowing"} className="w-full">
            {isSubmitting ? "Adding..." : "Add Project"}
          </Button>
        </form>
      </div>
    </section>
  );
}
