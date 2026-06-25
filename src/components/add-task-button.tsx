import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

interface AddTaskButtonProps {
  courseId: string;
}

export default function AddTaskButton({ courseId }: AddTaskButtonProps) {
  const router = useRouter();

  return (
    <Button className="w-full" variant={"ghost"} onClick={() => router.push(`/courses/${courseId}/tasks/create`)}>
      <Plus />
    </Button>
  )
}
