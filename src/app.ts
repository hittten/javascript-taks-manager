import {createTask, getTasks, TaskFilter} from "./task.service";
import {createTaskElement, TaskEvent} from "./task-element.service";

// Elements
const taskInputElement = document.querySelector<HTMLInputElement>('#taskInput');
const taskListElement = document.querySelector('#taskList');

const modalElement = document.querySelector('.modal');
const modalYesButton = modalElement.querySelector('button:first-child');
const modalNoButton = modalElement.querySelector('button:last-child');

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
//
// modalNoButton.onclick = () => {
//   modalElement.classList.remove('open');
// }

taskListElement.addEventListener('TaskEvent', (e: CustomEvent<TaskEvent>) => {
  console.log(e.target, e.detail)
});
