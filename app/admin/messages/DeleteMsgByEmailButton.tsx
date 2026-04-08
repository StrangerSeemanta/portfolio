"use client";
import { deleteMessages } from "@/app/actions/deleteMsgs";
import clsx from "clsx";
import { Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
interface DeleteMsgByEmailBtnProps {
    className?: string;
}

export default function DeleteMsgByEmailBtn({ className }: DeleteMsgByEmailBtnProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (
      confirm(
        "Are you sure you want to delete all messages? This action cannot be undone.",
      )
    ) {
      setIsDeleting(true);
      try {
        await deleteMessages();
        toast.success("All messages have been deleted.");
        // Optionally, you can trigger a refresh of the messages list here
      } catch (error) {
        toast.error("Failed to delete messages.");
      } finally {
        setIsDeleting(false);
        window.location.reload(); // Refresh the page to update the messages list
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className={clsx("w-8 h-8 flex justify-center items-center rounded-full shadow-2xl hover:brightness-110 ", className)}
    >
      {isDeleting ? (
        <Loader2 className="animate-spin" size={24} />
      ) : (
        <Trash2 size={24} />
      )}
    </button>
  );
}
