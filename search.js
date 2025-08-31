console.log("test");

document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector(".search__input");
  input.addEventListener("keyup", async (e) => {
    const userInput = e.target.value.trim();
    if (userInput.length > 0) {
      await movieSearchResult(userInput);
    }
  });
});

async function movieSearchResult(userInput, sortBy) {
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

  switch (sortBy) {
    case "TITLE_ASC":
      movieArray.sort((a, b) => a.Title.localeCompare(b.Title));
      break;
    case "TITLE_DESC":
      movieArray.sort((a, b) => b.Title.localeCompare(a.Title));
      break;
    case "YEAR_ASC":
      movieArray.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
      break;
    case "YEAR_DESC":
      movieArray.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
      break;
  }

  const movieListHTML = movieArray
    .map((movie) => {
      return `<button class="search__result--box search__hover--effect">
          <figure class="search__result--img">
          <img
            src="${movie.Poster}"
            alt=""
          />
          </figure>
          <h1 class="search__result--title">${movie.Title}</h1>
          <h2 class="search__result--year">${movie.Year}</h2>
        </button>`;
    })
    .join("");

  movieWrapper.innerHTML = movieListHTML;
}

const clickMovie = document.querySelector(".search__result--box");
const 

async function movieDetailResult(event) {
  .classList.add(".search__results--hide")
  const detailWrapper = document.querySelector(".search__results--wrapper");

  const getMovieDetails = await fetch(
    `https://omdbapi.com/?t=${userInput}&page=1&apikey=5c395d5b`
  );
  const movieDetailArr = await getMovieDetails.json();

  console.log(movieDetailArr)

  `<div class="movie__details--box">
    <img
      src="./assets/Zombie with Worm inside His Head.png"
      alt=""
      class="movie__img"
    />
    <div class="movie__details">
      <div class="movie__details--top">
        <div class="movie__details--top-left">
          <div class="movie__detail movie__title">
            <span class="movie__detail--bold">Title:</span> Inception
          </div>
          <div class="movie__detail movie__year">
            <span class="movie__detail--bold">Year:</span> 2010
          </div>
          <div class="movie__detail movie__rated">
            <span class="movie__detail--bold">Rated:</span> PG-13
          </div>
          <div class="movie__detail movie__runtime">
            <span class="movie__detail--bold">Runtime:</span> 210 min
          </div>
          <div class="movie__detail movie__genre">
            <span class="movie__detail--bold">Genre:</span> Action, Adventure,
            Sci-Fi
          </div>
          <div class="movie__detail movie__director">
            <span class="movie__detail--bold">Director:</span> Christopher Nolan
          </div>
        </div>
        <div class="movie__details--top-right">
          <div class="movie__detail movie__actors">
            <span class="movie__detail--bold">Cast:</span> Leonardo DiCaprio,
            Joseph Gordon-Levitt, Elliot Page
          </div>
          <div class="movie__detail movie__language">
            <span class="movie__detail--bold">Languages:</span> English,
            Japanese, French
          </div>
          <div class="movie__detail movie__imdbrating">
            <span class="movie__detail--bold">IMDB Rating:</span> 8.8
          </div>
          <div class="movie__detail movie__boxoffice">
            <span class="movie__detail--bold">Box Office:</span> $292,587,330
          </div>
        </div>
      </div>
      <div class="movie__detail movie__plot">
        <span class="movie__detail--bold">Plot:</span> A thief who steals
        corporate secrets through the use of dream-sharing technology is given
        the inverse task of planting an idea into the mind of a C.E.O., but his
        tragic past may doom the project and his team to disaster.
      </div>
    </div>
  </div>`;
}

function sortMovies(event) {
  const sortBy = event.target.value;
  const userInput = document.querySelector(".search__input").value.trim();
  if (!userInput) return;

  movieSearchResult(userInput, sortBy);
}
