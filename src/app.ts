import {createTask, deleteTask, getTasks, TaskFilter, updateTask} from "./task.service";
import {disableFormEditTask, createTaskElement, TaskEvent, editTaskElement} from "./task-element.service";

// Elements
const taskInputElement = document.querySelector<HTMLInputElement>('#taskInput');
const taskListElement = document.querySelector('#taskList');
const tasksLeftElement = document.querySelector('#tasksLeft');

function createTaskElements(tasks: Task[]) {
  taskListElement.innerHTML = '';
  for (const task of tasks) {
    const taskElement = createTaskElement(task)
    taskListElement.appendChild(taskElement)
  }
}

// function updateTasksLeft() {
//   const count = TASKS.filter(task => !task.done).length;
//   tasksLeftElement.textContent = `Quedan ${count} tareas`;
// }

const tasks = getTasks()

const count = tasks.filter(task => !task.done).length;
tasksLeftElement.textContent = `Quedan ${count} tareas`;
createTaskElements(getTasks());

// Events

taskInputElement.onkeyup = (e) => {
  if (e.key === 'Enter' && taskInputElement.value) {
    const task = createTask(taskInputElement.value);
    const taskElement = createTaskElement(task);
    taskInputElement.value = '';

    taskListElement.appendChild(taskElement);
  }
};

// Filter control
const filterButtonsContainer = document.querySelector('.filterButtons');
const filterButtons = filterButtonsContainer.querySelectorAll('button');

filterButtonsContainer.addEventListener('click', (e) => {
  const button = e.target;
  if (!(button instanceof HTMLButtonElement)) {
    return
  }

  const filter = button.dataset.filter as TaskFilter
  createTaskElements(getTasks(filter))

  // disable buttons
  for (const btn of filterButtons) {
    btn.disabled = false;
  }
  button.disabled = true;
})
taskListElement.addEventListener('TaskEvent', (e: CustomEvent<TaskEvent>) => {
  const element = e.target as HTMLLIElement
  const {action, task} = e.detail

  if (action === 'Update') {
    updateTask(task)
    editTaskElement(element, task)
    disableFormEditTask(element)
    return
  }

  if (action === 'Delete') {
    deleteTask(task)
    element.remove()
    disableFormEditTask(element)
    return
  }
});
