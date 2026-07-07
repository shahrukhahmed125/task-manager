import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { createTask } from "@/app/lib/tasks";
import { routes } from "@/app/lib/routes";
import { taskSchema } from "@/app/lib/validations/task";
import { AppShell } from "@/app/ui/app-shell";
import { TaskForm } from "@/app/ui/tasks/task-form";

type CreateTaskPageProps = {
  searchParams?: {
    error?: string;
  };
};

export default async function CreateTaskPage({ searchParams }: CreateTaskPageProps) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect(routes.login());
  }

  async function createTaskAction(formData: FormData) {
    "use server";

    const result = taskSchema.safeParse({
      title: formData.get("title")?.toString() ?? "",
      description: formData.get("description")?.toString(),
      status: formData.get("status")?.toString(),
    });

    if (!result.success) {
      redirect(`${routes.tasks.create()}?error=Please enter valid task details`);
    }

    const userId = session?.user?.id;

    if (!userId) {
      redirect(routes.login());
    }

    await createTask(result.data, Number(userId));
    redirect(routes.tasks.index());
  }

  return (
    <AppShell title="Create task" subtitle="Add a new task to your list.">
      <TaskForm action={createTaskAction} submitLabel="Create task" error={searchParams?.error} />
    </AppShell>
  );
}
