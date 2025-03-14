const addToMovieList = (movie) => {
  const movieList = JSON.parse(localStorage.getItem("movieList")) || [];
  const updatedList = [...movieList, movie];
  localStorage.setItem("movieList", JSON.stringify(updatedList));

  console.log("Movie added:", movie);
};

export { addToMovieList };
