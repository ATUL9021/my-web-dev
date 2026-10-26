class BookmarkView {
  #parentElement = document.querySelector('.bookmarks__list');
  render(data) {
    if (data.length == 0) return;
    this.#clear();
    data.forEach(recipe => {
      this.#parentElement.insertAdjacentHTML(
        'beforeend',
        this.#generateMarkup(recipe),
      );
    });
  }

  #generateMarkup(recipe) {
    return `
    <li class="preview">
                    <a class="preview__link" href="#${recipe.id}">
                      <figure class="preview__fig">
                        <img src="${recipe.imageUrl}" alt="Test" />
                      </figure>
                      <div class="preview__data">
                        <h4 class="preview__name">
                          ${recipe.title}
                        </h4>
                        <p class="preview__publisher">${recipe.publisher}</p>
                      </div>
                    </a>
    </li>
    `;
  }

  #clear() {
    this.#parentElement.innerHTML = '';
  }

  addNavBookmarkButtonHandler(handler) {
    document
      .querySelector('.nav__btn--bookmarks')
      .addEventListener('click', handler);
  }
}

export default new BookmarkView();
