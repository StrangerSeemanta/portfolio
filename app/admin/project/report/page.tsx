"use client";
import BackButton from "@/components/BackButton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

function ReportPage() {
  const searchParams = useSearchParams();

  return (
    <section className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-green-100 via-white to-gray-100 text-black">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6 text-indigo-600">
          Project Report
        </h1>
        {searchParams.get("updated") === "true" ? (
          <Alert
            variant={"destructive"}
            className="w-full mb-6 border-green-400 bg-green-50"
          >
            <AlertTitle className="text-green-700 text-lg font-semibold flex items-center gap-2">
              <svg width="24" height="24" fill="none" className="inline-block">
                <circle cx="12" cy="12" r="12" fill="#22c55e" />
                <path
                  d="M7 13l3 3 7-7"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span>Project Updated Successfully!</span>
            </AlertTitle>
            <AlertDescription className="text-green-800">
              {searchParams.has("projectId") && (
                <h1 className="text-base my-3 font-semibold text-indigo-700">
                  Project id: {searchParams.get("projectId")} 
                  
                </h1>
              )}
              Your project has been updated successfully. You can now view the
              changes.
            </AlertDescription>
          </Alert>
        ) : searchParams.get("updated") === "false" ? (
          <Alert
            variant={"destructive"}
            className="w-full mb-6 border-red-400 bg-red-50"
          >
            <AlertTitle className="text-red-700 text-lg font-semibold flex items-center gap-2">
              <svg width="24" height="24" fill="none" className="inline-block">
                <circle cx="12" cy="12" r="12" fill="#ef4444" />
                <path
                  d="M12 8v4m0 4h.01"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Failed to update project data
            </AlertTitle>
            <AlertDescription className="text-red-800">
              <p>
                {" "}
                There was an error updating your project. Please try again.
              </p>
              {searchParams.has("error_text") && (
                <p>
                  <span>Error:</span>
                  <span>{searchParams.get("error_text")}</span>
                </p>
              )}
            </AlertDescription>
          </Alert>
        ) : (
          <h1>Unknown params</h1>
        )}

        <div className="border-2 border-indigo-300 rounded-full">
          <BackButton />
        </div>
      </div>
    </section>
  );
}

const ReportPageWrapper = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <ReportPage />
  </Suspense>
);

export default ReportPageWrapper;
