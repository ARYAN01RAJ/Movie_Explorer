const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

const API_URL = `http://localhost:5000/api/movie/${movieId}`;

const container = document.getElementById("detailsContainer");

async function loadMovieDetails() {
  try {
    const res = await fetch(API_URL);
    const movie = await res.json();

    container.innerHTML = `
      <div class="movie-details-card">
        <img src="${movie.Poster}" class="details-poster">

        <div class="details-info">
          <h1>${movie.Title} (${movie.Year})</h1>
          <p><strong>Genre:</strong> ${movie.Genre}</p>
          <p><strong>Runtime:</strong> ${movie.Runtime}</p>
          <p><strong>Rating:</strong> ${movie.imdbRating}</p>
          <p><strong>Director:</strong> ${movie.Director}</p>
          <p><strong>Actors:</strong> ${movie.Actors}</p>
          <p><strong>Language:</strong> ${movie.Language}</p>
          <p><strong>Plot:</strong> ${movie.Plot}</p>
        </div>
      </div>
    `;
  } catch (err) {
    container.innerHTML = "Error loading details.";
  }
}

loadMovieDetails();
