import { getCoursesByUserId } from "@/lib/data/courses";
import { verifySession } from "@/lib/session";

export default async function Home() {
  const session = await verifySession();
  const courses = await getCoursesByUserId(session.userId)

  console.log(courses);

  return (
    <div>
    </div>
  );
}
