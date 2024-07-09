// const { useState, useEffect } = React
// const { useSelector, useDispatch } = ReactRedux

import { useSelector,useDispatch } from 'react-redux'

import { UserMsg } from './UserMsg.jsx'
import { ShoppingCart } from './ShoppingCart.jsx'
import { TOGGLE_CART_IS_SHOWN } from '../store/reducers/toy.reducer.js'

export function AppFooter() {

    // const [isCartShown, setIsCartShown] = useState(false)
    // const count = 101
    // const toysCount = 0
    const count = useSelector(storeState => storeState.userModule.count)
    const toysCount = useSelector(storeState => storeState.toyModule.toys.length)
    const shoppingCartCount = useSelector(storeState => storeState.toyModule.shoppingCart.length)
    const isCartShown = useSelector(storeState => storeState.toyModule.isCartShown)
    const dispatch = useDispatch()


    // TODO: move to storeState
    const cart = []
    console.log('footer render');

    function onToggleCartIsShown(ev) {
        ev.preventDefault()
        dispatch({ type: TOGGLE_CART_IS_SHOWN })
    }
    return (
        <footer>
            <h5>
                Currently {toysCount} toys in the shop
            </h5>
            <p>
                Coffeerights to all - Count: {count}
            </p>
            <h5>
                <span>{shoppingCartCount}</span> Products in your Cart
                <a href="#" onClick={onToggleCartIsShown}>
                    ({(isCartShown) ? 'hide' : 'show'})
                </a>
            </h5>
            <ShoppingCart isCartShown={isCartShown} />
            <UserMsg />
        </footer>
    )
}
