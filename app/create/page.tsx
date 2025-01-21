import Link from "next/link";
import { TaskForm } from "@/components/task-form";

export default function CreateTaskPage() {
  return (
    <div className="pt-24">
      <Link href="/">Back</Link>
      <div className="pt-12">
        <TaskForm />
      </div>
    </div>
  );
}
