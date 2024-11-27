import { ComponentProps, ReactNode } from "react";

type ButtonVariants = "primary" | "secondary" | "contained";

export type ButtonProps = {
  variant: ButtonVariants;
  onClick?: () => void;
  children: ReactNode;
} & ComponentProps<"button">;
