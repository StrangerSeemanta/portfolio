import { Database } from "lucide-react";
import Link from "next/link";

async function StoragePage() {
 
  return (
    <div>
     
      <section>
        <h1 className="mb-2 text-lg ">Connected Storages</h1>
        <div className="w-full grid-cols-5 space-x-2">
          <Link
            href={"/admin/storage/" + encodeURIComponent(btoa("vercelblob/"))}
            className="cursor-pointer inline-flex items-center gap-1.5 w-fit p-3 font-semibold text-gray-700 bg-black/5 border border-black/30 hover:bg-black/10 active:bg-black/20 transition"
          >
            <Database />
            <h1>Vercel Blob Storage</h1>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default StoragePage;
