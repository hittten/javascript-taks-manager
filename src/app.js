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

for (const task of TASKS) {
  const taskElement = document.createElement('li');

  taskElement.innerHTML = `
    <div>
      <input type="checkbox">
      <span>${task.description}</span>
    </div>
    <span class="material-icons btn-delete">delete_outline</span>
  `;

  taskListElement.appendChild(taskElement)
}
