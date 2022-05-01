import {getRandomId, TASKS} from "./tasks.mock"

export enum TaskFilter {
  completed = 'completed',
  pending = 'pending',
}

export const getTasks = (filter?: TaskFilter) => {
  if (filter === TaskFilter.completed) {
    return TASKS.filter(task => task.done);
  }
  if (filter === TaskFilter.pending) {
    return TASKS.filter(task => !task.done);
  }

  return TASKS;
}

export const createTask = (description: string) => {
  const task = {
    id: getRandomId(100, 999),
    description,
    done: false,
  };

  TASKS.push(task);

  return task
}

// export const read = (id: string): Task => {
//   const index = TASKS.findIndex(t => t.id === id);
//   return TASKS[index];
// }

export const updateTask = (task: Task): void => {
  const index = TASKS.findIndex(t => t.id === task.id);
  TASKS[index] = task;
}

export const deleteTask = (task: Task): void => {
  const index = TASKS.findIndex(t => t.id === task.id);
  TASKS.splice(index, 1);
}
