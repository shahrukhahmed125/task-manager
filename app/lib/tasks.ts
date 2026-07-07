import { prisma } from "./prisma";
import { TaskInput } from "./validations/task";

export async function getTasksByUserId(userId: number) {
    return await prisma.task.findMany({
        where: { user_id: userId },
        orderBy: { create_at: "desc" },
    });
}

export async function createTask(taskData: TaskInput, userId: number) {
    return await prisma.task.create({
        data: {
            title: taskData.title,
            description: taskData.description || null,
            status: taskData.status,
            user_id: userId,
        },
    });
}

export async function updateTask(taskId: number, taskData: TaskInput) {
    return await prisma.task.update({
        where: { id: taskId },
        data: {
            title: taskData.title,
            description: taskData.description || null,
            status: taskData.status,
        },
    });
}

export async function deleteTask(taskId: number) {
    return await prisma.task.delete({
        where: { id: taskId },
    });
}