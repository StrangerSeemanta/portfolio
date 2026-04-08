import { fetchInbox } from "@/lib/db/fetchMessages";
import Link from "next/link";
import React from "react";
import DeleteMsgBtn from "./DeleteMsgBtn";
import RefreshBtn from "./RefreshBtn";
import DeleteMsgByEmailBtn from "./DeleteMsgByEmailButton";

async function InboxPage() {
  const msgs = await fetchInbox();
  return (
    <section className="bg-gradient-to-br from-slate-50 to-slate-100 w-full min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Messages</h1>
          <p className="text-slate-600">Manage and review your inbox</p>
        </div>

        <div className="bg-white shadow-lg rounded-lg border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex justify-between items-center flex-wrap gap-4">
            <div className="flex gap-3">
              <RefreshBtn />
              <DeleteMsgBtn />
            </div>
          </div>

          <div className="divide-y divide-slate-200">
            {msgs && msgs.length > 0 ? (
              Object.entries(
                msgs.reduce(
                  (acc, msg) => {
                    if (!acc[msg.email]) {
                      acc[msg.email] = { ...msg, count: 0 };
                    }
                    acc[msg.email].count++;
                    return acc;
                  },
                  {} as Record<string, any>,
                ),
              )
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([email, msg]) => (
                  <div key={email} className="relative group">
                    <Link
                      href={
                        "/admin/messages/" + encodeURIComponent(btoa(email))
                      }
                      className="block p-4 hover:bg-slate-50 transition-colors"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                        <div>
                          <p className="font-semibold text-slate-900">
                            {msg.name}
                          </p>
                          <p className="text-sm text-slate-500">{email}</p>
                        </div>
                        <p className="text-slate-600 hidden md:block">
                          {email}
                        </p>
                        <div className="flex justify-between md:justify-end items-center gap-3">
                          <span className="inline-block bg-teal-100 text-teal-700 font-semibold text-xs px-3 py-1 rounded-full">
                            {msg.count} message{msg.count > 1 ? "s" : ""}
                          </span>
                          <span className="text-sm text-slate-500">
                            {new Date(msg.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </Link>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <DeleteMsgByEmailBtn className="bg-red-100 text-red-500"/>
                    </div>
                  </div>
                ))
            ) : (
              <div className="p-12 text-center">
                <p className="text-slate-500 text-lg">No messages found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default InboxPage;
