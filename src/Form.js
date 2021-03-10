import { FaRegThumbsUp } from 'react-icons/fa';

const Form = (props) => {

  const { handleChange, handleSubmit, formFields } = props;

  return (
    <section className="form">
          <h2>Recommend a movie</h2>
          <p>Use the form below to add a must-watch movie to the board.</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="title" className="sr-only">Movie Title</label>
            <input type="text" id="title" name="title" placeholder="Type a movie title" onChange={handleChange} value={formFields.title}/>
            <label htmlFor="comment" className="sr-only">Why is this movie a must-watch?</label>
            <textarea id="comment" name="comment" cols="30" rows="10" maxLength="500" placeholder="Why is this movie a must-watch?" onChange={handleChange} value={formFields.comment}></textarea>
            <label htmlFor="where" className="sr-only">Where can it be watched?</label>
            <input type="text" id="where" name="where" placeholder="Where can it be watched?" onChange={handleChange} value={formFields.where}/>
            <button>Recommend <FaRegThumbsUp /></button>
          </form>
        </section>
  )

}

export default Form;