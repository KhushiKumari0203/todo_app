// ✅ FILE: src/controllers/taskController.ts
import { Request, Response } from 'express';

interface Task {
  id: string;
  name: string;
  status: 'complete' | 'incomplete';
  userId: string;
}

let tasks: Task[] = [];

export const getTasks = (req: Request, res: Response) => {
  res.json(tasks); // Show all tasks for now (no user filter)
};

export const addTask = (req: Request, res: Response) => {
  const newTask: Task = {
    id: Date.now().toString(),
    ...req.body,
    userId: 'guest' // Dummy user since login is disabled
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
};


export const updateTask = (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedTask = req.body;
  tasks = tasks.map(task =>
    task.id === id ? { ...updatedTask, userId: task.userId } : task
  );
  res.json(updatedTask);
};

export const deleteTask = (req: Request, res: Response) => {
  const { id } = req.params;
  tasks = tasks.filter(task => task.id !== id);
  res.status(204).send();
};
