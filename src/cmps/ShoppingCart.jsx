// const { useSelector, useDispatch } = ReactRedux
import { useSelector,useDispatch } from 'react-redux'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { checkout } from '../store/actions/user.actions.js'
import { CLEAR_CART, REMOVE_TOY_FROM_CART } from '../store/reducers/toy.reducer.js'

export function ShoppingCart({ isCartShown }) {

    const shoppingCart = useSelector(storeState => storeState.toyModule.shoppingCart)
    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const dispatch = useDispatch()
   

    function removeFromCart(toyId) {
        dispatch({ type: REMOVE_TOY_FROM_CART, toyId })
    }

    function getCartTotal() {
        return shoppingCart.reduce((acc, toy) => acc + toy.price, 0)
    }

    function onCheckout() {
        const amount = getCartTotal()
        checkout(amount)
            .then(()=>{
                showSuccessMsg(`Charged you: $ ${amount.toLocaleString()}`)
            })
            .catch(err=>{
                console.log('err:', err)
                showErrorMsg('Problem checking out')
            })
    }

    function onClearCart() {
        dispatch({ type: CLEAR_CART })
    }

    if (!isCartShown) return <span></span>
    const total = getCartTotal()
    return (
        <section className="cart" >
            <h5>Your Cart</h5>
            <ul>
                {
                    shoppingCart.map((toy, idx) =>
                        <li key={idx}>
                            <button onClick={() => removeFromCart(toy._id)}>x</button>
                            {toy.name} | ${toy.price}
                        </li>
                    )
                }
            </ul>
            <p>Total: ${total} </p>
            <button disabled={!user || !total} onClick={onCheckout}>Checkout</button>
            <button onClick={onClearCart}>Clear</button>
        </section>
    )
}
