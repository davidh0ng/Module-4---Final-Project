document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector(".search__input");
  const resultsBox = document.getElementById("search__results--boxes");
  const clickBrowse = document.querySelector(".search__results--row");

  input.addEventListener("keyup", async (e) => {
    const userInput = e.target.value.trim();
    if (userInput.length === 0) {
      resultsBox.classList.add("hide__boxes");
      clickBrowse.classList.add("clear__all");
      resultsBox.innerHTML = ""; // clear old results
      return;
    }
    // Otherwise fetch movies
    await movieSearchResult(userInput);
  });
});



async function movieSearchResult(userInput, sortBy) {
  const click = document.querySelector(".search__results--row");
  click.classList.remove("clear__all");

  const movieWrapper = document.getElementById("search__results--boxes");
  const getMovies = await fetch(
    `https://omdbapi.com/?s=${userInput}&page=1&apikey=5c395d5b`
  );
  const movieList = await getMovies.json();

  if (movieList.Response === "False") {
    movieWrapper.innerHTML = `<p class="search__no-result">No movies found.</p>`;
    movieWrapper.classList.remove("hide__boxes");
    return;
  }

  const movieArr = movieList.Search;

  switch (sortBy) {
    case "TITLE_ASC":
      movieArr.sort((a, b) => a.Title.localeCompare(b.Title));
      break;
    case "TITLE_DESC":
      movieArr.sort((a, b) => b.Title.localeCompare(a.Title));
      break;
    case "YEAR_ASC":
      movieArr.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
      break;
    case "YEAR_DESC":
      movieArr.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
      break;
  }

  let movieListHTML = [];

  // Use data attributes instead of duplicate IDs.
  // index and data-index="${index}" accomplishes this task.
  // Used forloop to reiterate through the array in movieArr 6 times and retrieve only 6 contents
  for (i = 0; i <= 5; i++) {
    movieListHTML[i] = movieArr[i];

    movieListHTML[i] = `
        <button class="search__result--box search__hover--effect" data-index="${i}">
          <div class="search__result--img-container"> 
            <figure class="search__result--img">
              <img src="${
                movieArr[i].Poster !== "undefined"
                  ? movieArr[i].Poster
                  : "./assets/No-image-available.jpg"
              }" alt="" />
            </figure>
          </div> 
          <div class="search__result--labels-container">
            <h1 class="search__result--title">${movieArr[i].Title}</h1>
            <h2 class="search__result--year">${movieArr[i].Year}</h2>
          </div>
        </button>`;
  }

  movieWrapper.innerHTML = movieListHTML;

  // Attach click listeners to all buttons. Needs to be different on all buttons
  // Previously I used document.getElementById('movieClick')
  // const clickInputs stores all the objects having the class .search__result--box
  // Use .forEach to apply to button using the index
  // the index is passed through the movieDetail function to apply the new innerHTML
  const clickInputs = document.querySelectorAll(".search__result--box");
  clickInputs.forEach((clickInput, index) => {
    clickInput.addEventListener("click", () => {
      movieDetail(movieArr[index]);
    });
  });
}

// This function will generate detailed informatio about the movie
// selected in the movieSearchResult function
async function movieDetail(movieIndex) {
  console.log("clicked");

  const revealSearchBox = document.getElementById("search__results--boxes");
  revealSearchBox.classList.add("hide__boxes");

  const revealDetailBox = document.getElementById("search__results--details");
  revealDetailBox.classList.add("hide__details");

  const getMovieDetails = await fetch(
    `https://omdbapi.com/?t=${movieIndex.Title}&page=1&apikey=5c395d5b`
  );
  const detail = await getMovieDetails.json();

  let movieDetailsHTML = document.getElementById("search__results--details");

  movieDetailsHTML.innerHTML = `
    <div class="movie__details--box">
    <img
      src="${
        detail.Poster !== "404 (Not Found)"
          ? detail.Poster
          : "./assets/No-image-available.jpg"
      }"
      alt=""
      class="movie__img"
    />
    <div class="movie__details">
      <div class="movie__details--top">
        <div class="movie__details--top-left">
          <div class="movie__detail movie__title">
            <span class="movie__detail--bold">Title:</span> ${detail.Title}
          </div>
          <div class="movie__detail movie__year">
            <span class="movie__detail--bold">Year:</span> ${detail.Year}
          </div>
          <div class="movie__detail movie__rated">
            <span class="movie__detail--bold">Rated:</span> ${detail.Rated}
          </div>
          <div class="movie__detail movie__runtime">
            <span class="movie__detail--bold">Runtime:</span> ${detail.Runtime}
          </div>
          <div class="movie__detail movie__genre">
            <span class="movie__detail--bold">Genre:</span> ${detail.Genre}
          </div>
          <div class="movie__detail movie__director">
            <span class="movie__detail--bold">Director:</span> ${
              detail.Director
            }
          </div>
        </div>
        <div class="movie__details--top-right">
          <div class="movie__detail movie__actors">
            <span class="movie__detail--bold">Cast:</span> ${detail.Actors}
          </div>
          <div class="movie__detail movie__language">
            <span class="movie__detail--bold">Languages:</span> ${
              detail.Languages
            }
          </div>
          <div class="movie__detail movie__imdbrating">
            <span class="movie__detail--bold">IMDB Rating:</span> ${
              detail.imdbRating
            }
          </div>
          <div class="movie__detail movie__boxoffice">
            <span class="movie__detail--bold">Box Office:</span> ${
              detail.BoxOffice
            }
          </div>
        </div>
      </div>
      <div class="movie__detail movie__plot">
        ${detail.Plot}
      </div>
    </div>
  </div>`;

  revealDetailBox.classList.remove("hide__details");
}

function sortMovies(event) {
  const sortBy = event.target.value;
  const userInput = document.querySelector(".search__input").value.trim();
  if (!userInput) return;

  movieSearchResult(userInput, sortBy);
}

//when there is a click on the clear button the movie details should clear
function clearMovies() {
  const revealSearchBox = document.getElementById("search__results--boxes");
  revealSearchBox.classList.add("hide__boxes");

  const revealDetailBox = document.getElementById("search__results--details");
  revealDetailBox.classList.add("hide__details");

  const click = document.querySelector(".search__results--row");
  click.classList.add("clear__all")
}
