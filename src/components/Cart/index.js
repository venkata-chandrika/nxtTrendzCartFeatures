import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'
import CartSummary from '../CartSummary'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0
      // TODO: Update the functionality to remove all the items in the cart
      const onRemoveAll = () => {
        removeAllCartItems()
      }
      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <div className="cart-heading-remove-cont">
                  <h1 className="cart-heading">My Cart</h1>
                  <button
                    type="button"
                    className="shop-now-button"
                    onClick={onRemoveAll}
                    data-testid="remove"
                  >
                    Remove All
                  </button>
                </div>

                <CartListView />
                {/* TODO: Add your code for Cart Summary here */}

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
