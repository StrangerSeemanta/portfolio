import { ObjectId } from "mongodb";
import Link from "next/link";
import Image from "next/image";
import { getCollection } from "@/lib/db/db";
import { ProjectType } from "@/lib/db/projectProps";
import { ChartBarStackedIcon, ImagePlus, Save } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/BackButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateProjectAction } from "@/app/actions/updateProject";

async function fetchProject(id: string) {
  try {
    const collection = await getCollection("projectDB", "projects");
    const doc = await collection.findOne({
      _id: new ObjectId(id),
    });
    if (!doc) return null;
    const project = doc as ProjectType;
    return project;
  } catch (error) {
    return null;
  }
}

export default async function EditProjectPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params; // ✅ await the params
  const project = await fetchProject(id);
  const handleSubmit = async (formData: FormData) => {
    "use server";
    await updateProjectAction(formData);
  };

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
              Edit Project
            </h1>
          </div>
          {!project.image && (
            <Link
              href={`/admin/project/${project._id}/edit/uploadImg`}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              <ImagePlus size={20} className="inline mr-1" />
              <span> Add Image</span>
            </Link>
          )}
        </div>
        <form action={handleSubmit} className="space-y-8">
          <input type="hidden" name="id" value={project._id.toString()} />
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
                    href={`/admin/project/${project._id}/edit/uploadImg`}
                    className=" bg-white bg-opacity-80 text-gray-800 px-3 py-1 rounded-full hover:bg-opacity-100 transition"
                  >
                    <ImagePlus size={20} className="inline mr-1" />{" "}
                    <span> Change</span>
                  </Link>
                </div>
              </div>
            )}

            {/* Description , Title,catagory, feature Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col space-y-4">
              <div>
                <h2 className="text-2xl mt-2 font-bold text-indigo-600 ">
                  Project Title:
                </h2>
                <Input
                  required
                  name="title"
                  type="text"
                  placeholder="Enter project title"
                  className="text-2xl mt-2 font-bold text-indigo-600 "
                  defaultValue={
                    project.title ? project.title : "Untitled Project"
                  }
                />
              </div>
              {project.featured && (
                <div>
                  {" "}
                  <Badge className="w-fit text-white text-base">
                    Featured Project
                  </Badge>
                </div>
              )}

              <div className="mt-2 flex items-center">
                <label htmlFor="featured">Mark as Featured Project</label>
                <Input
                  type="checkbox"
                  name="featured"
                  id="featured"
                  defaultChecked={project.featured}
                  className="ml-2 h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
              </div>

              {/* Is hidden & manage */}
              <div>
                {project.hidden ? (
                  <h3 className="bg-red-100  text-3xl p-2 border-4 border-double text-center border-red-400 text-red-600 font-bold">
                    This project is hidden
                  </h3>
                ) : (
                  <h3 className="bg-green-100  text-3xl p-2 border-4 border-double text-center border-green-400 text-green-600 font-bold">
                    This project is public
                  </h3>
                )}
              </div>
              <div className="mt-2 flex items-center">
                <label htmlFor="hidden">Mark as Hidden Project</label>
                <Input
                  type="checkbox"
                  name="hidden"
                  id="hidden"
                  defaultChecked={project.hidden}
                  className="ml-2 h-4 w-4 checked:text-red-600 bg-red-600  checked:border-gray-300 rounded focus:ring-red-500"
                />
              </div>

              <p className="text-lg">
                Category:{" "}
                <Input
                  required
                  name="category"
                  type="text"
                  placeholder="Enter project category"
                  className="text-lg mt-2 font-bold text-black w-fit bg-gray-100 "
                  defaultValue={
                    project.category ? project.category.join(", ") : "Uncategorized"
                  }
                />
              </p>
              <div>
                <h3 className=" text-lg font-bold capitalize tracking-wider mb-2">
                  Project Description:
                </h3>

                <Textarea
                  required
                  name="description"
                  placeholder="Enter project category"
                  className=" mt-2  text-black bg-gray-100 "
                  defaultValue={
                    project.description
                      ? project.description
                      : "No description provided"
                  }
                />
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
                <Textarea
                  name="overview"
                  placeholder="Enter project overview"
                  className=" mt-2  text-black bg-gray-100 "
                  defaultValue={
                    project.details.overview ? project.details.overview : ""
                  }
                />
              </div>

              {/* Features */}
              <div>
                <h3 className=" text-lg font-bold capitalize tracking-wider mb-3">
                  Features:
                </h3>
                {project.details.features &&
                project.details.features.length > 0 ? (
                  <ol className="list-decimal pl-5 space-y-2">
                    {project.details.features.map((feature, index) => (
                      <li
                        key={index.toString() + feature}
                        className="text-black text-lg"
                      >
                        <Input
                          name={`features[]`}
                          type="text"
                          placeholder={`Feature ${index + 1}`}
                          className="text-lg mt-2  text-black bg-gray-100 "
                          defaultValue={feature ? feature : ""}
                        />
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="text-gray-500">No features listed.</p>
                )}
                <Input
                  name={`features[]`}
                  type="text"
                  placeholder={`+ Add new feature`}
                  className="text-lg mt-2  text-black bg-gray-100 w-fit"
                />
              </div>

              {/* Challanges */}
              <div>
                <h3 className=" text-lg font-bold capitalize tracking-wider mb-2">
                  challanges:
                </h3>
                <Textarea
                  name="challenges"
                  placeholder="Enter project challenges"
                  className=" mt-2  text-black bg-gray-100 "
                  defaultValue={
                    project.details.challenges ? project.details.challenges : ""
                  }
                />
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
                      <Input
                        key={idx.toString() + techName}
                        name={`tech[]`}
                        type="text"
                        placeholder={`Tech Stack ${idx + 1}`}
                        className="text-lg mt-2  text-black bg-gray-100 w-fit"
                        defaultValue={techName}
                      />
                    ))
                  ) : (
                    <span className="text-gray-500">
                      No tech stack provided.
                    </span>
                  )}
                </div>
                <Input
                  name={`tech[]`}
                  type="text"
                  placeholder={`+ Add new tech stack`}
                  className="text-lg mt-2  text-black bg-gray-100 w-fit"
                />
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
                <Input
                  name="githubUrl"
                  type="url"
                  placeholder="Enter Github URL"
                  className="text-lg mt-2 font-bold text-black bg-gray-100 w-full"
                  defaultValue={project.githubUrl ? project.githubUrl : ""}
                />
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
                <Input
                  name="liveUrl"
                  type="url"
                  placeholder="Enter Live URL"
                  className="text-lg mt-2 font-bold text-black bg-gray-100 w-full"
                  defaultValue={project.liveUrl ? project.liveUrl : ""}
                />
              </div>
            </div>
          </div>
          <div className=" w-full flex items-center gap-4">
            <Button
              variant="themed_glowing"
              size={"lg"}
              type="submit"
              className="flex items-center w-full justify-center"
            >
              <Save size={20} className="mr-2" />
              <span>Save Changes</span>
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
