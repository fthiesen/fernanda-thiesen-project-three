const FilterByGenre = ({filterByGenre, genreFilter, setGenreFilter}) => {

  const handleUserChoice = (event) => {
    filterByGenre(event.target.value);
    setGenreFilter(event.target.value);
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
          <option value="Action">Action</option>
          <option value="Adventure">Adventure</option>
          <option value="Animation">Animation</option>
          <option value="Comedy">Comedy</option>
          <option value="Crime">Crime</option>
          <option value="Drama">Drama</option>
          <option value="Documentary">Documentary</option>
          <option value="Family">Family</option>
          <option value="Fantasy">Fantasy</option>
          <option value="History">History</option>
          <option value="Horror">Horror</option>
          <option value="Musical">Musical</option>
          <option value="Mystery">Mystery</option>
          <option value="Romance">Romance</option>
          <option value="Suspense">Suspense</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Thriller">Thriller</option>
          <option value="War">War</option>
          <option value="Western">Western</option>
        </select>
      </form>
    </div>
  )
}

export default FilterByGenre;