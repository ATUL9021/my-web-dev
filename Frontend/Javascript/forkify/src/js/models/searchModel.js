import { getJSON } from '../helper.js';
import { API_URL, KEY, RESULT_PER_PAGE } from '../config.js';

class SearchModel {
  state = {
    search: {},
    page: 1,
    resultPerPage: RESULT_PER_PAGE,
  };
  async getRecipeData(searchQuery) {
    try {
      this.state.search.searchQuery = searchQuery;
      const data = await getJSON(`${API_URL}?search=${searchQuery}?key=${KEY}`);

      this.state.search.result = data.data.recipes.map(recipe => {
        return {
          publisher: recipe.publisher,
          imageUrl: recipe.image_url,
          title: recipe.title,
          id: recipe.id,
        };
      });
    } catch (error) {
      throw error;
    }
  }

  getCurrentPageResult(page = this.page) {
    const start = (page - 1) * RESULT_PER_PAGE;
    const end = page * RESULT_PER_PAGE;

    return this.state.search.result.slice(start, end);
  }
}

export default new SearchModel();
