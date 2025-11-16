const API_URL = "http://localhost:5000/api/search?query=";

const searchInput = document.getElementById("searchInput");
const moviesGrid = document.getElementById("moviesGrid");
const loading = document.getElementById("loading");
const errorMessage = document.getElementById("errorMessage");
const noResults = document.getElementById("noResults");

// Hide UI messages initially
loading.style.display = "none";
errorMessage.style.display = "none";
noResults.style.display = "none";

// Search trigger when user presses Enter
searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    searchMovies();
  }
});

async function searchMovies() {
  const query = searchInput.value.trim();

  if (query === "") return;

  // Show loading
  loading.style.display = "block";
  errorMessage.style.display = "none";
  noResults.style.display = "none";

  try {
    const res = await fetch(`${API_URL}${query}`);
    const data = await res.json();

    loading.style.display = "none";

    if (data.error) {
      noResults.style.display = "block";
      moviesGrid.innerHTML = "";
      return;
    }

    const movies = data.Search;

    if (!movies) {
      noResults.style.display = "block";
      moviesGrid.innerHTML = "";
      return;
    }

    // Clear old results
    moviesGrid.innerHTML = "";

    // Render new movie cards
      movies.forEach((movie) => {
      const card = document.createElement("div");
      card.classList.add("movie-card");
      card.dataset.id = movie.imdbID;

      card.innerHTML = `
        <img src="${movie.Poster !== "N/A" ? movie.Poster : './placeholder.jpg'}"
            alt="${movie.Title}"
            class="movie-poster"
            loading="lazy">
        <div class="movie-info">
          <h3 class="movie-title">${movie.Title}</h3>
          <p class="movie-year">${movie.Year}</p>
          <span class="movie-type">${movie.Type}</span>
        </div>
      `;

      // CLICK HANDLER — THIS IS THE IMPORTANT PART
      card.addEventListener("click", () => {
        console.log("Clicked:", movie.imdbID);  // Debug
        window.location.href = `movie.html?id=${movie.imdbID}`;
      });

      moviesGrid.appendChild(card);
    });


  } catch (err) {
    loading.style.display = "none";
    errorMessage.style.display = "block";
    errorMessage.textContent = "Error fetching movies. Try again!";
  }
}


