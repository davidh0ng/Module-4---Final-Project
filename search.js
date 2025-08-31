console.log("test");

document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector(".search__input");
  input.addEventListener("keyup", async (e) => {
    const userInput = e.target.value.trim();
        if (userInput.length > 0) {
            await movieSearchResult(userInput);
        };
  });
});

async function movieSearchResult(userInput) {
  const movieWrapper = document.querySelector(".search__results--wrapper");

  const getMovies = await fetch(
    `https://omdbapi.com/?s=${userInput}&page=1&apikey=5c395d5b`
  );
  const movieList = await getMovies.json();

  if (movieList.Response === "False") {
    movieWrapper.innerHTML = `<p class="search__no-result">No movies found.</p>`;
    return;
  }

  const movieArray = movieList.Search;

  const movieListHTML = movieArray
    .map((movie) => {
      return `<div class="search__result--box">
                <figure class="search__result--img">
                  <img
                    src="${movie.Poster}"
                    alt=""
                  />
                </figure>
                <h1 class="search__result--title">${movie.Title}</h1>
                <h2 class="search__result--year">${movie.Year}</h2>
              </div>`;
    })
    .join("");

  movieWrapper.innerHTML = movieListHTML;
}

function sortMovies(event) {
    const filter = event.target.value;
    return filter;
}