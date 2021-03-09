import './App.scss';
import { FaRegThumbsUp } from 'react-icons/fa';
import { AiOutlineLoading } from 'react-icons/ai';

import Header from './Header.js';
import Footer from './Footer.js';
import Movie from './Movie.js';

import firebase from './firebase.js';
import { useState, useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import axios from 'axios';

function App() {

  const [ isLoading, setIsLoading ] = useState(true);
  const [ movies, setMovies ] = useState([]);
  const [ formFields, setFormFields ] = useState({ title: "", comment: "", where: ""})
 
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
      });
    }
    setMovies(movies.reverse());
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

async function getApiData(formFields) {
  axios({
    method: 'GET',
    url: 'http://www.omdbapi.com/',
    dataResponse: 'JSON',
    params: {
      i: 'tt3896198',
      apiKey: '267155fd',
      t: formFields.title,
      format: 'JSON'
    }
  }).then(response => {

    const data = response.data;

    if(data.Response !== "False") {

    confirmAlert({

      customUI: ({ onClose }) => {
        return (
          <div className='react-confirm-alert-body'>
            <h1>Please confirm</h1>
            <p>Is this the movie?</p>
            <p>{data.Title}</p>
            <p>Plot: {data.Plot}</p>
            <p>Year: {data.Year}</p>
            <div><img src={data.Poster} alt="Poster of the movie found in the OMDb API"/></div>
            <div className="react-confirm-alert-button-group">
              <button onClick={onClose}>No, I'll try a different title</button>
              <button
                onClick={() => {
                  const moviesRef = firebase.database().ref('movies');
                  moviesRef.push({
                    ...formFields,
                    title: data.Title,
                    plot: data.Plot,
                    year: data.Year,
                    rating: data.Ratings[0].Value
                  });
                  setFormFields({ title: "", comment: "", where: ""});
                  onClose();
                }}
              >Yes
              </button>
            </div>
          </div>
        );
      }

    })
    // end of ConfirmAlert

  } else {
    confirmAlert({
      title: 'Ooops !!',
      message: `We couldn't find your movie. Please try again.`,
      buttons: [
        {
          label: 'Gotcha!'
        }
      ]
    })
  }
  // end of checking for data

  })
  // end of api response
} 
// end of getApiData

const handleSubmit = (event) => {
  event.preventDefault();
  const { title, comment, where } = formFields;
  if (title && comment && where ) {

    getApiData(formFields);

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
          <h2>Recommend a movie</h2>
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
        <section className="movies" id="movies">
          <h2>Recommendations</h2>
          <div className="movies-list">
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
                plot={movie.plot}
                year={movie.year}
                rating={movie.rating}
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
