import { fetchMessagesByEmail } from "@/lib/db/fetchMessages";
import React from "react";

export default async function UserMessagesPage(props: {
  params: Promise<{ useremailenc: string }>;
}) {
  const { useremailenc } = await props.params;
  const useremail = atob(decodeURIComponent(useremailenc));
  const messages = await fetchMessagesByEmail(useremail);
  return (
    <>
      {messages && messages.length > 0 ? (
        <div className="p-4 ">
          <h1 className="text-2xl font-bold mb-8 ">
            {" "}
            <span className="mr-2">{"Message From:"}</span>
            <span className="text-teal-600">
              {messages[0].name + " "} ({messages[0].email})
            </span>
          </h1>
          <ul className="space-y-6">
            {messages
              .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
              .map((msg) => (
                <li
                  key={msg._id.toString("hex")}
                  className="p-6 bg-gradient-to-r from-white to-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-teal-600"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-bold text-lg text-gray-900">
                        {msg.name}
                      </p>
                      <p className="text-sm text-gray-500">{msg.email}</p>
                    </div>
                    <p className="text-xs text-gray-400">
                      {new Date(msg.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <p className="text-teal-700 font-bold text-base mb-3 bg-teal-50 px-3 py-1 rounded inline-block">
                    {msg.subject}
                  </p>
                  <details className="mt-3">
                    <summary className="cursor-pointer font-medium text-gray-700 hover:text-teal-600">
                      {msg.message.substring(0, 50)}...
                    </summary>
                    <p className="text-gray-700 leading-relaxed break-words mt-3 pl-3 border-l-2 border-gray-300">
                      {msg.message}
                    </p>
                  </details>
                </li>
              ))}
          </ul>
        </div>
      ) : (
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">
            No messages found for {useremail}
          </h1>
        </div>
      )}
    </>
  );
}
