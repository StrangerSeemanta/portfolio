import React from "react";
import StorageBreadcrumbs from "./Breads";
import { ContextMenuProvider } from "@/components/ContextMenu";

function StorageLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="h-screen bg-yellow-100 w-full p-2 md:p-6 md:px-20  flex justify-center items-center">
      <section className="relative w-full h-full p-5 bg-white overflow-auto shadow-xl shadow-black/10 rounded-2xl">
        <div>
          <ContextMenuProvider>
            <StorageBreadcrumbs />
          </ContextMenuProvider>
        </div>

        <section className="mt-5 w-fit">{ children }</section>
      </section>
    </section>
  );
}

export default StorageLayout;
