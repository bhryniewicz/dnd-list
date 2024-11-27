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
      ? "border-[#D0D5DD] text-[#344054]"
      : variant === "secondary"
      ? "border-[#D6BBFB] text-[#6941C6]"
      : variant === "contained"
      ? "bg-[#7F56D9] flex items-center gap-2 text-white"
      : null;

  return (
    <button
      onClick={onClick}
      {...rest}
      className={`text-sm border-solid border-[1px] rounded-lg px-3.5 py-2.5 font-semibold shadow-3xl ${stylingVariant}`}
    >
      {children}
    </button>
  );
};
