import {Component} from 'react'
import MovieCard from '../MovieCard'
import axios from 'axios'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class PrimeMovieSection extends Component {
  state = {
    primeDeals: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getPrimeDeals()
  }

  getPrimeDeals = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {data} = await axios.get("http://localhost:8000/movies");
    const updatedData = data.map(movie => ({
          id : movie.id,
          title: movie.title,
          rating : movie.rating ,
          description: movie.description,
          genere : movie.genere , 
          language : movie.Language,
          releaseDate:movie.releaseData,
          country:movie.country, 
          imageUrl : movie.image
        }));
    // console.log(updatedData);
    this.setState({
      primeDeals: updatedData,
      apiStatus: apiStatusConstants.success,
    });

  }

  renderPrimeDealsListView = () => {
    const {primeDeals} = this.state
    return (
      <div>
        <h1 className="primedeals-list-heading">All Prime Movies</h1>
        <ul className="products-list">
          {primeDeals.map(movie => (
            <MovieCard moviedata={movie} key={movie.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderPrimeDealsFailureView = () => (
    <img
      src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png"
      alt="register prime"
      className="register-prime-img"
    />
  )

  renderLoadingView = () => (
    <div className="primedeals-loader-container">
      <p>Loading....</p>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderPrimeDealsListView()
      case apiStatusConstants.failure:
        return this.renderPrimeDealsFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default PrimeMovieSection
