import logo from './logo.svg';
import './App.css';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import React, { useState, useEffect } from 'react';


function App() {
  const [movies, setMovies] = useState([]); 
  const [genres, setGenres] = useState([]);
  const [selectedMovieDetail, setSelectedMovieDetail] = useState(null); 
  const [selectedMovie, setSelectedMovie] = useState(null); 
  const [initialMovies, setInitialMovies] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); 
  const [pageRange] = useState(5); 
  const [filterCriteria, setFilterCriteria] = useState({
    genreId: '',
    year: '',
    movieTitle: '', 
    genreName: '',
  });
  const [isLoadingDetail, setIsLoadingDetail] = useState(false); 


  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OThlN2NjNzhiYmI4ZDY2ZWFkNDdjMDZiNzhlMjU3ZSIsInN1YiI6IjY1MDgxZTAwZmEyN2Y0MDBlYjE4NDI4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.adJcl6sf4VBHYKugO2LKjRZKpNzERQ7Jo3oTthBqGWI'
    }
  };


  useEffect(() => {
    console.log("burada 2")
    fetchMovies(currentPage);
  }, [currentPage]);

  const fetchMovies = (page) => {
    console.log("burada")
    fetch(`https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${page}`, options)
      .then(response => response.json())
      .then(response => {
        setMovies(response?.results)
        setTotalPages(response?.total_pages);
        setInitialMovies(response?.results); 
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
      .then(response => response.json())
      .then(response => {
        setGenres(response)
      })
      .catch(err => console.error(err));
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };


  const renderPaginationButtons = () => {
    const pageButtons = [];
    const startPage = Math.max(currentPage - Math.floor(pageRange / 2), 1);
    const endPage = Math.min(startPage + pageRange - 1, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={currentPage === i ? 'active' : ''}
        >
          {i}
        </button>
      );
    }

    return pageButtons;
  };

  const searchMovies = (criteria) => {
    console.log("criteria",criteria)
    setFilterCriteria(criteria);
  };
  
  useEffect(() => {
    const filteredMovies = movies?.filter((movie) => {
      if (filterCriteria?.genreId) {
        const genreIds = movie?.genre_ids.map(String);
        if (!genreIds?.includes(filterCriteria?.genreId)) {
          return false;
        }
      }
      if (filterCriteria?.year) {
        const movieYear = new Date(movie?.release_date).getFullYear().toString();
        if (movieYear !== filterCriteria?.year) {
          return false;
        }
      }
      if (filterCriteria?.movieTitle) {
        const title = movie?.title.toLowerCase(); 
        const searchTitle = filterCriteria?.movieTitle.toLowerCase(); 
        if (!title.includes(searchTitle)) {
          return false;
        }
      }
      if (filterCriteria?.genreName) {
        const genreName = filterCriteria?.genreName.toLowerCase(); 
        const genreIds = movie?.genre_ids.map(String);
        const movieGenres = genreIds?.map((id) => {
          const genre = genres?.genres?.find((genre) => genre.id.toString() === id);
          return genre ? genre.name.toLowerCase() : '';
        });
        if (!movieGenres?.includes(genreName)) {
          return false;
        }
      }
      
      return true;
    });
    setMovies(filteredMovies);
  }, [filterCriteria]);

  const resetMovies = () => {
    setMovies(initialMovies);
  };

  const fetchMovieDetail = async (movieId) => {
    try {
      setIsLoadingDetail(true); 
      const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
      const response = await fetch(apiUrl, options);
      if (!response.ok) {
        throw new Error('Response not OK');
      }
      const data = await response.json();
      console.log("API Response Data:", data); 
      setSelectedMovieDetail(data);
    } catch (error) {
      console.error('Film detayları alınamadı: ', error);
    } finally {
      setIsLoadingDetail(false); 
    }
  };

  const showMovieDetail = async (movie) => {
    await fetchMovieDetail(movie?.id);
    setSelectedMovie(movie);
  };


  return (
    <div className="App">
      <h1>Film Arama Uygulaması</h1>
      <SearchBar onSearch={searchMovies} onReset={resetMovies} />
      
        <MovieList
          movies={movies}
          onSelectMovie={showMovieDetail}
          genres={genres}
          selectedMovieDetail={selectedMovieDetail}
          isLoadingDetail={isLoadingDetail}
          setSelectedMovieDetail={setSelectedMovieDetail}
        />
        
      <div className="pagination">
          {currentPage > 1 && (
            <button onClick={() => handlePageChange(currentPage - 1)}>Önceki</button>
          )}
          {renderPaginationButtons()}
          {currentPage < totalPages && (
            <button onClick={() => handlePageChange(currentPage + 1)}>Sonraki</button>
          )}
        </div>
    </div>
  );
}

export default App;
