import { checkUserRole } from "@/utils/roles";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import SearchUsers from "./SearchUsers";
import { removeRole, setRole } from "@/app/actions/manageUsers";
import Image from "next/image";

export default async function AdminManageUsersPage(params: {
  searchParams: Promise<{ search?: string }>;
}) {
  const currentUser = await auth();
  if (!checkUserRole("admin")) {
    redirect("/unauthorized");
  }

  const query = (await params.searchParams).search;

  const client = await clerkClient();

  const users = query
    ? (await client.users.getUserList({ query: query })).data
    : (await client.users.getUserList()).data;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <SearchUsers />

      {users.length > 0 ? (
        <div className="space-y-3 mt-6">
          {users.map((user) => (
            <div
              key={user.id}
              className="p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors"
            >
              <div className="mb-3">
                <div className="flex items-center gap-2">
                  <Image
                    src={user.imageUrl}
                    alt="User Image"
                    width={32}
                    height={32}
                    className="rounded-full w-8 h-8 "
                  />
                  <p className="text-sm font-medium text-slate-900">
                    {user.firstName} {user.lastName}
                  </p>
                </div>
                <p className="text-xs text-slate-500 mt-1">{user.id}</p>
                <p className="text-xs text-slate-500 mt-1">
                  {user.emailAddresses[0]?.emailAddress}
                </p>
              </div>

              <div className="mb-3 py-2 border-t border-b border-slate-200">
                <p className="text-xs text-slate-600">
                  Role:{" "}
                  <span className="font-medium bg-black text-white px-2 py-0.25 rounded-lg text-xs capitalize">
                    {user.publicMetadata.role
                      ? String(user.publicMetadata.role)
                      : "Unassigned"}
                  </span>
                </p>
              </div>

              {/* Role buttons */}
              {currentUser.userId !== user.id &&
                user.publicMetadata.role !== "super admin" && (
                  <div className="flex gap-2">
                    {currentUser.sessionClaims?.metadata.role === "super admin" && (
                      <form action={setRole} className="flex-1">
                        <input type="hidden" value={user.id} name="userId" />
                        <input type="hidden" value="super admin" name="role" />
                        <button
                          type="submit"
                          className="w-full px-3 py-1.5 text-xs font-medium bg-slate-800 text-white rounded hover:bg-slate-900 transition-colors"
                        >
                          Make Super Admin
                        </button>
                      </form>
                    )}

                    <form action={setRole} className="flex-1">
                      <input type="hidden" value={user.id} name="userId" />
                      <input type="hidden" value="admin" name="role" />
                      <button
                        type="submit"
                        className="w-full px-3 py-1.5 text-xs font-medium bg-slate-800 text-white rounded hover:bg-slate-900 transition-colors"
                      >
                        Make Admin
                      </button>
                    </form>

                    <form action={setRole} className="flex-1">
                      <input type="hidden" value={user.id} name="userId" />
                      <input type="hidden" value="moderator" name="role" />
                      <button
                        type="submit"
                        className="w-full px-3 py-1.5 text-xs font-medium bg-slate-600 text-white rounded hover:bg-slate-700 transition-colors"
                      >
                        Make Moderator
                      </button>
                    </form>
                    <form action={setRole} className="flex-1">
                      <input type="hidden" value={user.id} name="userId" />
                      <input type="hidden" value="user" name="role" />
                      <button
                        type="submit"
                        className="w-full px-3 py-1.5 text-xs font-medium bg-slate-600 text-white rounded hover:bg-slate-700 transition-colors"
                      >
                        Make User
                      </button>
                    </form>
                    <form action={removeRole} className="flex-1">
                      <input type="hidden" value={user.id} name="userId" />
                      <button
                        type="submit"
                        className="w-full px-3 py-1.5 text-xs font-medium bg-slate-200 text-slate-700 rounded hover:bg-slate-300 transition-colors"
                      >
                        Remove Role
                      </button>
                    </form>
                  </div>
                )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-slate-500 text-sm mt-8">
          No users found.
        </p>
      )}
    </div>
  );
}
