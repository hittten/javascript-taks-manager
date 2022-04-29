function taskEvent(task, element, action) {
  const TaskEvent = new CustomEvent('TaskEvent' + action, {
    bubbles: true,
    detail: {
      action,
      task,
    }
  });

  element.dispatchEvent(TaskEvent)
}

function setEvents(element: HTMLLIElement, task: Task) {
  const checkboxDone: HTMLInputElement = element.querySelector('input')
  const spanDescription: HTMLSpanElement = element.querySelector('span')
  const buttonDelete: HTMLButtonElement = element.querySelector('span.material-icons')

  checkboxDone.onchange = () =>
    taskEvent(task, element, 'Update')

  spanDescription.ondblclick = () =>
    taskEvent(task, element, 'Update')

  buttonDelete.onclick = () =>
    taskEvent(task, element, 'Delete')
}

export function createTaskElement(task: Task) {
  const element = document.createElement('li')

  element.innerHTML = `
    <div>
      <input type="checkbox" ${task.done ? 'checked' : ''}>
      <span>${task.description}</span>
    </div>
    <span class="material-icons btn-delete">delete_outline</span>
  `;

  setEvents(element, task)

  return element
}


