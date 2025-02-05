import { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  text: string;
  startIcon: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?: boolean;
}

const variantClasses = {
  primary:
    "bg-purple-600 text-white hover:bg-purple-700 focus:ring-4 focus:ring-purple-300",
  secondary:
    "bg-purple-200 text-purple-600 hover:bg-purple-300 focus:ring-4 focus:ring-purple-100",
};

const defaultStyles =
  "px-6 py-2 rounded-lg font-medium flex items-center justify-center transition-all duration-200 ease-in-out";

export function Button({
  variant,
  text,
  onClick,
  startIcon,
  fullWidth,
  loading,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${variantClasses[variant]} ${defaultStyles} ${
        fullWidth ? "w-full" : ""
      } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
      disabled={loading}
    >
      {loading ? (
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
      ) : (
        <>
          <div className="pr-2">{startIcon}</div>
          {text}
        </>
      )}
    </button>
  );
}
