import './App.css';
import Header from './Header.js';
import Footer from './Footer.js';
import Movie from './Movie.js';
import firebase from './firebase.js';
import { useState, useEffect } from 'react';


function App() {

  const [ movies, setMovies ] = useState([]);
  const [ formFields, setFormFields ] = useState({ title: "", comment: "", where: ""});

 
  useEffect(() => {

  const dbRef = firebase.database().ref();

  dbRef.on('value', (data) => {
  
    // console.log(data.val().movies);
    const movieData = data.val().movies;
    const movies = [];
    for ( let movieKey in movieData ) {
      movies.push({
        uniqueKey: movieKey,
        title: movieData[movieKey].title,
        comment: movieData[movieKey].comment,
        where: movieData[movieKey].where,
      });
    }
    // console.log(movies);
    // console.log(data.val());
    setMovies(movies);
     
  })

}, []);
// end of useEffect

const handleChange = (event) => {
  // console.log(event.target.value);
  setFormFields({
    ...formFields,
    [event.target.name]: event.target.value
  });
  console.log(formFields);

}

const handleSubmit = (event) => {
  event.preventDefault();
  const moviesRef = firebase.database().ref('movies');
  moviesRef.push(formFields);
  setFormFields({});
}

  return (
    <div className="App wrapper container">
      <Header />
      <main>
        <section className="form">
          <form action="" onSubmit={handleSubmit}>
            <label htmlFor="title">Movie Title</label>
            <input type="text" id="title" name="title" onChange={handleChange} value={formFields.title}/>
            <label htmlFor="comment">Why is this movie a must-watch?</label>
            <textarea id="comment" name="comment" cols="30" rows="10" onChange={handleChange} value={formFields.comment}></textarea>
            <label htmlFor="where">Where can it be watched?</label>
            <input type="text" id="where" name="where" onChange={handleChange} value={formFields.where}/>
            <button>Recommend</button>
          </form>

        </section>
        <section className="movies">
        {
        movies.map((movie) => {
          return (
            <Movie 
            key={movie.uniqueKey}
            title={movie.title}
            comment={movie.comment}
            where={movie.where}
            />
          )
        })
        }
        </section>
        {/* end of section movies */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
