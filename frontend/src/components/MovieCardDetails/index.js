import {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import CartContext from '../../context/CartContext'
import Header from '../Header'
import SeatsLayout from '../SeatsLayout'


import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MovieCardDetails extends Component {
  state = {
    movieData: {},
    apiStatus: apiStatusConstants.initial,
    quantity: 1,
  }

  componentDidMount() {
    this.getMovieData()
  }

  getMovieData = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const options = {
      method: "get",
      url : `http://localhost:8000/movies/${id}`
    }
    axios(options).then((response)=>{
      console.log( "success ram :" + response.data)
      this.setState({
        movieData: response.data,
        apiStatus: apiStatusConstants.success,
      })
    }).catch((error)=>{
      console.log("ram " + error.request.message)
    })
    
    

  }

  renderLoadingView = () => (
    <div className="products-details-loader-container" data-testid="loader">
      <p>loading....</p>
    </div>
  )

  renderFailureView = () => (
    <div className="product-details-error-view-container">
      <img
        alt="error view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="error-view-image"
      />
      <h1 className="product-not-found-heading">Product Not Found</h1>
      <Link to="/movies">
        <button type="button" className="button">
          Continue Movie Tickets Booking
        </button>
      </Link>
    </div>
  )

 

  renderProductDetailsView = () => (
    <CartContext.Consumer>
      {value => {
        const {movieData, quantity} = this.state
        const {
          fullDescription,ReleaseDate, image, rating, title,Genre,Language
        } = movieData
        const {addCartItem} = value
        const onClickAddToCart = () => {
          addCartItem({...movieData, quantity})
        }
        console.log(movieData)

        return (
          <div className="product-details-success-view">
            <div className="product-details-container">
              <img src={image} alt="product" className="product-image" />
              <div className="product">
                <h1 className="product-name">Movie Name : {title}</h1>
                <p className="price-details">Language : {Language}</p>
                <div className="rating-and-reviews-count">
                  <div className="rating-container">
                    <p className="rating">Rating : {rating}</p>
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                      alt="star"
                      className="star"
                    />
                  </div>
                  <p className="reviews-count">Reviews </p>
                  <p className="reviews-count">Genere : {Genre} </p>
                </div>
                <p className="product-description">{fullDescription}</p>
                <p className="reviews-count">Release Date : {ReleaseDate}</p>
                
                <hr className="horizontal-line" />
                
                <button
                  type="button"
                  className="button add-to-cart-btn"
                  onClick={onClickAddToCart}
                >
                  Book Tickets
                </button>
              </div>
            </div>

            <br/>
            <hr/>
            <h1>Movie Seats Booking</h1>
            <div className="seats-container">
                <div className='timesContainer'>
                    <button
                      type="button"
                      className="button add-to-cart-btn"
                      
                    >
                      2:30 PM
                    </button>
                    <button
                      type="button"
                      className="button add-to-cart-btn"
                      
                    >
                      6:30 PM
                    </button>
                    <button
                      type="button"
                      className="button add-to-cart-btn"
                      
                    >
                      9:45 PM 
                    </button>
                </div>
                <SeatsLayout />

            </div>
            
          </div>
        )
      }}
    </CartContext.Consumer>
  )

  renderProductDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="product-item-details-container">
          {this.renderProductDetails()}
        </div>
      </>
    )
  }
}

export default MovieCardDetails
