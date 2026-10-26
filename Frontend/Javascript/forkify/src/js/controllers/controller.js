// my api key : 8f169843-241f-4ef0-b24c-538b353fe7f3

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from '../views/recipeView.js';
import recipeModel from '../models/recipeModel.js';
import searchView from '../views/searchView.js';
import searchModel from '../models/searchModel.js';
import searchResultView from '../views/searchResultView.js';
import paginationView from '../views/paginationView.js';
import bookmarkView from '../views/bookmarkView.js';
import addRecipeView from '../views/addRecipeView.js';
import addRecipeModel from '../models/addRecipeModel.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////

async function controlRecipes() {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    await recipeModel.getRecipe(id);
    recipeView.render(recipeModel.state.recipe);
  } catch (error) {
    console.log(error);
    recipeView.renderError();
  }
}

async function searchButtonIsClicked() {
  try {
    const searchQuery = searchView.getSearchedData();
    if (searchQuery.length == 0) return;

    searchResultView.renderSpinner();
    await searchModel.getRecipeData(searchQuery);

    searchResultView.render(searchModel.getCurrentPageResult(1));
    paginationView.render(searchModel.state);
    console.log(searchModel.getCurrentPageResult(1));
  } catch (error) {
    console.log(error);
  }
}

function paginationButtonClicked(pageNumber) {
  searchResultView.render(searchModel.getCurrentPageResult(pageNumber));

  searchModel.state.page = pageNumber;
  paginationView.render(searchModel.state);
}

function recipeButtonsClicked(newServing) {
  recipeModel.updateServings(newServing);
  console.log(recipeModel.state.recipe);
  recipeView.update(recipeModel.state.recipe);
}

function bookmarkHandler(status) {
  const is = status === 1 ? false : true;
  recipeModel.state.recipe.isBookMarked = is;
  if (is) {
    recipeModel.state.bookmarks.push(recipeModel.state.recipe);
  } else {
    const index = recipeModel.state.bookmarks.find(e => {
      return recipeModel.state.recipe.id === e.id;
    });
    if (index !== -1) {
      recipeModel.state.bookmarks.splice(index, 1);
    }
  }
  console.log('book', recipeModel.state, is);
  storeBookmarkToLocalStorage();
  recipeView.update(recipeModel.state.recipe);
}
function navigationBookmarkButtonClicked() {
  console.log('boookmark clicked', recipeModel.state.bookmarks);
  bookmarkView.render(recipeModel.state.bookmarks);
}

function storeBookmarkToLocalStorage() {
  localStorage.setItem(
    'bookmarks',
    JSON.stringify(recipeModel.state.bookmarks),
  );
}

function uploadButtonClicked(object) {
  console.log(object);
}

function init() {
  recipeView.addEventHandler(controlRecipes);
  recipeView.addEventHandlerOnRecipeButtons(recipeButtonsClicked);
  recipeView.addBookmarkButtonHandler(bookmarkHandler);
  searchView.addEventHandlerOnSearchButton(searchButtonIsClicked);
  bookmarkView.addNavBookmarkButtonHandler(navigationBookmarkButtonClicked);
  addRecipeView.addUploadButtonHandler(uploadButtonClicked);
  // searchResultView.addEventHandler(searchResultViewItemIsClicked);
}
init();
