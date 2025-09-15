import { list } from "@vercel/blob";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import folder_icon from "@/assets/folder.png";
import file_icon from "@/assets/file.png";

import { Download, Trash } from "lucide-react";

async function DynamicFolderPage(props: {
  params: Promise<{ foldername: string[] }>;
}) {
  const { foldername } = await props.params;
  // console.log(foldername);
  const current_foldername_decoded = foldername
    .map((segs) => atob(decodeURIComponent(segs)))
    .slice(1)
    .join("");
  // console.log(current_foldername_decoded);
  const { folders, blobs } = await list({
    mode: "folded",
    prefix: foldername.length > 1 ? current_foldername_decoded : undefined,
  });
  //console.log(`folders:`, folders, `\nblobs:`, blobs);

  const total_blobs = await list();
  const total_vercelblob_used = total_blobs.blobs
    .map((blob) => blob.size)
    .reduce((a, b) => a + b);

  return (
    <div className="mt-6">
      <section>
        <h1 className="text-blue-600 text-2xl my-5">
          Total Used: {total_vercelblob_used / 1000} KB
        </h1>
      </section>
      {folders && folders.length > 0 && (
        <div className="folder_wrapper">
          <h1 className="text-xl font-semibold mb-4">Folders</h1>
          <ul className="flex flex-col space-y-8">
            {folders.map((folder, i) => (
              <li
                key={folder.replaceAll("/", "_") + String(i)}
                className="inline-flex  flex-wrap justify-between items-center gap-6"
              >
                <div className="inline-flex flex-wrap gap-2 items-center group cursor-pointer w-fit">
                  <Image
                    src={folder_icon}
                    width={22}
                    height={22}
                    alt="folder_icon"
                  />
                  <Link
                    href={`/admin/storage/${
                      foldername.length > 1
                        ? foldername.join("/")
                        : foldername.join("")
                    }/${encodeURIComponent(
                      btoa(folder.replace(current_foldername_decoded, ""))
                    )}`}
                    className="text-lg group-hover:text-blue-600 "
                  >
                    {folder
                      .replaceAll(current_foldername_decoded, "")
                      .replaceAll("/", "")}
                  </Link>
                </div>

                <Link
                  target="_blank"
                  href={""}
                  className="bg-black/5  rounded-full border border-black/10 p-1 hover:text-red-600 inline-flex items-center gap-1"
                >
                  <Trash size={16} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Blobs */}

      {folders.length === 0 &&
        blobs &&
        blobs.length > 0 &&
        blobs[0].size > 0 &&
        blobs[0].pathname
          .replaceAll(current_foldername_decoded, "")
          .replaceAll("/", "").length > 1 && (
          <div className="file_wrapper">
            <h1 className="text-xl font-semibold mb-4">Files</h1>
            <ul className="flex flex-col space-y-4">
              {blobs.map((blob, i) => (
                <li
                  key={blob.url + String(i)}
                  className="inline-flex border-b-[1px] pb-5 border-black/20 flex-wrap justify-between items-center gap-6"
                >
                  <div>
                    <div className="inline-flex flex-wrap gap-2 items-center group cursor-pointer w-fit">
                      {" "}
                      <Image
                        src={file_icon}
                        width={20}
                        height={22}
                        alt="file_icon"
                      />
                      <Link
                        target="_blank"
                        href={blob.url}
                        className="text-lg group-hover:text-blue-600 "
                      >
                        {blob.pathname
                          .replaceAll(current_foldername_decoded, "")
                          .replaceAll("/", "")}
                      </Link>
                    </div>
                    <h3>Size: {blob.size / 1000} KB</h3>
                  </div>

                  <div className="space-x-4">
                    <Link
                      target="_blank"
                      href={blob.downloadUrl}
                      className="bg-black/5  border border-black/10 p-1 rounded-full hover:text-blue-600 inline-flex items-center gap-1"
                    >
                      <Download size={16} />
                    </Link>
                    <Link
                      target="_blank"
                      href={blob.downloadUrl}
                      className="bg-black/5  border border-black/10 p-1 rounded-full hover:text-red-600 inline-flex items-center gap-1"
                    >
                      <Trash size={16} />
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

      {/* If all empty */}
      {folders.length === 0 && blobs[0].size === 0 && (
        <h1 className="text-xl font-semibold mb-4 text-gray-600/60">
          Directory is empty. No Folders, No Files.
        </h1>
      )}
    </div>
  );
}

export default DynamicFolderPage;
