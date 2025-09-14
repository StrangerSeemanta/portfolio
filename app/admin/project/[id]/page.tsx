import { ObjectId } from "mongodb";
import Link from "next/link";
import Image from "next/image";
import { getCollection } from "@/lib/db/db";
import { ProjectType } from "@/lib/db/projectProps";
import {
  ArrowUpRightFromSquare,
  ChartBarStackedIcon,
  Edit3,
  Eye,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/BackButton";

async function fetchProject(id: string) {
  const collection = await getCollection("projectDB", "projects");
  const doc = await collection.findOne({
    _id: new ObjectId(id),
  });
  if (!doc) return null;
  const project = doc as ProjectType;
  return project;
}

export default async function ProjectPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params; // ✅ await the params
  const project = await fetchProject(id);

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-3xl font-bold text-red-500 mb-2">
            <span> Project not found.</span>
          </h2>
          <h3 className="my-4">
            {" "}
            <span>No project matched with given id. </span>
          </h3>
          <BackButton />
        </div>
      </div>
    );
  }

  return (
    <section className="relative text-black bg-gradient-to-br to-indigo-100 from-gray-50 min-h-screen">
      <div className=" p-10 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4 ">
            <BackButton />
            <h1 className="text-3xl font-extrabold text-gray-800">
              Manage Project
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href={`/admin/project/${project._id}/edit`}
              className="flex items-center gap-2 bg-indigo-100 text-indigo-600  px-4 py-2 rounded-full hover:shadow-sm shadow-lg transition duration-200"
            >
              <Edit3 size={20} />
              Edit Project
            </Link>
            <Link
              href={`/admin/project/delete/${project._id}`}
              className="flex items-center gap-2 bg-red-100  text-red-600 px-4 py-2 rounded-full hover:shadow-sm shadow-lg transition duration-200"
            >
              <Trash2 size={20} />
              Delete Project
            </Link>
          </div>
        </div>

        <div className="grid grid-cols md:grid-cols-2 mb-8 gap-4">
          {/* Image Card */}
          {project.image && (
            <div className="group relative w-full h-[350px] overflow-hidden rounded-lg shadow-lg">
              <Image
                src={project.image}
                alt={project.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover rounded-lg transition hover:scale-125 cursor-pointer border-2 border-white shadow-lg "
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 bg-opacity-40 transition-all space-x-2 flex items-center justify-center">
                <Link
                  href={`img/${encodeURIComponent(btoa(project.image))}`}
                  className=" bg-white bg-opacity-80 text-gray-800 px-3 py-1 rounded-full hover:bg-opacity-100 transition"
                >
                  <Eye size={24} className="inline mr-1" />
                  <span> Preview</span>
                </Link>
              </div>
            </div>
          )}

          {/* Description , Title,catagory, feature Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col space-y-4">
            <div>
              <h5 className="text-gray-400 capitalize tracking-wider">
                Project Title:
              </h5>
              <h2 className="text-3xl mt-2 font-bold text-indigo-600 ">
                {project.title}
              </h2>
            </div>
            {project.featured && (
              <Badge className="w-fit text-white text-base">
                Featured Project
              </Badge>
            )}
            <p className="text-lg">
              Category:{" "}
              <span className="text-blue-600 font-semibold">
                {project.category}
              </span>
            </p>
            <div>
              <h3 className=" text-lg font-bold capitalize tracking-wider mb-2">
                Project Description:
              </h3>

              <p className="text-black text-xl tracking-wide ">
                {project.description}
              </p>
            </div>
          </div>

          {/* Details->  Overview,features, challanges */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col  space-y-4">
            <h2 className="text-2xl font-bold text-gray-600 ">
              Project Details
            </h2>

            {/* Overview */}
            <div>
              <h3 className=" text-lg font-bold capitalize tracking-wider mb-2">
                Overview:
              </h3>
              <p className="text-black text-lg tracking-wide ">
                {project.details.overview}
              </p>
            </div>

            {/* Features */}
            <div>
              <h3 className=" text-lg font-bold capitalize tracking-wider mb-3">
                Features:
              </h3>
              {project.details.features &&
              project.details.features.length > 0 ? (
                <ul className="list-disc pl-5 space-y-2">
                  {project.details.features.map((feature, index) => (
                    <li key={index} className="text-black text-lg">
                      {feature}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No features listed.</p>
              )}
            </div>

            {/* Challanges */}
            <div>
              <h3 className=" text-lg font-bold capitalize tracking-wider mb-2">
                challanges:
              </h3>
              {project.details.challenges &&
              project.details.challenges.length > 0 ? (
                <ul className="list-disc pl-5 space-y-2">
                  {project.details.challenges
                    .split(",")
                    .map((challenge, index) => (
                      <li key={index} className="text-black text-lg">
                        {challenge}
                      </li>
                    ))}
                </ul>
              ) : (
                <p className="text-gray-500">No challanges listed.</p>
              )}
            </div>
          </div>

          {/* Tech Stacks, Github & Live URL*/}
          <div className=" flex flex-col space-y-4">
            {/* Tech Stack Card */}
            <div className="bg-gradient-to-r from-red-100 to-purple-50 rounded-xl shadow-lg p-6 flex flex-col items-start gap-3 border border-blue-200">
              <h3 className="text-lg font-bold text-gray-700 mb-2 flex items-center gap-2">
                <ChartBarStackedIcon size={22} className="text-red-600" />
                Tech Stack
              </h3>

              <p>{`Technologies used in this project include: `}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {project.tech && project.tech.length > 0 ? (
                  project.tech.map((techName, idx) => (
                    <Badge
                      key={techName + String(idx)}
                      className="w-fit text-white text-base"
                    >
                      {techName}
                    </Badge>
                  ))
                ) : (
                  <span className="text-gray-500">No tech stack provided.</span>
                )}
              </div>
            </div>
            {/* Github Url Card */}
            <div className="bg-gradient-to-r from-gray-100 to-blue-50 rounded-xl shadow-lg p-6 flex flex-col items-start gap-3 border border-blue-200">
              <h3 className="text-lg font-bold text-gray-700 mb-2 flex items-center gap-2">
                <svg
                  width="22"
                  height="22"
                  fill="currentColor"
                  className="text-gray-800"
                >
                  <path d="M11 .5A10.5 10.5 0 0 0 .5 11c0 4.64 3.01 8.57 7.19 9.96.53.1.72-.23.72-.51v-1.8c-2.93.64-3.55-1.41-3.55-1.41-.48-1.22-1.17-1.54-1.17-1.54-.96-.66.07-.65.07-.65 1.06.07 1.62 1.09 1.62 1.09.94 1.61 2.47 1.15 3.07.88.1-.68.37-1.15.67-1.42-2.34-.27-4.8-1.17-4.8-5.19 0-1.15.41-2.09 1.09-2.83-.11-.27-.47-1.36.1-2.83 0 0 .88-.28 2.89 1.08a9.94 9.94 0 0 1 2.63-.35c.89 0 1.79.12 2.63.35 2.01-1.36 2.89-1.08 2.89-1.08.57 1.47.21 2.56.1 2.83.68.74 1.09 1.68 1.09 2.83 0 4.03-2.47 4.91-4.81 5.18.38.33.72.97.72 1.96v2.91c0 .28.19.61.73.51A10.5 10.5 0 0 0 21.5 11 10.5 10.5 0 0 0 11 .5z" />
                </svg>
                Github Repository
              </h3>
              <p>
                {`Visit the project's source code on GitHub for more details and
                contributions.`}
              </p>
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5"
                >
                  <Button
                    size={"lg"}
                    variant={"themed_glowing"}
                    className="flex items-center gap-2"
                  >
                    <ArrowUpRightFromSquare size={20} />
                    View On Github
                  </Button>
                </a>
              ) : (
                <span className="text-gray-500">No Github URL provided.</span>
              )}
            </div>
            {/* Live Url Card */}
            <div className="bg-gradient-to-r from-green-100 to-white rounded-xl shadow-lg p-6 flex flex-col items-start gap-3 border border-green-200">
              <h3 className="text-lg font-bold text-gray-700 mb-2 flex items-center gap-2">
                <svg
                  width="22"
                  height="22"
                  fill="currentColor"
                  className="text-green-600"
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M7 11l2 2 4-4"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
                Live Preview
              </h3>
              <p>
                {`Check out the live version of the project to see it in action.`}
              </p>
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5"
                  aria-label="View Live Project"
                >
                  <Button
                    size={"lg"}
                    variant={"themed_glowing"}
                    className="flex items-center gap-2"
                  >
                    <ArrowUpRightFromSquare size={20} />
                    View Live Project
                  </Button>
                </a>
              ) : (
                <span className="text-gray-500">No Live URL provided.</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
    </section>
  );
}
