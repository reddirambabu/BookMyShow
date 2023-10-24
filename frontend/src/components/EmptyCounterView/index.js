import {Link} from 'react-router-dom'

import './index.css'

const EmptyCounterView = () => (
  <div className="cart-empty-view-container">
    <img
      src="https://www.shutterstock.com/image-vector/people-buying-cinema-tickets-self-260nw-2034345284.jpg"
      className="cart-empty-img"
      alt="cart empty"
    />
    <h1 className="cart-empty-heading">Your Tickets Counter Is  Empty</h1>

    <Link to="/movies">
      <button type="button" className="shop-now-btn">
        Go to All Movies
      </button>
    </Link>
  </div>
)

export default EmptyCounterView
