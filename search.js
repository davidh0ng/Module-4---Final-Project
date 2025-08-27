console.log("test")

document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('.search__input');
    input.addEventListener('keyup', async (e) => {
        const userInput = e.target.value.trim();
        if (userInput.length > 0) {
            await movieSearch(userInput);
        }
    });
});

let movies = [];

async function movieSearch(userInput) {
    const getMovies = await fetch(`https://omdbapi.com/?s=${userInput}&page=1&apikey=5c395d5b`);
    const movieList = await getMovies.json();

    if (movieList.Response === 'False') {
        return;
    }
}




async function filterMovies() {
    const getMovie = await fetch('https://www.omdbapi.com/?s=inception&apikey=5c395d5b');
    const data = await getMovie.json();
}