
export default async function CreateTask({ params }: { params: Promise<{ id: string }> }) {
  const { id: courseId } = await params;

  return (
    <div>
      Create task for {courseId}
    </div>
  )
}
