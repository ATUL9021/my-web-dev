import { getJSON } from '../helper.js';
import { API_URL, KEY } from '../config.js';

class RecipeModel {
  constructor() {
    this.#init();
  }

  #init() {
    const bookmarks = localStorage.getItem('bookmarks');
    if (!bookmarks) return;

    this.state.bookmarks = JSON.parse(bookmarks);
  }
  state = {
    bookmarks: [],
  };
  async getRecipe(id) {
    try {
      const dataOfPizza = await getJSON(`${API_URL}/${id}?key=${KEY}`);
      console.log(dataOfPizza);
      let { recipe } = dataOfPizza.data;
      this.state.recipe = {
        publisher: recipe.publisher,
        ingredients: recipe.ingredients,
        imageUrl: recipe.image_url,
        title: recipe.title,
        cookingTime: recipe.cooking_time,
        id: recipe.id,
        sourceUrl: recipe.source_url,
        servings: 1,
        isBookMarked: false,
      };

      for (const { id } of this.state.bookmarks) {
        if (id === this.state.recipe.id) {
          this.state.recipe.isBookMarked = true;
          break;
        }
      }

      console.log(this.state.recipe);
    } catch (error) {
      throw error;
    }
  }

  updateServings(newServings) {
    console.log('new servings', newServings);
    this.state.recipe.ingredients.forEach(ing => {
      ing.quantity =
        ((ing.quantity ? ing.quantity : 0) * newServings) /
        this.state.recipe.servings;
    });
    this.state.recipe.servings = newServings;
  }
}

export default new RecipeModel();
