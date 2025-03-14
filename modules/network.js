const API_READ_ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZWQxMGVjZWU0ODcxNTBhMDUwMDAwM2Q5YmZlNmE5NCIsIm5iZiI6MTc0MTY4MzE3MS40NDMsInN1YiI6IjY3Y2ZmOWUzNmVjZWM1ZjM5YTgxMWNkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ap9QK8ZdTMfLM7lihBfTdN7G3SxvRbkaBhGLNCCHcaM"; // Replace with your actual TMDB API key
const BASE_URL = "https://api.themoviedb.org/3";

async function fetchMovieList() {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?language=en-US&page=1`,
      {
        headers: {
          Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data.results); // Check fetched movies

    const mappedMovies = data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`, // Construct image URL
      //year: movie.release_date ? movie.release_date.substring(0, 4) : "Unknown", // Extract year
      year: movie.release_date || "Unknown",
      rating: movie.vote_average || "N/A", // Use vote_average as rating
      description: movie.overview || "No description available.", // Use overview as description
    }));
    return mappedMovies;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return; // Return an empty array in case of error
  }
}

export { fetchMovieList };
