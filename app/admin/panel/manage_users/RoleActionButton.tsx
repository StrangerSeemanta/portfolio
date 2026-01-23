"use client";

import { useFormState } from "react-dom";

export default function RoleActionButton({
  action,
  children,
  className = "",
}: {
  action: any;
  children: React.ReactNode;
  className?: string;
}) {
  // useFormState gives: [state, actionWithState, pendingFlag]
  const [state, formAction, pending] = useFormState(action, {
    success: false,
    error: "",
  });

  return (
    <div className="w-full">
      <form action={formAction}>
        <button
          type="submit"
          disabled={pending}
          className={`${className} flex items-center justify-center gap-2 ${
            pending ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {pending && (
            <span className="loader h-4 w-4 border-2 border-t-transparent rounded-full animate-spin" />
          )}
          {children}
        </button>
      </form>

      {state.error && (
        <p className="text-red-600 text-sm mt-1">{state.error}</p>
      )}
      {state.success && (
        <p className="text-green-600 text-sm mt-1">
          Action completed successfully!
        </p>
      )}
    </div>
  );
}
