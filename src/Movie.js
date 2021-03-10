import firebase from './firebase.js';
import { VscChromeClose } from 'react-icons/vsc';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const Movie = (props) => {
  
  const handleClick = (uniqueId) => {

    confirmAlert({
      title: 'Are you sure...',
      message: '...you want to delete this recommendation?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            const moviesRef = firebase.database().ref('movies');
            moviesRef.child(uniqueId).remove();
            props.setGenreFilter('All');
          }
        },
        {
          label: 'No'
        }
      ]
    })

  }
  return (
    <div className="movie">
      <button onClick={ () => {handleClick(props.id)}} className="close" aria-label="Remove recommendation" title="Remove recommendation"><VscChromeClose /></button>
      <h2>{props.title}</h2>
      <p>{props.comment}</p>
      <h4>Plot</h4>
      <p>{props.plot}</p>
      <p><strong>Genre:</strong> {props.genre}</p>
      <p><strong>Year:</strong> {props.year}</p>
      <p><strong>IMDB Rating:</strong> {props.rating}</p>
      <h4>Where to watch:</h4>
      <p>{props.where}</p>
    </div>
  )
}

export default Movie;