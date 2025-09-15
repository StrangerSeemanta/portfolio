"use client";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function StorageBreadcrumbs() {
  const pathname = usePathname() ?? "/";
  const segments = pathname.split("/").filter(Boolean);

  // Find the index of "storage" so breadcrumbs start from /admin/storage
  const storageIndex = segments.indexOf("storage");
  const baseIndex = storageIndex >= 0 ? storageIndex : 0;
  const crumbs = segments.slice(baseIndex); // ["storage", "varcelblob", "folder", "subfolder"]

  if (crumbs.length === 0) return null;

  const first = crumbs[0];
  const second = crumbs.length > 2 ? crumbs[1] : null;
  const last = crumbs[crumbs.length - 1];
  const middle = crumbs.slice(2, -1); // everything between second and last

  return (
    <Breadcrumb>
      <BreadcrumbList>
        
        
        {/* First segment */}

        <BreadcrumbItem>
          {crumbs.length === 1 ? (
            <BreadcrumbPage className="text-black">
              <h1 className="text-xl font-semibold capitalize hover:text-black">
                {decodeURIComponent(first.replace(/-/g, " "))}
              </h1>
            </BreadcrumbPage>
          ) : (
            <BreadcrumbLink asChild>
              <Link
                href={"/" + segments.slice(0, baseIndex + 1).join("/")}
                className="text-xl font-semibold capitalize hover:text-black"
              >
                {decodeURIComponent(first.replace(/-/g, " "))}
              </Link>
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>

        {/* Separator after first */}
        {crumbs.length > 1 && (
          <BreadcrumbSeparator>
            <ChevronRight size={28} />
          </BreadcrumbSeparator>
        )}

        {/* Second segment */}
        {crumbs.length > 2 && second && (
          <BreadcrumbItem className="">
            <BreadcrumbLink asChild>
              <Link
                href={"/" + segments.slice(0, baseIndex + 2).join("/")}
                className="text-xl font-semibold capitalize hover:text-black "
              >
                {atob(decodeURIComponent(second.replace(/-/g, " "))).replaceAll(
                  "/",
                  ""
                )}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        )}
        {/* Separator after Second */}
        {crumbs.length > 2 && (
          <BreadcrumbSeparator>
            <ChevronRight size={28} />
          </BreadcrumbSeparator>
        )}
        {/* If more than 3 segments, collapse middle segments */}
        {middle.length > 0 && (
          <>
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1">
                  <BreadcrumbEllipsis className="size-4" />
                  <span className="sr-only">Toggle menu</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {middle.map((seg, i) => {
                    const href =
                      "/" +
                      segments
                        .slice(0, baseIndex + i + 3) // +3 because we skip first and second
                        .join("/");

                    return (
                      <DropdownMenuItem key={href}>
                        <Link
                          href={href}
                          className="text-lg capitalize hover:text-black"
                        >
                          {atob(
                            decodeURIComponent(seg.replace(/-/g, " "))
                          ).replaceAll("/", "")}
                        </Link>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>

            {/* Separator after ... */}
            <BreadcrumbSeparator>
              <ChevronRight size={28} />
            </BreadcrumbSeparator>
          </>
        )}

        {/* Last segment */}
        {crumbs.length > 1 && (
          <BreadcrumbItem>
            <BreadcrumbPage className="text-black">
              <h1 className="text-xl font-semibold capitalize ">
                {atob(decodeURIComponent(last.replace(/-/g, " "))).replaceAll(
                  "/",
                  ""
                )}
              </h1>
            </BreadcrumbPage>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default StorageBreadcrumbs;
