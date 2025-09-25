"use client";
import {
  addNewSocialData,
  deleteSocialData,
  updateSocialData,
} from "@/app/actions/HandleSocialData";
import { Button } from "@/components/ui/button";
import { SocialData } from "@/lib/db/socialdata";
import { Check, Loader2, Trash } from "lucide-react";
import { Pencil, X } from "lucide-react";
import React, { FormEvent, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

function SocialDataShow({
  socialData,
  onDataChangeComplete,
}: {
  socialData: SocialData;
  onDataChangeComplete?: () => Promise<void>;
}) {
  const [isEdit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      setLoading(true);
      event.preventDefault();
      const form = event.currentTarget;
      const formData = new FormData(form);
      const newValue = formData.get(socialData.label) as string;
      const newData = {
        id: socialData._id.toString(),
        href: newValue,
      };

      const response = await updateSocialData(
        newData.id,
        socialData.label,
        newValue
      );

      if (!response) {
        throw new Error("Failed to update social media data");
      }

      if (onDataChangeComplete) {
        await onDataChangeComplete();
      }
      toast.success("Social media link updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update data", { description: String(error) });
    } finally {
      setLoading(false);
      setEdit(false);
    }
  };
  const handleDeleteSocialData = async () => {
    try {
      setDeleting(true);
      const response = await deleteSocialData(socialData._id.toString("hex"));
      if (!response) throw new Error("Failed to delete data");
      if (onDataChangeComplete) {
        await onDataChangeComplete();
      }
      toast.success("Social media link deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete data", { description: String(error) });
    } finally {
      setDeleting(false);
    }
  };
  return (
    <div className="mb-3">
      <div className=" flex items-center flex-wrap gap-2 text-lg capitalize font-bold whitespace-pre-wrap break-words">
        {isEdit ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-wrap items-center gap-2 "
          >
            <label htmlFor={socialData.label}>{socialData.label}</label>
            <input
              id={socialData.label}
              name={socialData.label}
              placeholder={"Enter new " + socialData.label}
              type="text"
              className=" py-1 px-2 text-sm font-medium"
            />
            <button
              type="submit"
              className="bg-green-200 p-2 rounded-full text-green-800 hover:brightness-95 "
            >
              {loading ? (
                <Loader2 size={13} className="animate-spin" />
              ) : (
                <Check size={13} />
              )}
            </button>
          </form>
        ) : (
          <span>{socialData.label}</span>
        )}
        <button
          onClick={() => setEdit(!isEdit)}
          className="bg-purple-200 p-2 rounded-full text-purple-700 hover:brightness-95 "
        >
          {isEdit ? <X size={13} /> : <Pencil size={13} />}
        </button>
        {!isEdit && (
          <button
            onClick={handleDeleteSocialData}
            className="bg-red-100 p-2 rounded-full text-red-700 hover:brightness-95 "
          >
            {deleting ? (
              <Loader2 size={13} className="animate-spin" />
            ) : (
              <Trash size={13} />
            )}
          </button>
        )}
      </div>
      <h2 className="whitespace-pre-wrap break-words">
        {" "}
        {socialData.href ? socialData.href : "No link added"}
      </h2>
    </div>
  );
}
function SocialMetadata() {
  const [socialData, setSocialData] = useState<SocialData[] | null>(null);
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);
  const [addData, setAddData] = useState(false);
  const [adding, setAdding] = useState(false);
  const fetchSocialMetadata = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/socials/get", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = (await response.json()) as SocialData[];
      setSocialData(data);
    } catch (err) {
      const e = String(err);
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchSocialMetadata();
  }, [fetchSocialMetadata]);

  const handleNewSocialData = async (event: FormEvent<HTMLFormElement>) => {
    try {
      setAdding(true);
      event.preventDefault();
      const form = event.currentTarget;
      const formData = new FormData(form);
      const newLabel = formData.get("label") as string;
      const newHref = formData.get("href") as string;

      const response = await addNewSocialData(newLabel, newHref);

      if (!response) {
        throw new Error("Failed to add social media data");
      }

      await fetchSocialMetadata();
      toast.success("Social media link added successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add data", { description: String(error) });
    } finally {
      setAdding(false);
      setAddData(false);
    }
  };

  if (error) return <div>Error: {error}</div>;
  return (
    <div className=" p-2 md:p-4 md:px-6 border w-fit ">
      <h1 className="text-3xl  text-red-500 ">Social Media Data</h1>
      {!loading && (
        <Button
          onClick={() => setAddData(!addData)}
          size={"sm"}
          className="text-white my-3"
        >
          {addData ? "Cancel" : "+ Add Social Data"}
        </Button>
      )}
      {loading ? (
        <div className="flex justify-start items-center gap-2 whitespace-pre-wrap break-before-all">
          <span>Loading</span>
          <Loader2 className="animate-spin" size={13} />
        </div>
      ) : addData ? (
        <div>
          <form onSubmit={handleNewSocialData} className="space-y-4">
            <div className="">
              <label htmlFor="label">Label: </label>
              <input
                id="label"
                name={"label"}
                placeholder={"Enter social media label "}
                type="text"
                className=" py-1 px-2 text-sm font-medium"
              />
            </div>
            <div>
              <label htmlFor="href">href: </label>
              <input
                id="href"
                name={"href"}
                placeholder={"Enter social media href "}
                type="text"
                className=" py-1 px-2 text-sm font-medium"
              />
            </div>
            <button type="submit" className="py-1 px-2 bg-green-600 text-white">
              {adding ? "Adding..." : "Save"}
            </button>
          </form>
        </div>
      ) : socialData ? (
        <>
          <h2 className="  font-mono whitespace-pre-wrap break-words">
            Total connected Social Media : {socialData.length}
          </h2>
          <div className="md:py-3 whitespace-pre-wrap break-words">
            {socialData.map((socialData, index) => (
              <SocialDataShow
                key={
                  socialData._id.toString("hex") +
                  index.toString() +
                  Date.now().toString()
                }
                socialData={socialData}
                onDataChangeComplete={fetchSocialMetadata}
              />
            ))}
          </div>
        </>
      ) : (
        <div>No Social Media Metadata Found !!</div>
      )}
    </div>
  );
}

export default SocialMetadata;
