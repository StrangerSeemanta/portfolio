// app/admin/page.tsx

import { Badge } from "@/components/ui/badge";
import { fetchProjects } from "@/lib/db/fetchProjects"; // your existing function
import { ProjectType } from "@/lib/db/projectProps";
import Image from "next/image";
import Link from "next/link";

export async function getServerSideProps(){
    const projects = await fetchProjects();
    return {props:{projects}}
}

export default async function AdminDashboard({projects}:{projects:ProjectType[]}) {

  return (
    <section className="text-black bg-white">
      <div className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

        <div className="mb-6">
          <Link
            href="/admin/project/add"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Add New Project
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
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
          ))}
        </div>
      </div>
    </section>
  );
}
