// LUKAS PART START
const searchInput = document.getElementById("searchField");
const searchBtn = document.getElementById("searchBtn");
const searchCloseBtn = document.getElementById("searchCloseBtn");
const resultList = document.getElementById("resultList");
const resultWindow = document.getElementById("searchResults");

//Hide result window on load
resultWindow.style.display = "none";

//Import search functions
import { searchResult, displayMovie } from "./search.js";

//Function to display movies, after search
const displayResult = (movie) => {
  resultList.innerHTML = "";
  resultWindow.style.display = "block";

  if (movie.length < 1) {
    //check if at least 1 movie inside result
    const li = document.createElement("li");
    li.textContent = "No movies found. Please try other keywords.";
    resultList.appendChild(li);
    return;
  }

  movie.forEach(async (e) => {
    //for each found movie execute "displayMovie inside search.js"
    const li = await displayMovie(e);
    resultList.appendChild(li); //the function gives us a styled li element
  });

  setTimeout(() => {
    //we want to scroll up to the first entry, but this has to happen after all lis are rendered, so I gave it a timeout
    const firstLi = resultList.querySelector("li");
    console.log(firstLi);
    if (firstLi) {
      firstLi.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, 1);
};

//If search button is clicked, start search
searchBtn.addEventListener("click", async () => {
  const movieList = await searchResult(searchInput.value);
  displayResult(movieList.results);
});

//if close button ist clicked, clear and hide search result window
searchCloseBtn.addEventListener("click", () => {
  resultWindow.style.display = "none";
  resultList.innerHTML = "";
  searchInput.value = "";
});

// LUKAS PART END
