"use client"

import { Task } from "@/lib/types/courses"

interface TaskCardProps {
  task: Task
}

export default function TaskCard({ task }: TaskCardProps) {
  return (
    <div>
      {task.name}
    </div>
  )
}
