import { storeMovies } from "./store.js";

const renderProducts = (movie, container) => {
  if (!movie || !container) return;

  // Create the card container
  const card = document.createElement("div");
  card.className =
    "bg-[#6EACDA] rounded-lg shadow-2xl overflow-hidden relative w-full mb-4";

  // Favorite Button
  const favoriteBtn = document.createElement("button");
  favoriteBtn.className = "absolute top-2 right-4 text-white text-2xl";
  favoriteBtn.innerHTML = "🤍"; // Default to empty heart
  favoriteBtn.addEventListener("click", () => {
    favoriteBtn.innerHTML = favoriteBtn.innerHTML === "❤️" ? "🤍" : "❤️";
    storeMovies(movie);
    //refreshView();
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

  // Adding comment section
  const commentSec = document.createElement("div");
  commentSec.className = "p-4";

  // Note
  const note = document.createElement("p");
  note.id = "display-note";
  note.classname = "text-xs opacity-75 mt-1 p-4";
  note.textContent = "";

  // Note Button
  const noteBtn = document.createElement("button");
  noteBtn.className =
    "mt-1 px-3 py-1 bg-white text-xs text-black font-semibold rounded-lg hover:bg-gray-100";
  noteBtn.textContent = "Note";

  const commentBox = document.createElement("div");
  commentBox.id = "comment-box";
  commentBox.className =
    "hidden bg-white border border-gray-300 shadow-lg p-6 rounded-lg h-26 w-96 z-100";

  const userInput = document.createElement("input");
  userInput.id = "user-comment";
  userInput.className =
    "flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black";
  userInput.placeholder = "Type your comment here";

  const okBtn = document.createElement("button");
  okBtn.className =
    "mt-4 px-2 py-1 bg-white border border-gray-300 font-medium text-sm text-black rounded-lg hover:bg-gray-100";

  commentBox.appendChild(userInput);
  commentBox.appendChild(okBtn);

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
  card.appendChild(commentBox);
  commentSec.appendChild(noteBtn);
  commentSec.appendChild(note);
  card.appendChild(commentSec);

  //card.appendChild(addBtn);

  container.appendChild(card);

  noteBtn.addEventListener("click", () => {
    const commentBox = document.getElementsById("comment-box");
    //commentBox.classList.remove("hidden");
    commentBox.style.display = "block";
  });

  okBtn.addEventListener("click", () => {
    const commentBox = document.getElementById("comment-box");
    //commentBox.classList.add("hidden");
    commentBox.style.display = "none";

    // Function to save and display the comment
    function saveComment() {
      // Get the input value
      const comment = document.getElementById("user-comment").value;

      // Check if the input is not empty
      if (comment.trim() !== "") {
        // Save the comment (could be saved to localStorage or a variable)
        localStorage.setItem("user-comment", comment);

        // Display the comment on the page
        document.getElementById("display-note").textContent =
          "Note: " + comment;
      }
    }

    // Load the saved note when the page loads (if any)
    window.onload = function () {
      const savedComment = localStorage.getItem("user-comment");
      if (savedComment) {
        document.getElementById("display-note").textContent = savedComment;
      }
    };
  });
};

// Fetch and render movies on page load
document.addEventListener("DOMContentLoaded", async function () {
  const productsContainer = document.getElementById("products-container");

  if (!productsContainer) {
    console.error("Error: products-container not found.");
    return;
  }

  const movies = await fetchMovieList();
  if (!movies) {
    console.error("No movies found.");
    return;
  }

  console.log("Fetched movies:", movies);

  movies.forEach((movie) => renderProducts(movie, productsContainer));
});

export { renderProducts };
