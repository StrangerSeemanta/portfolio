"use client";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
export function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const currentPath = usePathname();
  const isActive = currentPath === href;

  return (
    <Link
      href={href}
      className={clsx(
        " hover:text-black hover:bg-gray-200 rounded-md px-2 py-1",
        isActive
          ? "bg-gray-200 font-semibold text-black"
          : "bg-white text-gray-700 ",
      )}
    >
      {children}
    </Link>
  );
}
export function NavLinks() {
  const links:{href:string,label:string}[] = useMemo(
    () => [
      {
        href: "/admin/panel/profile",
        label: "Profile Overview",
      },
      {
        href: "/admin/panel/manage_users",
        label: "Manage Users",
      },
      {
        href: "/admin/panel/account_settings",
        label: "Account Settings",
      },
    ],
    [],
  );
  return (
    <>
      {/* Mobile Navigation */}
      <div className="lg:hidden flex flex-wrap gap-2 mb-4">
        {links.map((link) => (
          <NavLink key={link.href} href={link.href}>
            {link.label}
          </NavLink>
        ))}
      </div>
      {/* lg */}
      <div className="hidden sidebar lg:w-1/6 h-full overscroll-auto lg:flex flex-col gap-4 pr-4 ">
        {links.map((link) => (
          <NavLink key={link.href} href={link.href}>
            {link.label}
          </NavLink>
        ))}
      </div>
    </>
  );
}
