import { Button } from "@/components/button";

export default function HomePage() {
  return (
    <div>
      <div className="-translate-y-1/2">
        <Button>Create Task</Button>
      </div>

      <div className="pt-10 pb-6">
        <div className="flex justify-between font-bold text-sm">
          <div className="flex gap-2">
            <span className="text-app-blue">Tasks</span>
            <span className="bg-app-gray-300 rounded-full px-2 py-0.5 text-xs">
              0
            </span>
          </div>
          <div className="flex gap-2">
            <span className="text-app-purple">Completed</span>
            <span className="bg-app-gray-300 rounded-full px-2 py-0.5 text-xs">
              0
            </span>
          </div>
        </div>
      </div>

      <div className="rounded-lg border-t border-app-gray-300 text-app-gray-200 text-center">
        <div className="py-16 px-4">
          <div className="font-bold mb-4">
            You don&apos;t have any tasks registered yet.
          </div>
          <div>Create tasks and organize your to-do items.</div>
        </div>
      </div>
    </div>
  );
}
