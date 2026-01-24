import React from "react";
import { UserButton } from "@clerk/nextjs";


export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 

  return (
    <section className="w-full min-h-screen relative text-black bg-gradient-to-br to-indigo-100 from-gray-50  ">
      <div className="absolute right-0 top-0 p-8 flex justify-center items-center">
        <UserButton />
      </div>
      {children}
    </section>
  );
}
