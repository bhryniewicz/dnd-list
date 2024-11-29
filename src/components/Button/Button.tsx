import { FC } from "react";

import { ButtonProps } from "./types";

export const Button: FC<ButtonProps> = ({
  children,
  variant,
  onClick,
  ...rest
}) => {
  const stylingVariant =
    variant === "primary"
      ? "border-border-primary text-font-primary"
      : variant === "secondary"
      ? "border-border-secondary text-font-secondary"
      : variant === "contained"
      ? "bg-background-accent flex items-center gap-2 text-white"
      : null;

  return (
    <button
      onClick={onClick}
      {...rest}
      className={`text-sm border-solid border rounded-lg px-3.5 py-2.5 font-semibold shadow-link ${stylingVariant}`}
    >
      {children}
    </button>
  );
};
