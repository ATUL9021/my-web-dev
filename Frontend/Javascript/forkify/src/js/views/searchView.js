class SearchView {
  #parentElement = document.querySelector('.search');

  getSearchedData() {
    return this.#parentElement.querySelector('.search__field').value;
  }

  addEventHandlerOnSearchButton(handler) {
    this.#parentElement.addEventListener('click', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
