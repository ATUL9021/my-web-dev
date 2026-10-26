import icons from 'url:../../img/icons.svg';
import { View } from './view.js';
class SearchResultView {
  #parentElement = document.querySelector('.results');
  render(data) {
    this.#clear();
    data.forEach(recipe => {
      this.#parentElement.insertAdjacentHTML(
        'beforeend',
        this.#generateMarkup(recipe),
      );
    });
  }

  renderSpinner() {
    const markup = `
     <<div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div> 
  `;

    this.#parentElement.insertAdjacentHTML('afterBegin', markup);
  }

  #clear() {
    this.#parentElement.innerHTML = '';
  }

  addEventHandler(handler) {
    this.#parentElement.addEventListener('click', function (e) {
      const target = e.target;
      const previewElement = target.closest('.preview');
      if (!previewElement) return;
      //   console.log(previewElement.children[0]);
    });
  }
  #generateMarkup(recipe) {
    return `
     <li class="preview">
            <a class="preview__link preview__link--active" href="#${recipe.id}">
              <figure class="preview__fig">
                <img src="${recipe.imageUrl}" alt="${recipe.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${recipe.title}</h4>
                <p class="preview__publisher">${recipe.publisher}</p>
                <div class="preview__user-generated">
                  <svg>
                    <use href="${icons}#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
    </li>
    `;
  }
}

export default new SearchResultView();
