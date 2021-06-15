// Mock
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

// Services
const apiUrl = 'https://us-central1-classroom-playground.cloudfunctions.net/api/gilberto';

function getTasks() {
  return fetch(`${apiUrl}/tasks`)
    .then(res => res.json())
}

function createTask(description) {
  const task = {
    description: description,
    done: false,
  };

  return fetch(`${apiUrl}/tasks`, {
    method: 'POST',
    body: JSON.stringify(task),
  })
    .then(response => response.json())
}

function updateTask(task) {
  return fetch(`${apiUrl}/tasks/${task.id}`, {
    method: 'PATCH',
    body: JSON.stringify(task),
  })
    .then(response => response.json())
}

function deleteTask(task) {
  return fetch(`${apiUrl}/tasks/${task.id}`, {
    method: 'DELETE',
    body: JSON.stringify(task),
  })
    .then(response => response.json())
}

// Functions
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

    updateTask(newTask).then(function () {
      updateTasksLeft();
    });
  }

  taskElement.querySelector('span.material-icons').onclick = () => {
    modalElement.querySelector('p').textContent = task.description;
    modalElement.classList.add('open');

    modalYesButton.onclick = () => {
      deleteTask(task).then(() => {
        modalNoButton.click();
        taskElement.remove();
      })
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
      updateTask(updatedTask).then(()=>{
        const updatedTaskElement = createTaskElement(updatedTask);
        taskElement.parentElement.insertBefore(updatedTaskElement, taskElement);
        taskElement.remove();
      })
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
  taskListElement.innerHTML = 'loading';

  filterButtons.forEach(button => button.disabled = false);
  element.disabled = true;

  getTasks().then(tasks => {
    if (element.id === 'allButton') {
      listTasks(taskListElement, tasks, 'all');
    }
    if (element.id === 'pendingButton') {
      listTasks(taskListElement, tasks, 'pending')
    }
    if (element.id === 'completedButton') {
      listTasks(taskListElement, tasks, 'completed')
    }
  })
}

function updateTasksLeft() {
  getTasks()
    .then(tasks => {
      const count = tasks.filter(task => task.done === false).length;
      tasksLeftElement.textContent = `Quedan ${count} tareas`;
    })
}

getTasks()
  .then(tasks => listTasks(taskListElement, tasks))

// getTasks()
//   .then(function (tasks) {
//     listTasks(taskListElement, tasks);
//   })

// Events
taskInputElement.onkeyup = (e) => {
  const input = e.target;

  if (e.key === 'Enter' && input.value) {
    createTask(input.value)
      .then(task => {
        input.focus();
        const taskElement = createTaskElement(task);
        input.value = '';

        taskListElement.appendChild(taskElement);
      })
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
