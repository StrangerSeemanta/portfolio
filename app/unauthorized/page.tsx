import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function UnauthorizedPage() {
  const currentAuthUser = await auth();
  const isAdmin = currentAuthUser.sessionClaims?.metadata.role === "admin";
  return (
    <section className="cursor-auto w-full min-h-screen flex flex-col gap-4 justify-center items-center text-black bg-gradient-to-br to-indigo-100 from-gray-50  ">
      <UserButton
        showName
        appearance={{
          elements: {
            userButtonAvatarBox: "w-12 h-12",
            userButtonBox: "flex flex-row-reverse ",
            userButtonOuterIdentifier: "text-lg",
          },
        }}
      />
      {isAdmin ? (
        <>
          <h1 className="text-2xl font-semibold text-green-600">
            You are authorized as an admin.
          </h1>
          <Link href="/admin" className="mt-4">
            <Button variant="themed_glowing">Go to Admin Dashboard</Button>
          </Link>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-semibold text-red-600">
            Access Denied. You do not have permission to view this page.
          </h1>
          <Link href="/" className="mt-4">
            <Button variant="themed_glowing">Go to Home</Button>
          </Link>
        </>
      )}
    </section>
  );
}
