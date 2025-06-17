"use client"
import React from "react";
import { Button } from "../ui/button";

function GetInTouchBtn() {
  return (
    <Button
      size="lg"
      variant={"themed_glowing"}
      onClick={() =>
        document
          .getElementById("contact")
          ?.scrollIntoView({ behavior: "smooth" })
      }
    >
      Get In Touch
    </Button>
  );
}

export default GetInTouchBtn;
