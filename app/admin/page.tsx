// app/admin/page.tsx
import Link from "next/link";
import Projects from "./Projects";
import { MessageCircle } from "lucide-react";

export default async function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="mb-6 gap-2 flex flex-wrap ">
        <Link
          href="/admin/project/add"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add New Project
        </Link>
        <Link
          href="/admin/storage"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Manage Storage
        </Link>{" "}
        <Link
          href="/admin/metadata"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Update Metadata
        </Link>
        <Link
          href="/admin/panel/profile"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Admin Panel
        </Link>
         <Link
          href="/admin/messages"
          className="bg-gradient-to-bl flex justify-center items-center gap-2 from-pink-600 font-bold to-indigo-600 hover:from-indigo-600 hover:to-pink-600 text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          <MessageCircle className="text-white" />
          Inbox
        </Link>
      </div>
      <Projects />
    </div>
  );
}
