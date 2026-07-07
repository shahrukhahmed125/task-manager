import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { deleteTask } from "@/app/lib/tasks";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await deleteTask(Number(id));

  return NextResponse.redirect(new URL("/tasks", process.env.NEXTAUTH_URL || "http://localhost:3000"));
}
