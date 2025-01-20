interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      className="rounded-lg bg-app-blue-dark p-4 w-full text-foreground text-sm font-bold hover:bg-app-blue transition focus:bg-app-blue disabled:!bg-app-blue-dark/50"
      {...props}
    >
      {children}
    </button>
  );
}
