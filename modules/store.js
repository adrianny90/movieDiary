//store.js

const storeMovies = (film) => {
  let oldMovies = JSON.parse(localStorage.getItem("movies")) || [];
  let avoidRep = false;
  let index = 0;
  let i = 0;
  if (oldMovies.length > 0) {
    oldMovies.forEach((oldfFilm) => {
      if (oldfFilm.title === film.title) {
        avoidRep = true;
        index = i;
      }
      i++;
    });
  }
  if (!avoidRep) {
    const updatedarray = [...oldMovies, film];
    localStorage.setItem("movies", JSON.stringify(updatedarray));
  } else {
    oldMovies = oldMovies.filter((item) => item !== oldMovies[index]);
    localStorage.setItem("movies", JSON.stringify(oldMovies));
  }
};

const retrieveMovies = () => {
  const likedMovies = JSON.parse(localStorage.getItem("movies")) || [];
  console.log(likedMovies);
  return likedMovies;
};

export { storeMovies, retrieveMovies };
