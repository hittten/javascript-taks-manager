console.log('hello world');

const TASKS = [
  {
    id: 1,
    description: 'Mi primera tarea',
    done: false,
  },
  {
    id: 2,
    description: 'Una tarea sin terminar',
    done: false,
  },
  {
    id: 3,
    description: 'Una tarea terminada',
    done: true,
  },
  {
    id: 4,
    description: 'Una tarea para editar',
    done: false,
  },
  {
    id: 5,
    description: 'Una tarea para eliminar',
    done: true,
  },
  {
    id: 6,
    description: 'Una tarea con un texto muy largo: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquid asperiores consequuntur dolorem excepturi fugiat harum ipsa iure laboriosam libero minima neque porro possimus quam, quasi qui saepe velit veritatis."',
    done: false,
  },
  {
    id: 7,
    description: 'Tarea numero 7',
    done: false,
  },
  {
    id: 8,
    description: 'Tarea numero 8',
    done: false,
  },
  {
    id: 9,
    description: 'Tarea numero 9',
    done: false,
  },
  {
    id: 10,
    description: 'Tarea numero 10',
    done: false,
  },
];

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

// Funtions

function createTask(description) {
  const task = {
    id: TASKS.length + 1,
    description: description,
    done: false,
  };

  TASKS.push(task);

  return task
}

function updateTask(task) {
  const index = TASKS.findIndex(t => t.id === task.id);
  // TASKS.findIndex(function (t) {
  //   if (t.id === true) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // });

  TASKS[index] = task;
}

function deleteTask(task) {
  const index = TASKS.findIndex(t => t.id === task.id);
  delete TASKS[index];
}

function createTaskElement(task) {
  const taskElement = document.createElement('li');

  taskElement.innerHTML = `
    <div>
      <input type="checkbox" ${task.done ? 'checked' : ''}>
      <span>${task.description}</span>
    </div>
    <span class="material-icons btn-delete">delete_outline</span>
  `;

  const input = taskElement.querySelector('input');
  input.onchange = function (e) {
    const newTask = {...task};
    // const newTask = Object.assign({}, task)
    newTask.done = e.target.checked;

    updateTask(newTask);
    updateTasksLeft()
  }

  taskElement.querySelector('span.material-icons').onclick = () => {
    modalElement.querySelector('p').textContent = task.description;
    modalElement.classList.add('open');

    modalYesButton.onclick = () => {
      deleteTask(task);
      modalNoButton.click();
      taskElement.remove();
    };
  };

  taskElement.querySelector('span').onclick = () => {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = task.description;

    const updateButton = document.createElement('span');
    updateButton.className = 'material-icons';
    updateButton.textContent = 'done';

    updateButton.onclick = () => {
      const updatedTask = {...task};
      updatedTask.description = input.value;
      updateTask(updatedTask);

      const updatedTaskElement = createTaskElement(updatedTask);
      taskElement.parentElement.insertBefore(updatedTaskElement, taskElement);
      taskElement.remove();
    };

    taskElement.appendChild(input);
    taskElement.appendChild(updateButton);

    taskElement.classList.add('updating');
  };

  return taskElement;
}

function listTasks(taskList, tasks, filter = 'all') {
  if (filter === 'pending') {
    tasks = tasks.filter(task => task.done === false);
  }
  if (filter === 'completed') {
    tasks = tasks.filter(task => task.done === true);
  }

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
    listTasks(taskListElement, TASKS, 'all');
  }
  if (element.id === 'pendingButton') {
    listTasks(taskListElement, TASKS, 'pending')
  }
  if (element.id === 'completedButton') {
    listTasks(taskListElement, TASKS, 'completed')
  }
}

function updateTasksLeft() {
  const count = TASKS.filter(task => task.done === false).length;
  tasksLeftElement.textContent = `Quedan ${count} tareas`;
}

listTasks(taskListElement, TASKS);

// Events

taskInputElement.onkeyup = (e) => {
  const input = e.target;

  if (e.key === 'Enter' && input.value) {
    input.focus();
    const task = createTask(input.value);
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
