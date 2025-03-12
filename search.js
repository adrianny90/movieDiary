export async function searchResult(input) {
  //options necessary for API
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNGFhYTE1YTA2NWU4M2U5NDY0NTc2OGVmMWIxNGNiZiIsIm5iZiI6MTc0MTY5NzkwNC43OTQsInN1YiI6IjY3ZDAzMzcwNDM0Yzk4YzhlYzgxMmNkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9jO5nJYwBckvjhRbSr6ilEeVYI6H7mkm5WKE-BNQSFU",
    },
  };

  //construct URL
  const searchTerm = input;
  const url = `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=1`;

  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error("Error");
    const movieList = await response.json();
    return movieList; //returns object with results
  } catch (error) {
    console.error(error);
  }
}

//this functions renders HTML elements for each result
export function displayMovie(movie) {
  const li = document.createElement("li");
  const div = document.createElement("div");
  const spanName = document.createElement("span");

  if (movie.title.length > 25) {
    //if title is longer than 25 chars, cut it off and add "..."
    spanName.textContent = movie.title.substring(0, 25) + "...";
  } else {
    spanName.textContent = movie.title;
  }

  const img = document.createElement("img");
  if (movie.poster_path) {
    //if there is no poster, show a placeholder image
    img.src = "https://image.tmdb.org/t/p/original" + movie.poster_path;
  } else {
    img.src = "./img/placeholder.png";
  }
  const spanRating = document.createElement("span");
  spanRating.textContent = "★ " + Math.round(movie.vote_average);
  const hr = document.createElement("hr");

  //Styling
  div.classList.add("flex", "justify-start", "gap-7", "items-center");
  img.classList.add("w-[10%]");
  spanName.classList.add("text-left");
  spanRating.classList.add("ml-auto");

  //Appending
  div.appendChild(img);
  div.appendChild(spanName);
  div.appendChild(spanRating);
  li.appendChild(div);
  li.appendChild(hr);

  //return the finalized li element
  return li;
}
