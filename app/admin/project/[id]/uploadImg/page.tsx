"use client";
import { uploadImage } from "@/app/actions/uploadImage";
import { ImageUpIcon, X } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

function UploadImagePage() {
  const params = useParams();
  const id = params.id;
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null); // Reset error state on file change
    const file = e.target.files?.[0];
    setImageFile(file || null); // Set the image file state
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.warning("Image must be less than 2MB.");
        setError("Image must be less than 2MB.");
        setPreview(null);
        e.target.value = ""; // Reset input value
        return;
      }
      if (!file.type.includes("image/")) {
        toast.warning("Select An Image File.");
        setError("Select An Image File.");
        e.target.value = ""; // Reset input value
        setPreview(null);
        return;
      }
      // Cleanup previous object URL if exists
      if (preview) {
        URL.revokeObjectURL(preview);
      }
      // Create a new object URL for the selected file
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    } else {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
      setPreview(null);
      toast.warning("No file selected.");
      e.target.value = ""; // Reset input value
      setImageFile(null); // Reset image file state
    }
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (error) return; // Prevent upload if there's an error
      setIsLoading(true);
      if (!id) {
        throw new Error("Project ID is required");
      }
      if (
        !fileInputRef.current ||
        !fileInputRef.current.files ||
        !fileInputRef.current.files[0]
      ) {
        throw new Error("No file selected");
      }

      const file = fileInputRef.current.files[0];
      const vercelBlob = await uploadImage(file, String(id));
      if (vercelBlob) {
        toast.success("Image uploaded successfully!");
        setImageFile(null); // Reset image file state
        setPreview(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; // Reset input value
        }
        // Optionally, you can redirect or update the UI after successful upload
        router.push(`/admin/project/${id}`); // Redirect to project page
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
      toast.error("Failed to upload image: ");
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Reset input value after upload
      }
      setImageFile(null); // Reset image file state
      if (preview) {
        URL.revokeObjectURL(preview); // Cleanup object URL
      }
      setPreview(null); // Reset preview state
      setError(null); // Reset error state
    }
  };
  // Inside your component
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <section className="text-black bg-gradient-to-b from-yellow-100 to-gray-100 min-h-screen p-8">
      <div className="p-10 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Upload Image for Project
        </h1>
        <form
          onSubmit={handleUpload}
          method="POST"
          encType="multipart/form-data"
          className="space-y-6"
        >
          <input type="hidden" name="id" value={id} />
          {/* Uploader */}

          <div className="border-2 rounded-lg border-indigo-300 p-2 flex flex-col justify-center items-start space-y-5  my-16">
            <label
              htmlFor="image-upload"
              className="flex items-center px-4 py-2 bg-indigo-200 rounded cursor-pointer hover:bg-indigo-300 transition"
            >
              <ImageUpIcon className="mr-2 text-gray-600" />
              <span className="text-gray-700 font-medium">Choose Image</span>
              <input
                id="image-upload"
                ref={fileInputRef}
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                required
                className="hidden"
              />
            </label>
            {imageFile && (
              <>
                <h2 className="flex items-center space-x-2">
                  <span className="text-indigo-600 font-medium">
                    Selected Image:
                  </span>{" "}
                  <span>{imageFile.name}</span>
                </h2>
                <h2 className="flex items-center space-x-2">
                  <span className="text-indigo-600 font-medium">
                    File Type:
                  </span>

                  <span>{imageFile.type}</span>
                  <span>
                    {imageFile.type.includes("image/")
                      ? "✔"
                      : "❌ ( Please select an image file )"}
                  </span>
                </h2>
                <h2 className="flex items-center space-x-2">
                  <span className="text-indigo-600 font-medium">
                    File Size:
                  </span>{" "}
                  <span>
                    {imageFile.size > 1024 * 1024
                      ? `${imageFile.size / 1024 / 1024} MB`
                      : `${imageFile.size / 1024} KB`}
                  </span>
                  <span>
                    {imageFile.size > 2 * 1024 * 1024
                      ? "❌ ( File size must be less than 2MB )"
                      : "✔ ( File size is acceptable )"}
                  </span>
                </h2>
                {error && (
                  <p className="font-bold text-red-500 text-lg mt-2">
                    {"❗ " + error}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => {
                    if (preview) URL.revokeObjectURL(preview);
                    setPreview(null);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = "";
                      setImageFile(null);
                      setError(null);
                      return;
                    }
                  }}
                  className="flex justify-center text-sm items-center p-1 rounded-none text-red-500 bg-red-100 hover:bg-red-200 transition"
                  title="Remove selected image"
                >
                  Clear Current Image
                </button>
              </>
            )}
          </div>
          {/* preview */}
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Image Preview {`(These sizes will be applied accross the website)`}
          </h1>

          <div className="flex flex-col items-center space-y-4">
            <h1 className="text-xl font-bold text-gray-800 ">Large Size</h1>{" "}
            <div className=" w-full h-[350px]  rounded-lg flex items-center justify-center  bg-gray-100 transition ">
              {preview ? (
                <div className="group relative w-full h-[350px] overflow-hidden rounded-lg shadow-lg">
                  <Image
                    alt={"large size preview"}
                    src={preview}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover rounded-lg  cursor-pointer border-2 border-white shadow-lg "
                  />
                </div>
              ) : (
                <span className="text-gray-500 text-center">
                  Select an image to see the preview
                </span>
              )}
            </div>
            <h1 className="text-xl font-bold text-gray-800 ">Card Size</h1>{" "}
            <div className=" w-full h-[200px]  rounded-lg flex items-center justify-center  bg-gray-100 transition ">
              {preview ? (
                <div className="group relative w-full h-[200px] overflow-hidden rounded-lg shadow-lg">
                  <Image
                    alt={"card size preview"}
                    src={preview}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover rounded-lg  cursor-pointer border-2 border-white shadow-lg "
                  />
                </div>
              ) : (
                <span className="text-gray-500 text-center">
                  Select an image to see the preview
                </span>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          >
           {
            isLoading ? (
              <span className="flex items-center justify-center space-x-2">
                <span className="loader"></span>
                <span>Uploading...</span>
              </span>
            ) : (
              <span>Upload Image</span>
            )
           }

          </button>
        </form>
      </div>
    </section>
  );
}

export default UploadImagePage;
