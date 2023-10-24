import {Link} from 'react-router-dom'
import './index.css'

const MovieCard = props => {
  const {moviedata} = props
  console.log(moviedata)
  const { description,language,releaseDate, imageUrl, rating, id , title} = moviedata

  return (
    <li className="product-item">
      <Link to={`/movies/${id}`} className="link-item">
        <img src={imageUrl} alt="product" className="thumbnail" />
        <div className='content'> 
          <div>
            <h1 className="title">Movie Name : {title}</h1>
            <p className="brand"> Language : {language}</p>
            <p className="brand">Description : {description}</p>
          </div>
         
          <div className="product-details">
          <p className="brand item">Release : {releaseDate}</p>
            <div className="rating-container">
              <p className="rating">Rating : {rating}</p>
              <img
                src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                alt="star"
                className="star"
              />
            </div>
          </div>
        </div>
        
      </Link>
    </li>
  )
}
export default MovieCard
