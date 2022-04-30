export interface TaskEvent {
  action: string
  task: Task
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

function setEvents(element: HTMLLIElement, task: Task) {
  const checkboxDone: HTMLInputElement = element.querySelector('input')
  const spanDescription: HTMLSpanElement = element.querySelector('span')
  const buttonDelete: HTMLSpanElement = element.querySelector('.btn-delete')
  const buttonSave: HTMLSpanElement = element.querySelector('.btn-save')
  const updateInput: HTMLInputElement = element.querySelector('input[type="text"]')

  checkboxDone.onchange = () =>
    taskEvent({...task, done: checkboxDone.checked}, element, 'Update')

  spanDescription.ondblclick = () => {
    element.classList.add('updating')
    updateInput.focus()
  }

  buttonDelete.onclick = () =>
    taskEvent(task, element, 'Delete')

  buttonSave.onclick = () =>
    taskEvent({...task, description: updateInput.value}, element, 'Update')

  updateInput.onkeyup = (e) => {
    if (e.code === 'Escape') {
      element.classList.remove('updating')
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
