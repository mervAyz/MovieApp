import React, {useState} from 'react';
import '../style/movieList.css'
import MovieDetail from './MovieDetail';

function MovieList({ movies, onSelectMovie, genres, selectedMovieDetail, isLoadingDetail, setSelectedMovieDetail }
) {
    const DEFAULT_POSTER_URL = 'https://image.tmdb.org/t/p/w500/ctMserH8g2SeOAnCw5gFjdQF8mo.jpg'
    const genreMap = {};
    genres?.genres?.forEach((genre) => {
        genreMap[genre.id] = genre.name;
    });
    console.log("movies",movies)
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <ul>
                {movies?.map((movie) => (
                    <li key={movie.id}>
                        <img src={movie?.backdrop_path ? `https://image.tmdb.org/t/p/w500${movie?.backdrop_path}` : DEFAULT_POSTER_URL} alt={movie.platformName} />
                        <h2>{movie?.title}</h2>
                        <h8>Tür</h8>
                        <p> {movie?.genre_ids.map((genreId) => genreMap[genreId]).join(', ')}</p>
                        <h8>Release Date :</h8>
                        <p> {movie?.release_date}</p>
                        <h8>
                        Tanım:
                        </h8>
                        <p> {movie?.overview}</p>
                        <button
                            onClick={() => {
                                onSelectMovie(movie);
                            }}
                        >
                            Detay
                        </button>

                        {movie?.id === selectedMovieDetail?.id && (
                        <MovieDetail
                            movieDetail={selectedMovieDetail}
                            onClose={() => {
                                setSelectedMovieDetail(null);
                            }}
                        />
                    )}

                    </li>
                    
                ))}
            </ul>
        </div>
    );
}

export default MovieList;
