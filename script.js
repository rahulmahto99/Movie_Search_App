// Tittle: https://www.omdbapi.com/?s=avengers&page=1&apikey=4a8cc070
//  Details : https://www.omdbapi.com/?i=tt3896198&apikey=4a8cc070

// Step 1) create variable of Inputbox, Search list item and Result item
// Step 2) Load movies data from API
// Step 3) Create variable and fetch data form APi and put into list item
// Step $) fetch Data from Api ad put Main container



const movieSearchbox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');


async function loadmovies(searchTerm) {
    const URL = `https://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=4a8cc070`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    if (data.Response == "True") displayMovieList(data.Search);
}


// Add function onkeyup and target 
function findMovies() {
    let searchTerm = (movieSearchbox.value).trim();
    if (searchTerm.length > 0) {
        searchList.classList.remove('hide-search-list');
        loadmovies(searchTerm);
    } else {
        searchList.classList.add('hide-search-list');
    }
}


function displayMovieList(movies) {
    searchList.innerHTML = "";
    for (let idx = 0; idx < movies.length; idx++) {
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movies[idx].imdbID;
        movieListItem.classList.add('search-list-item');

        if (movies[idx].Poster !== "N/A") {
            moviesPoster = movies[idx].Poster;
        } else {
            moviesPoster = "Image_not_found.jpg";
        }

        movieListItem.innerHTML = `
        <div class="search-item-thumbnail">
          <img src="${moviesPoster}">
        </div>
        <div class="search-item-info">
          <h3>${movies[idx].Title}</h3>
          <p>${movies[idx].Year}</p>
        </div>`;

        searchList.appendChild(movieListItem);
    }
    loadmovieDetails();
}



function loadmovieDetails() {
    const searchListMovies = searchList.querySelectorAll('.search-list-item');
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', async () => {
            searchList.classList.add('hide-search-list');
            movieSearchbox.value = "";
            const result = await fetch(`https://www.omdbapi.com/?i=${movie.dataset.id}&apikey=4a8cc070`);
            const movieDetails = await result.json();
            loadMovieDetails(movieDetails);
        })
    })
}

function loadMovieDetails(Details) {
    resultGrid.innerHTML = `
    <div class = "movie-poster">
    <img src = "${(Details.Poster !== "N/A") ? Details.Poster : "Image_not_found.jpg"}" alt = "movie poster">
</div>
<div class = "movie-info">
    <h3 class = "movie-title">${Details.Title}</h3>
    <ul class = "movie-misc-info">
        <li class = "year">${Details.Year}</li>
        <li class = "rated">Ratings:${Details.Rated}</li>
        <li class = "released">Released: ${Details.Released}</li>
    </ul>
    <p class = "genre"><b>Genre:</b> ${Details.Genre}</p>
    <p class = "writer"><b>Writer:</b> ${Details.Writer}</p>
    <p class = "actors"><b>Actors: </b>${Details.Actors}</p>
    <p class = "plot"><b>Plot:</b> ${Details.Plot}</p>
    <p class = "language"><b>Language:</b>  ${Details.Language}</p>
    <p class = "awards"><b><i class = "fas fa-award"></i></b>  ${Details.Awards}</p>
</div> -->
    `
}

window.addEventListener('click', (event)=>{
    if (event.target.className !=="form-control") {
        searchList.classList.add('hide-search-list');
    }
})