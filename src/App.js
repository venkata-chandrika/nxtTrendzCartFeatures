import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
// import EmptyCartView from './components/EmptyCartView'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item
  incrementCartItemQuantity = id => {
    this.setState(pre => ({
      cartList: pre.cartList.map(eachList => {
        if (id === eachList.id) {
          const updatedQuantity = eachList.quantity + 1
          return {...eachList, quantity: updatedQuantity}
        }
        return eachList
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    this.setState(pre => ({
      cartList: pre.cartList.map(eachList => {
        if (id === eachList.id) {
          if (eachList.quantity > 1) {
            const updatedQuan = eachList.quantity - 1
            return {...eachList, quantity: updatedQuan}
          }
        }
        return eachList
      }),
    }))
  }

  addCartItem = product => {
    //   TODO: Update the code here to implement addCartItem
    const {cartList} = this.state
    const productObject = cartList.find(eachList => eachList.id === product.id)
    // console.log(productObject)
    // this.setState(prevState => ({
    //   cartList: [...prevState.cartList, product],
    // }))
    if (productObject) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachList => {
          if (productObject.id === eachList.id) {
            return {
              ...eachList,
              quantity: eachList.quantity + productObject.quantity,
            }
          }
          return eachList
        }),
      }))
    } else {
      this.setState({cartList: [...cartList, product]})
    }
  }

  removeCartItem = id => {
    //   const {cartList} = this.state
    // const updatedCartList = cartList.filter(eachObj => eachObj.id !== id)
    // this.setState({cartList: updatedCartList})
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(eachObj => eachObj.id !== id),
    }))
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
