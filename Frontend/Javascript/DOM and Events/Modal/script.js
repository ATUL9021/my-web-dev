'use strict';

const showModalButtons = document.querySelectorAll('.show-modal');
const closeModal = document.querySelector('.close-modal');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

function toggleHidden() {
  modal.classList.toggle('hidden');
  overlay.classList.toggle('hidden');
}
for (let i = 0; i < showModalButtons.length; i++) {
  console.log(showModalButtons[i]);
  showModalButtons[i].addEventListener('click', function () {
    toggleHidden();
  });
}

closeModal.addEventListener('click', function () {
  toggleHidden();
});

document.addEventListener('keydown', function (event) {
  console.log(event.key);

  if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
    toggleHidden();
  }
});
