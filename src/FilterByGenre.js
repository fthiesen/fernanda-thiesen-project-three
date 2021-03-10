import { useState } from 'react';

const FilterByGenre = ({filterByGenre}) => {

  const [ genreFilter, setGenreFilter ] = useState ("All");

  const handleUserChoice = (event) => {
    setGenreFilter(event.target.value);
    filterByGenre(event.target.value);
  }

  return (
    <div className="genre-form">
      <p>Filter the recommendations by genre:</p>
      <form>
        <label htmlFor="filter-by-genre" className="sr-only">Filter by Genre</label>
        <select
          name="filter-by-genre"
          id="filter-by-genre"
          value={genreFilter}
          onChange={handleUserChoice}
        >
          <option value="All">All</option>
          <option value="Comedy">Comedy</option>
          <option value="Family">Family</option>
          <option value="Horror">Horror</option>
          <option value="Romance">Romance</option>
          <option value="Sci-Fi">Sci-Fi</option>
        </select>
      </form>
    </div>
  )
}

export default FilterByGenre;