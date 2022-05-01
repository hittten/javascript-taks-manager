const modalElement = document.querySelector('.modal');
const modalYesButton = modalElement.querySelector<HTMLButtonElement>('button:first-child');
const modalNoButton = modalElement.querySelector<HTMLButtonElement>('button:last-child');

modalNoButton.onclick = () =>
  closeDialog();

export function openDialog() {
  modalElement.classList.add('open');
}

export function closeDialog() {
  modalElement.classList.remove('open');
}

export function changeDescription(text: string) {
  modalElement.querySelector('p')
    .textContent = text
}

