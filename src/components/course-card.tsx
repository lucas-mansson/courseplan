import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Course } from "@/lib/types/courses"
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import TaskList from "@/components/task-list";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full max-w-6xl">
      <Card className="w-full flex flex-row items-center justify-between px-8">
        <CardHeader className="w-full">
          <CardTitle>{course.name}</CardTitle>
          <CardDescription>{course.code}</CardDescription>
        </CardHeader>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon">
            <ChevronsUpDown />
          </Button>
        </CollapsibleTrigger>
      </Card>
      <CollapsibleContent>
        <TaskList tasks={course.tasks} />
      </CollapsibleContent>
    </Collapsible>
  )
}
