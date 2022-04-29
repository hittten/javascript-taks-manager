import * as taskService from "./task.service";
import {list, TaskFilter} from "./task.service";
import {TASKS} from "./tasks.mock";
import {createTaskElement} from "./task-element.service";

console.log('hello world');

// Elements
const taskInputElement = document.querySelector('#taskInput');
const taskListElement = document.querySelector('#taskList');

const modalElement = document.querySelector('.modal');
const modalYesButton = modalElement.querySelector('button:first-child');
const modalNoButton = modalElement.querySelector('button:last-child');

const tasksLeftElement = document.querySelector('#tasksLeft');

const allButton = document.querySelector('#allButton');
const pendingButton = document.querySelector('#pendingButton');
const completedButton = document.querySelector('#completedButton');
const filterButtons = [allButton, pendingButton, completedButton];


function listTasks(taskList, tasks) {
  taskList.innerHTML = '';
  for (const task of tasks) {
    const taskElement = createTaskElement(task)

    taskList.appendChild(taskElement)
  }
  updateTasksLeft()
}

function updateFilterButtonsElements(e) {
  const element = e.target;

  filterButtons.forEach(button => button.disabled = false);
  element.disabled = true;

  if (element.id === 'allButton') {
    listTasks(taskListElement, taskService.list())
  }
  if (element.id === 'pendingButton') {
    listTasks(taskListElement, taskService.list(TaskFilter.pending))
  }
  if (element.id === 'completedButton') {
    listTasks(taskListElement, taskService.list(TaskFilter.completed))
  }
}

function updateTasksLeft() {
  const count = TASKS.filter(task => task.done === false).length;
  tasksLeftElement.textContent = `Quedan ${count} tareas`;
}

listTasks(taskListElement, list());

// Events

taskInputElement.onkeyup = (e) => {
  const input = e.target;

  if (e.key === 'Enter' && input.value) {
    input.focus();
    const task = taskService.create(input.value);
    const taskElement = createTaskElement(task);
    input.value = '';

    taskListElement.appendChild(taskElement);
  }
};

allButton.onclick = function (e) {
  updateFilterButtonsElements(e)
}
pendingButton.onclick = (e) => updateFilterButtonsElements(e);
completedButton.onclick = (e) => updateFilterButtonsElements(e);

modalNoButton.onclick = () => {
  modalElement.classList.remove('open');
}

taskListElement.addEventListener('TaskEventDelete', e => {
  console.log(e)
});

taskListElement.addEventListener('TaskEventUpdate', e => {
  console.log(e)
});
