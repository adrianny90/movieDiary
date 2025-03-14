import { renderProducts } from "./modules/ui.js";
import { retrieveMovies } from "./modules/store.js";

const refreshView = async () => {
  const favouritiesContainer = document.getElementById("favourite-container");
  try {
    const storedMovies = await retrieveMovies();
    storedMovies?.forEach((film) =>
      renderProducts(film, favouritiesContainer, true)
    );
  } catch (error) {
    ("error retrieving favourite movies");
  }
};
refreshView();
export { refreshView };
