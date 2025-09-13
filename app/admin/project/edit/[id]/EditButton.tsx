"use client";
import { Edit3 } from "lucide-react";
import React from "react";
interface EditButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
}
const EditButton = React.forwardRef<HTMLButtonElement, EditButtonProps>(
  ({ onClick, ...props }, ref) => {
    return (
      <button
        ref={ref}
        onClick={onClick}
        type="button"
        aria-label="Edit Project"
        title="Edit Project"
        className="bg-white bg-opacity-80 text-gray-800 px-3 py-1 rounded-full hover:bg-opacity-100 transition"
        {...props}
      >
        <Edit3 size={20} className="inline mr-1" />
      </button>
    );
  }
);
EditButton.displayName = "EditButton";

export default EditButton;
