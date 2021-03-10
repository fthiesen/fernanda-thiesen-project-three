import './App.scss';
import { AiOutlineLoading } from 'react-icons/ai';

import Header from './Header.js';
import Footer from './Footer.js';
import Movie from './Movie.js';
import Form from './Form.js';
import ApiData from './ApiData.js'
import FilterByGenre from './FilterByGenre.js';

import firebase from './firebase.js';
import { useState, useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

function App() {

  const [ isLoading, setIsLoading ] = useState(true);
  const [ movies, setMovies ] = useState([]);
  const [ filteredMovies, setFilteredMovies ] = useState([]);
  const [ formFields, setFormFields ] = useState({ title: "", comment: "", where: ""});
 
  useEffect(() => {

  const dbRef = firebase.database().ref('movies');

  dbRef.on('value', (data) => {
  
    const movieData = data.val();
    const movies = [];
    for ( let movieKey in movieData ) {
      movies.push({
        uniqueKey: movieKey,
        title: movieData[movieKey].title,
        comment: movieData[movieKey].comment,
        where: movieData[movieKey].where,
        plot: movieData[movieKey].plot,
        year: movieData[movieKey].year,
        rating: movieData[movieKey].rating,
        genre: movieData[movieKey].genre
      });
    }
    setMovies(movies.reverse());
    setFilteredMovies(movies.reverse());
    setIsLoading(false);
     
  })

}, []);
// end of useEffect

const handleChange = (event) => {
  setFormFields({
    ...formFields,
    [event.target.name]: event.target.value
  });
}

const resetFormFields = () => {
  setFormFields({ title: "", comment: "", where: ""});
}

const handleSubmit = (event) => {
  event.preventDefault();
  const { title, comment, where } = formFields;
  if (title && comment && where ) {
    ApiData(formFields, () => resetFormFields());
  } else {
    confirmAlert({
      title: 'Ooops !!',
      message: 'Please fill out all the fields',
      buttons: [
        {
          label: 'Gotcha!'
        }
      ]
    })
  }
}

const filterByGenre = (chosenGenre) => {
  console.log(chosenGenre);
  if( chosenGenre === 'All' ) {
    setFilteredMovies(movies);
  } else {
    const copyOfMovies = [...movies];
    const filteredMoviesArray = copyOfMovies.filter((movie) => {
      const genres = movie.genre.split(',');
      // console.log(genres);
      const matchedGenre = genres.map((genre) => {
        return genre === chosenGenre;
      })
      // console.log(matchedGenre);
      return matchedGenre.includes(true);
    })
    // console.log(filteredMoviesArray);
    setFilteredMovies(filteredMoviesArray);
  }
}

  return (
    <div className="App wrapper container">
      <Header />
      <main>
        <Form 
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          formFields={formFields}
        />
        <section className="movies" id="movies">
          <h2>Recommendations</h2>
          <FilterByGenre filterByGenre={filterByGenre} />
          <div className="movies-list">
            {
              isLoading
              ? <span className="loading"><AiOutlineLoading /></span>
              : filteredMovies.map((movie) => {
              return (
                <Movie 
                key={movie.uniqueKey}
                id={movie.uniqueKey}
                title={movie.title}
                comment={movie.comment}
                where={movie.where}
                plot={movie.plot}
                year={movie.year}
                rating={movie.rating}
                genre={movie.genre}
                />
              )
            })
            }
          </div>
        </section>
        {/* end of section movies */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
