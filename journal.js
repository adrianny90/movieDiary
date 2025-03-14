// const favMovies = retrieveMovies();

import { renderProducts } from "./modules/ui.js";
import { retrieveMovies, storeMovies } from "./modules/store.js";
const btnFavourite = document.getElementById("btn-favourities");

const refreshView = async () => {
  const favouritiesContainer = document.getElementById("favourities-container");
  try {
    const storedMovies = await retrieveMovies();
    storedMovies?.forEach((film) => renderProducts(film, favouritiesContainer));
  } catch (error) {
    ("error retrieving favourite movies");
  }
};
//btnFavourite.addEventListener("click", refreshView());
refreshView();
export { refreshView };
