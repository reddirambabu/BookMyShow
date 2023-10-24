import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCounterView from '../EmptyCounterView'
import CartSummary from '../CartSummary'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0 

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCounterView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Tickets Cart</h1>
                <button
                  type="button"
                  onClick={removeAllCartItems}
                  className="remove-all-button"
                >
                  Remove All
                </button>
                <CartListView />
                <CartSummary />
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
