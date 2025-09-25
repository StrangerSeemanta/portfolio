"use client";
import { updateSocialData } from "@/app/actions/updateSocialData";
import { SocialData } from "@/lib/db/socialdata";
import { Check, Loader2 } from "lucide-react";
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

      setEdit(false);
      if (onDataChangeComplete) {
        await onDataChangeComplete();
      }
      toast.success("Social media link updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update data", { description: String(error) });
    } finally {
      setLoading(false);
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
          className="bg-red-100 p-2 rounded-full text-red-700 hover:brightness-95 "
        >
          {isEdit ? <X size={13} /> : <Pencil size={13} />}
        </button>
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

  if (error) return <div>Error: {error}</div>;
  return (
    <div className=" p-2 md:p-4 md:px-6 border w-fit ">
      <h1 className="text-3xl  text-red-500 mb-3">Social Media Data</h1>

      {loading ? (
        <div className="flex justify-start items-center gap-2 whitespace-pre-wrap break-before-all">
          <span>Loading</span>
          <Loader2 className="animate-spin" size={13} />
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
