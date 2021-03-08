import './App.scss';
import { FaRegThumbsUp } from 'react-icons/fa';
import Header from './Header.js';
import Footer from './Footer.js';
import Movie from './Movie.js';
import firebase from './firebase.js';
import { useState, useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import { AiOutlineLoading } from 'react-icons/ai';

function App() {

  const [ movies, setMovies ] = useState([]);
  const [ formFields, setFormFields ] = useState({ title: "", comment: "", where: ""})
  const [ isLoading, setIsLoading ] = useState(true);;

 
  useEffect(() => {

  const dbRef = firebase.database().ref('movies');

  dbRef.on('value', (data) => {
  
    // console.log(data.val().movies);
    const movieData = data.val();
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
    setMovies(movies.reverse());
    setIsLoading(false);
     
  })

}, []);
// end of useEffect

const handleChange = (event) => {
  // console.log(event.target.value);
  setFormFields({
    ...formFields,
    [event.target.name]: event.target.value
  });
}

const handleSubmit = (event) => {
  event.preventDefault();
  const { title, comment, where } = formFields;
  if (title && comment && where ) {
    const moviesRef = firebase.database().ref('movies');
    moviesRef.push(formFields);
    setFormFields({ title: "", comment: "", where: ""});
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

  return (
    <div className="App wrapper container">
      <Header />
      <main>
      <section className="form">
          <h2>Recommend</h2>
          <p>Use the form below to add a must-watch movie to the board.</p>
          <form action="" onSubmit={handleSubmit}>
            <label htmlFor="title" className="sr-only">Movie Title</label>
            <input type="text" id="title" name="title" placeholder="Type a movie title" onChange={handleChange} value={formFields.title}/>
            <label htmlFor="comment" className="sr-only">Why is this movie a must-watch?</label>
            <textarea id="comment" name="comment" cols="30" rows="10" maxLength="500" placeholder="Why is this movie a must-watch?" onChange={handleChange} value={formFields.comment}></textarea>
            <label htmlFor="where" className="sr-only">Where can it be watched?</label>
            <input type="text" id="where" name="where" placeholder="Where can it be watched?" onChange={handleChange} value={formFields.where}/>
            <button>Recommend <FaRegThumbsUp /></button>
          </form>
        </section>
        {/* end of section form */}
        <section className="movies">
        {
          isLoading
          ? <span className="loading"><AiOutlineLoading /></span>
          : movies.map((movie) => {
          return (
            <Movie 
            key={movie.uniqueKey}
            id={movie.uniqueKey}
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
