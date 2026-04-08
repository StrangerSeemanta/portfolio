"use client";

import { Button } from "@/components/ui/button";

export default function RefreshBtn() {
  return (
    <Button
      variant={"themed_secondary"}
      onClick={() => {
        window.location.reload();
      }}
    >
      Refresh
    </Button>
  );
}
