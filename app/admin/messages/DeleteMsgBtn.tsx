"use client";
import { deleteMessages } from "@/app/actions/deleteMsgs";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";


export default function DeleteMsgBtn() {
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
      }
    }
  };

  return (
    <Button onClick={handleDelete} disabled={isDeleting} variant="destructive">
      {isDeleting ? "Deleting..." : "Delete All Messages"}
    </Button>
  );
}
