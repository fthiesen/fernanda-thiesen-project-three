const Movie = (props) => {
  return (
    <div className="movie">
      <h2>{props.title}</h2>
      <p>{props.comment}</p>
      <p>{props.where}</p>
    </div>
  )
}

export default Movie;