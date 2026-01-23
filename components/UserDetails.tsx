"use client";

import { Button } from "@/components/ui/button";
import { SignOutButton, useSession, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { Badge } from "./ui/badge";

function Row({ desc, value }: { desc: string; value: string }) {
  return (
    <div className="relative grid h-[2.125rem] grid-cols-2 items-center">
      <span className="block flex-shrink-0 text-sm font-semibold">{desc}</span>
      <span className="relative block text-sm text-[#7D7D7E]">
        <span className="block w-full truncate">{value}</span>
      </span>
    </div>
  );
}

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatDateWithNumbers(date: Date): string {
  return date.toLocaleString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}

export function UserDetails() {
  const { user } = useUser();
  const { session } = useSession();

  if (!user || !session) return null;

  return (
    <div className=" max-w-md rounded-xl p-8 flex flex-col bg-white ">
      <div className="mb-6 flex flex-col items-center gap-2">
        <div className="relative flex w-full justify-center">
          <Image
            src={user.imageUrl}
            alt="profile-pic"
            className="w-20 h-20 rounded-full"
            width={80}
            height={80}
          />
        </div>
        {user.firstName && user.lastName ? (
          <h1 className="relative w-full text-center text-[1.0625rem] font-semibold">
            {user.firstName} {user.lastName}{" "}
            {user.publicMetadata.role ? (
              <>
                <Badge variant="secondary">{String(user.publicMetadata.role).toUpperCase()}</Badge>
              </>
            ) : (
              ""
            )}
          </h1>
        ) : (
          <div className="h-4" />
        )}
        <SignOutButton>
          <Button variant={"destructive"}>Log Out</Button>
        </SignOutButton>
      </div>

      {/* User details */}
      <h2 className="mb-4 text-[0.9375rem] font-semibold">User details</h2>
      <div className=" rounded-lg px-4 py-1">
        <Row desc="Email" value={user.emailAddresses[0].emailAddress}></Row>
        <Row desc="Last signed in" value={formatDate(user.lastSignInAt!)}></Row>
        <Row desc="Joined on" value={formatDate(user.createdAt!)}></Row>
        <Row desc="User ID" value={user.id}></Row>
      </div>

      {/* Session details */}

      <h2 className="mt-6 mb-4 text-[0.9375rem] font-semibold">
        Session details
      </h2>
      <div className=" rounded-lg px-4 py-1">
        <Row desc="Session ID" value={session.id}></Row>
        <Row desc="Status" value={session.status}></Row>
        <Row
          desc="Last active"
          value={formatDateWithNumbers(session.lastActiveAt)}
        ></Row>
        <Row
          desc="Session expiration"
          value={formatDateWithNumbers(session.expireAt)}
        ></Row>
      </div>
    </div>
  );
}
