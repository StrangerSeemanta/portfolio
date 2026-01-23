import React from "react";
import { UserDetails } from "../../../components/UserDetails";
import Link from "next/link";
import { NavLink, NavLinks } from "./NavLinks";

export default function AdminProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-screen bg-white p-8">
      <h1 className="text-2xl font-bold mb-3 border-b-2 border-b-gray-500/50">Admin Panel</h1>
     
      <div className="flex flex-col lg:flex-row flex-wrap mt-2 w-full h-full p-2 ">
        <NavLinks/>
        <div className="userDetailsHolder w-full lg:w-5/6 h-fit flex justify-center items-center ">
          {children}
        </div>
      </div>
      
    </section>
  );
}