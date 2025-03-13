import { fetchingMovies } from "./modules/fetch2.js";
import { renderProducts } from "./modules/smallUI2.js";
import { retrieveMovies } from "./modules/store.js";

const AllMovies = await fetchingMovies();
console.log(AllMovies);

const productsContainer = document.getElementById("products-container");

AllMovies?.forEach((product) => renderProducts(product, productsContainer));

const favMovies = retrieveMovies();
