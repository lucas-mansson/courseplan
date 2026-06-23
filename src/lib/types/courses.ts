export interface Course {
  id: string;
  code: string;
  name: string;
  link: string | null;
  tasks: Task[];
}

export interface Task {
  id: string;
  name: string;
  description: string | null;
  deadline: Date | null;
  location: string | null;
  link: string | null;
  comment: string | null;
  status: TaskStatus;
}

export type TaskStatus =
  | "not_started"
  | "started"
  | "handed_in"
  | "completed"
  | "retake";
