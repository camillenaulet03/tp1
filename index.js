async function search() {
    await fetch('https://api.themoviedb.org/3/search/movie?api_key=1f5b6c68a918349731e0c66dc0abe0ea&query=' +
        document.getElementById('movie').value)
        .then(result => result.json())
        .then((data) => {
            document.getElementById('output').innerHTML = data.results
                .map((movie) =>
                    `
                        <span>  
                            <div class="card-content">
                                <h2>${movie.original_title}</h2>
                                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}"></img>
                                <div class="infos">
                                    <p>${movie.overview}</p>
                                    <p>Popularité : ${movie.popularity}</p>
                                </div>
                            </div>
                        </span>
                    `
                ).join("");
        })
}
