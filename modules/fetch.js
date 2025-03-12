const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNGFhYTE1YTA2NWU4M2U5NDY0NTc2OGVmMWIxNGNiZiIsIm5iZiI6MTc0MTY5NzkwNC43OTQsInN1YiI6IjY3ZDAzMzcwNDM0Yzk4YzhlYzgxMmNkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9jO5nJYwBckvjhRbSr6ilEeVYI6H7mkm5WKE-BNQSFU",
  },
};

const fetchingMovies = async () => {
  try {
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      options
    );
    if (!res.ok) throw new Error(`Something went wrong: ${res.status}`);
    const data = await res.json();
    //console.log(data);
    return data.results;
  } catch (error) {
    console.error(error);
  }
};
export { fetchingMovies };
