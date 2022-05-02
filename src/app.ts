import {createTask, deleteTask, getTasks, TaskFilter, updateTask} from "./task.service";
import {
  disableFormEditTask,
  TaskEvent,
  editTaskElement,
  createTaskElements, createTaskElement, taskListElement
} from "./task-element.service";

// list all tasks
createTaskElements(getTasks());


const taskInputElement = document.querySelector<HTMLInputElement>('#taskInput');

taskInputElement.onkeyup = (e) => {
  if (e.key === 'Enter' && taskInputElement.value) {
    const task = createTask(taskInputElement.value);
    const taskElement = createTaskElement(task);
    taskInputElement.value = '';

    taskListElement.appendChild(taskElement);
  }
};

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
