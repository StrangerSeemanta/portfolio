import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isAdminRoute(req)) {
    const session = await auth();
    if (!session.userId) {
      return session.redirectToSignIn();
    }
    if (
      session.sessionClaims?.metadata.role !== "admin" &&
      session.sessionClaims?.metadata.role !== "super admin"
    ) {
      const unauthorizedUrl = new URL("/unauthorized", req.url);
      return NextResponse.redirect(unauthorizedUrl, 303);
    }
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
