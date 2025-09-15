// app/admin/page.tsx
import Link from "next/link";
import Projects from "./Projects";

export default async function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="mb-6 space-x-2">
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
        </Link>
      </div>
      <Projects />
    </div>
  );
}
