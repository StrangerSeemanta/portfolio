"use client";
import { Badge } from "@/components/ui/badge";
import { ProjectType } from "@/lib/db/projectProps";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
function Projects() {
  const [projects, setProjects] = useState<ProjectType[] | null>(null);
  const [loading, setLoading] = useState(true);
  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/getprojects", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache:"no-store"
      });

      if (!response.ok) {
        throw new Error("Bad response. "+response.statusText);
      }
      const data = await response.json();
      setProjects(data);
      toast.success("Fetched Updated Project Data");
    } catch (error) {
      toast.error("Failed to fetch project data: ", { description: String(error) });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);
  return (
    <section>
      {loading ? (
        <div className="w-full p-20 flex justify-center items-center">
          <div className="min-w-12 min-h-12 gap-20 flex flex-col justify-center items-center">
            <div className="min-w-12 min-h-12 relative flex justify-center items-center ">
              <div className="absolute w-8 h-8 rounded-full bg-blue-600 z-40 "></div>
              <div className="absolute w-10 h-10 rounded-full bg-blue-300 z-30 animate-ping  delay-200"></div>
              <div className="absolute w-16 h-16 rounded-full bg-blue-200 z-20 animate-ping delay-100"></div>
              <div className="absolute w-20 h-20 rounded-full bg-blue-100 z-20 animate-ping "></div>
            </div>
            <h1 className="text-3xl  ">Loading Projects</h1>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects ? (
            projects.map((project) => (
              <div
                key={project.id + String(project._id.toString("base64"))}
                className="bg-white hover:brightness-95  transition shadow-lg flex flex-col justify-between min-h-64 p-2 overflow-hidden"
              >
                <div>
                  {/* Thumbnail Image */}
                  {project.image && (
                    <div className="relative">
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={400}
                        height={225}
                        className="w-full h-[200px] object-cover"
                        priority={project.featured}
                      />
                      {project.featured && (
                        <Badge className="absolute top-3 left-3 bg-gradient-to-r from-[#00b4d8] to-[#7209b7] animate-pulse">
                          Featured
                        </Badge>
                      )}
                    </div>
                  )}
                  <div className="p-5 space-y-4 flex-1 flex flex-col">
                    <div className="my-3 flex items-center gap-3">
                      <h2 className="text-xl font-bold">{project.title}</h2>
                      <span className="text-xs px-2 py-1 rounded bg-red-100 text-red-600">
                        {project.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {project.description}
                    </p>

                    <div className="flex justify-end">
                      <Link
                        className="bg-blue-100 p-1 text-sm px-2 text-indigo-700 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-600 rounded"
                        href={`/admin/project/${project._id.toString()}`}
                        tabIndex={0}
                        aria-label={`View details for ${project.title}`}
                      >
                        View Project
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h1>No Projects Available ...</h1>
          )}
        </div>
      )}
    </section>
  );
}

export default Projects;
