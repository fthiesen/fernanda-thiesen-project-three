import axios from 'axios';
import firebase from './firebase.js';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const ApiData = (formFields, resetFormFields) => {

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
    console.log(data);

    if(data.Response !== "False") {

    confirmAlert({

      customUI: ({ onClose }) => {
        return (
          <div className='react-confirm-alert-body'>
            <h1>Please confirm</h1>
            <p>Is this the movie?</p>
            <h2>{data.Title}</h2>
            <p><strong>Plot:</strong> {data.Plot}</p>
            <p><strong>Genre:</strong> {data.Genre}</p>
            <p><strong>Year:</strong> {data.Year}</p>
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
                    rating: data.Ratings[0].Value,
                    genre: data.Genre
                  });
                  const moviesSection = document.getElementById("movies");
                  moviesSection.scrollIntoView();
                  resetFormFields();
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

export default ApiData;