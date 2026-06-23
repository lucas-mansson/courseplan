"use client"

import { Course } from "@/lib/types/courses"
import { CourseCard } from "@/components/course-card"

interface CourseListProps {
  courses: Course[]
}
export default function CourseList({ courses }: CourseListProps) {
  return (
    <div className="w-full flex items-center justify-center">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  )
}

