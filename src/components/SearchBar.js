import React, { useState } from 'react';
import '../style/searchBar.css'

function SearchBar({ onSearch, onReset }) {
  const [criteria, setCriteria] = useState({
    genreId: '',
    genreName: '',
    year: '',
    movieTitle: '', // Yeni state: movieTitle
  });
  
  // ...
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCriteria({ ...criteria, [name]: value });
  };

  const handleSearch = () => {
    onSearch(criteria);
  };

  const handleReset = () => {
    setCriteria({
      genreId: '',
      genreName: '',
      year: '',
      movieTitle: '',
    });
    onReset();
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Film Türü ID"
        name="genreId"
        value={criteria.genreId}
        onChange={handleInputChange}
      />
      <input
        type="text"
        placeholder="Tür Adı"
        name="genreName"
        value={criteria.genreName}
        onChange={handleInputChange}
      />
      <input
        type="text"
        placeholder="Film Adı"
        name="movieTitle" // Make sure the name matches the criteria property name
        value={criteria.movieTitle}
        onChange={handleInputChange}
      />
      <input
        type="text"
        placeholder="Yayın Yılı"
        name="year"
        value={criteria.year}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Ara</button>
      <button onClick={handleReset}>Sıfırla</button>
    </div>
  );
}

export default SearchBar;
