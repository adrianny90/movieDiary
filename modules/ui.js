import { storeMovies } from "./store.js";

const renderProducts = (movie, container, status) => {
  if (!movie || !container) return;

  // Create the card container
  const card = document.createElement("div");
  card.className =
    "bg-[#6EACDA] rounded-lg shadow-2xl overflow-hidden relative w-full mb-4";

  // Favorite Button
  const favoriteBtn = document.createElement("button");
  favoriteBtn.className = "absolute top-2 right-4 text-white text-2xl";
  if (status) {
    favoriteBtn.innerHTML = "❤️"; // Default to empty heart
  } else {
    favoriteBtn.innerHTML = "🤍"; // Default to empty heart
  }

  favoriteBtn.addEventListener("click", () => {
    favoriteBtn.innerHTML = favoriteBtn.innerHTML === "❤️" ? "🤍" : "❤️";
    storeMovies(movie);
  });

  // Movie Image
  const img = document.createElement("img");
  img.className = "w-full h-48 object-cover rounded-md";
  img.src = movie.image;
  //img.src`https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  img.alt = movie.title;

  // Movie Release Date & Rating
  const movieDetails = document.createElement("p");
  movieDetails.className = "text-sm flex items-center mt-2 p-1";
  movieDetails.innerHTML = `
    📅 <span class="ml-2">${movie.year || "Unknown"}</span>
    <span class="ml-auto">⭐ ${movie.rating || "N/A"}</span>
  `;

  // Movie Title
  const title = document.createElement("h2");
  title.className = "font-bold text-lg mt-2 p-4";
  title.textContent = movie.title;

  // Movie Description
  const description = document.createElement("p");
  description.className = "text-sm opacity-75 mt-1 p-4";
  description.textContent =
    movie.description?.substring(0, 100) + "..." || "No description available.";

  // // Add to List Button
  // const addBtn = document.createElement("button");
  // addBtn.className =
  //   "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-3 rounded w-full";
  // addBtn.textContent = "Add to List";
  // addBtn.addEventListener("click", () => addToMovieList(movie));

  // Append Elements
  card.appendChild(favoriteBtn);
  card.appendChild(img);
  card.appendChild(movieDetails);
  card.appendChild(title);
  card.appendChild(description);
  //card.appendChild(addBtn);

  container.appendChild(card);
};

export { renderProducts };
