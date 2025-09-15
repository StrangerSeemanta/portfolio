"use client";
import { Fragment, useCallback, useEffect, useState } from "react";
import { ProjectType } from "@/lib/db/projectProps";
import BackButton from "@/components/BackButton";
import { ArrowDownSquare } from "lucide-react";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { object_to_string_array } from "@/lib/utils";
import RippleLoader from "@/components/RippleLoader";
import { deleteProject } from "@/app/actions/deleteProject";

export default function DeleteProjectPage() {
  const params = useParams();
  const id = params.id;
  const router = useRouter();
  const [project, setProject] = useState<ProjectType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setDeleteState] = useState(false);
  const [finalAlert, setFinalAlert] = useState(false);
  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      if (!id || String(id).length === 0) throw new Error("No id found");
      const response = await fetch("/api/getprojects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ projectId: String(id) }),
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Bad response. " + response.statusText);
      }
      const data = await response.json();
      setProject(data as unknown as ProjectType);
    } catch (error) {
      toast.error("Failed to fetch project data: ", {
        description: String(error),
      });
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleDeleteProject = async () => {
    try {
      setDeleteState(true);
      setFinalAlert(false);
      if (!id || String(id).length === 0) throw new Error("No id found");

      const deleteResult = await deleteProject(String(id));
      if (!deleteResult || !deleteResult.acknowledged) {
        throw new Error("Failed to get delete result");
      }

      toast.success("Project Deleted successfully");
      router.push("/admin");
    } catch (error) {
      toast.error("Failed to fetch project data: ", {
        description: String(error),
      });
    } finally {
      setDeleteState(false);
    }
  };

  return (
    <Fragment>
      {loading ? (
        <RippleLoader />
      ) : project ? (
        <Fragment>
          <div className="flex flex-col space-y-6 justify-center items-center  w-full">
            <div className="flex  p-5 w-full justify-center items-center gap-4">
              <BackButton />
            </div>
            <h1 className="text-red-500 text-3xl font-bold">Are you sure?</h1>
            <h2 className="text-2xl">
              {" "}
              Delete <span className="font-bold">{project.title}</span>{" "}
              permanently from the database. This data can not be recovered
              later.
            </h2>

            <div className="text-2xl flex justify-center items-center gap-2">
              {" "}
              <i> See project data below</i>{" "}
              <ArrowDownSquare className="animate-bounce" />
            </div>
          </div>

          <section className="p-10 min-h-screen w-full">
            <h1 className="mb-10 text-center py-4 border-y-8 border-double border-indigo-400 text-indigo-600 text-3xl font-bold">
              Project Data
            </h1>
            <div className="p-4 bg-white shadow-xl shadow-black/20">
              <table className="border-collapse w-full bg-white ">
                <thead>
                  <tr className="grid grid-cols-2">
                    <th className="border-[1px] border-[#dddddd] text-left p-2">
                      Field
                    </th>
                    <th className="border-[1px] border-[#dddddd] text-left p-2">
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(project).map((key, idx) => (
                    <tr
                      key={key + String(idx)}
                      style={
                        idx % 2 == 0
                          ? { backgroundColor: "#10101010" }
                          : { backgroundColor: "white" }
                      }
                      className="grid grid-cols-2"
                    >
                      <td className="border-[1px] border-[#dddddd] text-left p-2">
                        {key}
                      </td>
                      <td className="border-[1px] border-[#dddddd] text-left p-2 break-words">
                        {(() => {
                          const raw = object_to_string_array(project)[idx];
                          const valueStr = Array.isArray(raw)
                            ? raw.join(", ")
                            : String(raw ?? "");

                          return <p>{valueStr}</p>;
                        })()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="my-5 h-fit w-full bg-white ">
              <button
                onClick={() => setFinalAlert(true)}
                disabled={isDeleting}
                className="transition  text-xl font-semibold font-mono w-full border-2 border-red-200 py-2 px-3 bg-red-100 text-red-800 saturate-150 hover:saturate-50 active:saturate-0 hover:shadow-none"
              >
                {isDeleting ? "Deleting..." : "Delete This Project Permanently"}
              </button>
            </div>
          </section>

          {/* final alert */}
          {finalAlert && (
            <section className="w-full min-h-screen fixed top-0 left-0 flex justify-center items-center bg-black/10 backdrop-blur-md">
              <div className="w-52 h-32 bg-white text-center p-5">
                <h1 className="mb-5">Confirm ?</h1>
                <button
                  onClick={handleDeleteProject}
                  className="border bg-black/20 px-2 py-1 mx-3 hover:bg-black/10 transition"
                >
                  Delete !
                </button>
                <button
                  onClick={() => setFinalAlert(false)}
                  className="border bg-black/20 px-2 py-1 hover:bg-black/10 transition"
                >
                  Cancel
                </button>
              </div>
            </section>
          )}
        </Fragment>
      ) : (
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
      )}
    </Fragment>
  );
}
