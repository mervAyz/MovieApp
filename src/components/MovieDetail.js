import React, { useEffect, useState } from 'react';
import '../style/movieDetail.css'

function MovieDetail({ movie, movieDetail, onClose }) {
  const DEFAULT_POSTER_URL = 'https://image.tmdb.org/t/p/w200/nu20mtwbEIhUNnQ5NXVhHsNknZj.png'

  if (!movieDetail) {
    return (
      <div>
        <p>No movie details available.</p>
        <button onClick={onClose}>Close</button>
      </div>
    );
  }

  return (
    <div className="movie-detail">
      <h2>{movieDetail?.title}</h2>
      <p>{movieDetail?.overview}</p>
      <div className="homepage">
        <h3>Homepage:</h3>
        <a href={movieDetail?.homepage} target="_blank" rel="noopener noreferrer">
          {movieDetail?.homepage}
        </a>
      </div>
      <div className="production-companies">
        <h3>Production Companies:</h3>
        <ul>
          {movieDetail?.production_companies?.map((company, index) => (
            <li key={index}>
              <img
                src={company?.logo_path ? `https://image.tmdb.org/t/p/w200${company?.logo_path}` : DEFAULT_POSTER_URL}
                alt={company?.name}
              />
              {company?.name}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default MovieDetail;
