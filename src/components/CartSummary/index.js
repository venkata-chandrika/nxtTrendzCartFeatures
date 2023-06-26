// Write your code here
import './index.css'
import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let totalOrderCost = 0

      cartList.forEach(eachList => {
        totalOrderCost += eachList.quantity * eachList.price
      })

      return (
        <div className="cart-summary-container">
          <div className="summary">
            <h1>
              Order Total: <span>Rs {totalOrderCost}</span>
            </h1>
            <p>{cartList.length} items in cart</p>
            <button type="button" className="shop-now-button">
              Checkout
            </button>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default CartSummary
