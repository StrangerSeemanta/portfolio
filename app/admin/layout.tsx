import React from "react";
import { UserButton } from "@clerk/nextjs";
import { checkUserRole } from "@/utils/roles";
import { Lock } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAdmin = await checkUserRole("admin");
  if (!isAdmin) {
    return (
     <section className="cursor-auto w-full min-h-screen flex flex-col gap-4 justify-center items-center text-black bg-gradient-to-br to-indigo-100 from-gray-50  ">
       <Lock className="w-16 h-16 text-red-500"/>
       <h1 className="font-semibold">Access Denied. You do not have permission to view this page.</h1>
       </section>
    );
  }

  return (
    <section className="w-full min-h-screen relative text-black bg-gradient-to-br to-indigo-100 from-gray-50  ">
      <div className="absolute right-0 top-0 p-8 flex justify-center items-center">
        <UserButton />
      </div>
      {children}
    </section>
  );
}
