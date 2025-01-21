import Link from "next/link";
import { ArrowIcon } from "@/components/icons/arrow-icon";

export default function CreateTaskPage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="pt-24">
      <Link className="inline-flex -m-2 p-2" href="/">
        <span className="sr-only">Back</span>
        <ArrowIcon />
      </Link>
      <div className="pt-12">{children}</div>
    </div>
  );
}
