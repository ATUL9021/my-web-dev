import icons from 'url:../../img/icons.svg';
import Fraction from 'fraction.js';

console.log(Fraction);
class RecipeView {
  #parentElement = document.querySelector('.recipe');
  #data;

  update(data) {
    this.#data = data;
    const markup = this.#generateMarkupForRecipe();
    const virNode = document.createRange().createContextualFragment(markup);
    const newElements = Array.from(virNode.querySelectorAll('*'));
    const curElements = Array.from(this.#parentElement.querySelectorAll('*'));
    // console.log(newElements);
    // console.log(curElements);

    newElements.forEach((newElement, index) => {
      const curElement = curElements[index];
      if (
        !curElement.isEqualNode(newElement) &&
        newElement.firstChild?.nodeValue?.trim() !== ''
      ) {
        curElement.textContent = newElement.textContent;
      }

      if (!curElement.isEqualNode(newElement)) {
        Array.from(newElement.attributes).forEach(att => {
          curElement.setAttribute(att.name, att.value);
        });
      }
    });
  }
  render(data) {
    this.#data = data;
    const markup = this.#generateMarkupForRecipe();
    console.log(data);
    this.#clearParent();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  #clearParent() {
    this.#parentElement.innerHTML = '';
  }

  addEventHandler(callbackOfSubscriber) {
    [('load', 'hashchange')].forEach(ele => {
      window.addEventListener(ele, callbackOfSubscriber);
    });
  }
  #errorMessage = 'We could not find that recipe. please search another one';
  #sucessMessage = 'We could not find that recipe. please search another one';
  renderError(message = this.#errorMessage) {
    const markup = `
    <div class="error">
        <div>
            <svg>
              <use href="${icons}#icon-alert-triangle"></use>
            </svg>
        </div>
        <p>${message}</p>
    </div> 
    `;

    this.#clearParent();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderSucess(message = this.#sucessMessage) {
    const markup = `
    <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${message}]</p>
    </div> 
    `;

    this.#clearParent();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
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

  #generateMarkupForRecipe() {
    return `
    <figure class="recipe__fig">
          <img src="${this.#data.imageUrl}" alt="${this.#data.title}" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this.#data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${this.#data.cookingTime}</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${this.#data.servings}</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button data-goto="${this.#data.servings - 1}" class="btn--tiny btn--decrease-servings">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button data-goto="${this.#data.servings + 1}" class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button data-bookmark-status='${this.#data.isBookMarked ? 1 : 0}' class="btn--round btn--bookmark">
            <svg class="">
              <use  href="${icons}#icon-bookmark${this.#data.isBookMarked ? '-fill' : ''}"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">

          ${this.#data.ingredients
            .map(ing => {
              return `<li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${ing.quantity ? new Fraction(Number(ing.quantity)).toFraction() : ''}</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ing.unit}</span>
                ${ing.description}
              </div>
            </li>`;
            })
            .join(' ')}
            

           
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${this.#data.publisher}</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this.#data.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
    
    `;
  }

  addEventHandlerOnRecipeButtons(handler) {
    // console.log(this.#parentElement.querySelector('.recipe__info-buttons'));
    this.#parentElement.addEventListener('click', function (e) {
      const target = e.target.closest('.btn--tiny');
      // console.log('come here start');
      // console.log(target);
      if (!target) return;

      console.log('come here');
      const number = Number(target.dataset.goto);
      if (number > 0) {
        handler(number);
      }
    });
  }

  addBookmarkButtonHandler(handler) {
    this.#parentElement.addEventListener('click', function (e) {
      const button = e.target.closest('.btn--bookmark');
      console.log(button);
      if (!button) return;
      const bookmarkStatus = Number(button.dataset.bookmarkStatus);
      handler(bookmarkStatus);
    });
  }
}

export default new RecipeView();
