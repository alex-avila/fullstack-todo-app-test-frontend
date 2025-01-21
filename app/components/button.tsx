import type { LinkProps } from "next/link";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: "DEFAULT" | "destructive";
}

export function Button({
  children,
  variant = "DEFAULT",
  ...props
}: ButtonProps) {
  const defaultClasses =
    "flex gap-2 items-center justify-center rounded-lg bg-app-blue-dark p-4 w-full text-foreground text-sm font-bold hover:bg-app-blue transition focus:bg-app-blue disabled:!bg-app-blue-dark/50";
  const destructiveClasses =
    "flex gap-2 items-center justify-center rounded-lg bg-red-600 p-4 w-full text-foreground text-sm font-bold hover:bg-red-700 transition focus:bg-red-700 disabled:!bg-red-600/50";

  return (
    <button
      className={
        variant === "destructive" ? destructiveClasses : defaultClasses
      }
      {...props}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  children,
  ...props
}: LinkProps & { children?: React.ReactNode }) {
  return (
    <Link
      className="flex w-full items-center justify-center gap-2 rounded-lg bg-app-blue-dark p-4 text-center text-sm font-bold text-foreground transition hover:bg-app-blue focus:bg-app-blue disabled:!bg-app-blue-dark/50"
      {...props}
    >
      {children}
    </Link>
  );
}
