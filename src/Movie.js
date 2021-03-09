import firebase from './firebase.js';
import { GrClose } from 'react-icons/gr';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

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
      <button onClick={ () => {handleClick(props.id)}} className="close" aria-label="Remove recommendation" title="Remove recommendation"><GrClose /></button>
      <h2>{props.title}</h2>
      <p>{props.comment}</p>
      <h4>Plot</h4>
      <p>{props.plot}</p>
      <p>Year: {props.year}</p>
      <p>IMDB Rating: {props.rating}</p>
      <h4>Where to watch it:</h4>
      <p>{props.where}</p>
    </div>
  )
}

export default Movie;