import { FC } from "react";

import { ButtonProps } from "./types";

export const Button: FC<ButtonProps> = ({
  children,
  variant,
  disabled,
  onClick,
  ...rest
}) => {
  const baseStyles =
    "flex-grow sm:flex-grow-0 text-sm border-solid border rounded-lg px-3.5 py-2.5 font-semibold shadow-link ";

  const stylingVariant =
    variant === "primary"
      ? "border-border-primary text-font-primary"
      : variant === "secondary"
      ? "border-border-secondary text-font-secondary"
      : variant === "contained"
      ? "bg-background-accent flex items-center gap-2 text-white"
      : "";

  const disabledStyles = `${disabled ? "opacity-50 cursor-not-allowed" : ""}`;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      {...rest}
      className={`${baseStyles} ${stylingVariant} ${disabledStyles}`}
    >
      {children}
    </button>
  );
};
