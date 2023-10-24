import NonPrimeMovieSection from '../NonPrimeMovieSection'
import PrimeMovieSection from '../PrimeMovieSection'

import Header from '../Header'

import './index.css'

const Movies = () => (
  <>
    <Header />
    <div className="product-sections">
      <PrimeMovieSection />
      <NonPrimeMovieSection />
    </div>
  </>
)

export default Movies
