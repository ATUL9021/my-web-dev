class AddRecipeView {
  #parentElement = document.querySelector('.upload');
  #closeButton = document.querySelector('.btn--close-modal');
  #addRecipeButton = document.querySelector('.nav__btn--add-recipe');
  #overlay = document.querySelector('.overlay');
  #recipeWindow = document.querySelector('.add-recipe-window');

  constructor() {
    this.#addRecipeButtonHandler();
    this.#closeButtonHandler();
  }
  #toggleHiddenClass() {
    this.#overlay.classList.toggle('hidden');
    this.#recipeWindow.classList.toggle('hidden');
    console.log('ddre');
  }

  #addRecipeButtonHandler() {
    this.#addRecipeButton.addEventListener(
      'click',
      this.#toggleHiddenClass.bind(this),
    );
  }
  #closeButtonHandler() {
    this.#closeButton.addEventListener(
      'click',
      this.#toggleHiddenClass.bind(this),
    );
  }

  addUploadButtonHandler(handler) {
    this.#parentElement.addEventListener('click', function (e) {
      e.preventDefault();
      if (!e.target.classList.contains('upload__btn')) return;

      const formData = [...new FormData(this)];
      const obj = Object.fromEntries(formData);
      handler(obj);
    });
  }
}

export default new AddRecipeView();
