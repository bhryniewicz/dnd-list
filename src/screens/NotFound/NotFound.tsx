"use client";

import { redirect } from "next/navigation";

import { Button } from "@/components/Button";

export const NotFound = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <h1>Wrong page</h1>
      <Button
        variant="contained"
        onClick={() => {
          redirect("/");
        }}
      >
        Go back to homepage
      </Button>
    </div>
  );
};
