import {openDialog} from "./dialog.service";

export interface TaskEvent {
  action: string
  task: Task
}

export const taskListElement = document.querySelector('#taskList');
const tasksLeftElement = document.querySelector('#tasksLeft');

export function createTaskElements(tasks: Task[]) {
  taskListElement.innerHTML = '';
  let count = 0;
  for (const task of tasks) {
    const taskElement = createTaskElement(task)
    taskListElement.appendChild(taskElement)

    if(!task.done) {
      count++
    }
  }

  updateTasksLeft(count)
}

export function updateTasksLeft(count: number) {
  tasksLeftElement.textContent = `Quedan ${count} tareas`;
}

export function createTaskElement(task: Task) {
  const element = document.createElement('li')

  element.innerHTML = `
    <div>
      <input type="checkbox" ${task.done ? 'checked' : ''}>
      <span>${task.description}</span>
    </div>
    <span class="material-icons btn-delete">delete_outline</span>
    <input type="text" value="${task.description}">
    <span class="material-icons btn-save">done</span>
  `;

  setEvents(element, task)

  return element
}

export function editTaskElement(element: HTMLLIElement, task: Task) {
  element.querySelector('span').textContent = task.description
}

export function enableFormEditTask(element: HTMLLIElement) {
  element.classList.add('updating')
}

export function disableFormEditTask(element: HTMLLIElement) {
  element.classList.remove('updating')
}

function setEvents(element: HTMLLIElement, task: Task) {
  const checkboxDone: HTMLInputElement = element.querySelector('input')
  const spanDescription: HTMLSpanElement = element.querySelector('span')
  const buttonDelete: HTMLSpanElement = element.querySelector('.btn-delete')
  const buttonSave: HTMLSpanElement = element.querySelector('.btn-save')
  const updateInput: HTMLInputElement = element.querySelector('input[type="text"]')

  checkboxDone.onchange = () =>
    taskEvent({...task, done: checkboxDone.checked}, element, 'Update')

  spanDescription.ondblclick = () => {
    enableFormEditTask(element)
    updateInput.focus()
  }

  buttonDelete.onclick = () => {
    openDialog(task.description).then(value => {
      if (value) {
        taskEvent(task, element, 'Delete');
      }
    })
  }

  buttonSave.onclick = () =>
    taskEvent({...task, description: updateInput.value}, element, 'Update')

  updateInput.onkeyup = (e) => {
    if (e.code === 'Escape') {
      enableFormEditTask(element)
      return
    }
    if (e.code === 'Enter') {
      taskEvent({...task, description: updateInput.value}, element, 'Update')
      return
    }
  }
}

function taskEvent(task: Task, element: HTMLLIElement, action: string) {
  const TaskEvent = new CustomEvent<TaskEvent>('TaskEvent', {
    bubbles: true,
    detail: {
      action,
      task,
    }
  });

  element.dispatchEvent(TaskEvent)
}
