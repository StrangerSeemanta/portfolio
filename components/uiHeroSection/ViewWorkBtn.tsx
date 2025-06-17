"use client"
import React from "react";
import { Button } from "../ui/button";

function ViewWorkBtn() {
  return (
    <Button
      size="lg"
      variant={"themed_secondary"}
      onClick={() =>
        document
          .getElementById("projects")
          ?.scrollIntoView({ behavior: "smooth" })
      }
    >
      View My Work
    </Button>
  );
}

export default ViewWorkBtn;
