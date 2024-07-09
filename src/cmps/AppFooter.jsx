// const { useState, useEffect } = React
// const { useSelector, useDispatch } = ReactRedux

import { useSelector,useDispatch } from 'react-redux'

import { UserMsg } from './UserMsg.jsx'
import { ShoppingToyt } from './ShoppingToyt.jsx'
import { TOGGLE_TOYT_IS_SHOWN } from '../store/reducers/toy.reducer.js'

export function AppFooter() {

    // const [isToytShown, setIsToytShown] = useState(false)
    // const count = 101
    // const toysCount = 0
    const count = useSelector(storeState => storeState.userModule.count)
    const toysCount = useSelector(storeState => storeState.toyModule.toys.length)
    const shoppingToytCount = useSelector(storeState => storeState.toyModule.shoppingToyt.length)
    const isToytShown = useSelector(storeState => storeState.toyModule.isToytShown)
    const dispatch = useDispatch()


    // TODO: move to storeState
    const toyt = []
    console.log('footer render');

    function onToggleToytIsShown(ev) {
        ev.preventDefault()
        dispatch({ type: TOGGLE_TOYT_IS_SHOWN })
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
                <span>{shoppingToytCount}</span> Products in your Toyt
                <a href="#" onClick={onToggleToytIsShown}>
                    ({(isToytShown) ? 'hide' : 'show'})
                </a>
            </h5>
            <ShoppingToyt isToytShown={isToytShown} />
            <UserMsg />
        </footer>
    )
}
