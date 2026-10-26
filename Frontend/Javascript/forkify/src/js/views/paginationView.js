import icons from 'url:../../img/icons.svg';
class PaginationView {
  #parentElement = document.querySelector('.pagination');
  #generateMarkup(stateData) {
    const totalPage = Math.ceil(
      stateData.search.result.length / stateData.resultPerPage,
    );

    if (stateData.page === 1 && totalPage > 1) {
      return `
      <button data-goto="${stateData.page + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${stateData.page + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
      `;
    } else if (stateData.page == 1) {
      return '';
    } else if (stateData.page === totalPage) {
      return `
      <button data-goto="${stateData.page - 1}" class="btn--inline pagination__btn--prev">
            <span>Page ${stateData.page - 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
          </button>
      `;
    } else {
      return `
      <button data-goto="${stateData.page - 1}" class="btn--inline pagination__btn--prev">
            <span>Page ${stateData.page - 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
          </button>
           <button data-goto="${stateData.page + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${stateData.page + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
          `;
    }
  }
  render(stateData) {
    this.#clear();
    const markup = this.#generateMarkup(stateData);
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  #clear() {
    this.#parentElement.innerHTML = '';
  }

  addEventHandler(handler) {
    this.#parentElement.addEventListener('click', function (e) {
      const target = e.target;
      const btn = target.closest('.btn--inline');
      handler(Number(btn.dataset.goto));
    });
  }
}

export default new PaginationView();
