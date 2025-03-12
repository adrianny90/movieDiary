import { fetchingMovies } from "./modules/fetch.js";
import { renderProducts } from "./modules/smallUI.js";
import { retrieveMovies } from "./modules/store.js";

const AllMovies = await fetchingMovies();
console.log(AllMovies);

const productsContainer = document.getElementById("products-container");

AllMovies?.forEach((product) => renderProducts(product, productsContainer));

const favMovies = retrieveMovies();
