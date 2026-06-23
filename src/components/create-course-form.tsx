"use client";

import { useActionState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { handleCreateCourse } from "@/lib/actions/courses";

export default function CreateCourseForm() {
  const [state, action] = useActionState(handleCreateCourse, undefined);

  return (
    <Card className="w-full max-w-sm">
      <form action={action} className="w-full flex flex-col gap-4">
        <CardHeader>
          <CardTitle>Create a new course</CardTitle>
          <CardDescription>Enter details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="code">Course Code</Label>
              <Input id="code" name="code" required />
              {state?.errors?.code && (
                <p className="text-red-500">{state.errors.code}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="code">Name</Label>
              <Input id="name" name="name" required />
              {state?.errors?.name && (
                <p className="text-red-500">{state.errors.name}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="code">Link</Label>
              <Input id="link" name="link" required />
              {state?.errors?.link && (
                <p className="text-red-500">{state.errors.link}</p>
              )}
            </div>
            {state?.errors?.form && (
              <p className="text-red-500">{state.errors.form}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Create course
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
