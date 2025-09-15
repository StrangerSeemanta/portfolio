import React from "react";

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="w-full relative text-black bg-gradient-to-br to-indigo-100 from-gray-50 min-h-screen">
        {children}
    </section>
  );
}

export default AdminLayout;
