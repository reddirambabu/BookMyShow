// Write your code here
import './index.css'

import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      let totalAmount = 0
      cartList.forEach(eachItem => {
        const total = eachItem.quantity * eachItem.price
        totalAmount += total
      })
      console.log(totalAmount)

      return (
        <div className="summary-container">
          <div className="amount-section">
            <h1 className="amount-side-heading">
              Total Amount: <span className="amount">{totalAmount}/-</span>
            </h1>
            <p className="cartList-length">Total Tickets: {cartList.length}</p>
          </div>

          
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
