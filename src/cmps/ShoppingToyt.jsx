// const { useSelector, useDispatch } = ReactRedux
import { useSelector,useDispatch } from 'react-redux'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { checkout } from '../store/actions/user.actions.js'
import { CLEAR_TOYT, REMOVE_TOY_FROM_TOYT } from '../store/reducers/toy.reducer.js'

export function ShoppingToyt({ isToytShown }) {

    // const shoppingToyt = []
    const shoppingToyt = useSelector(storeState => storeState.toyModule.shoppingToyt)
    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const dispatch = useDispatch()
    // TODO: get from storeState

    function removeFromToyt(toyId) {
        // console.log(`Todo: remove: ${toyId} from toyt`)
        dispatch({ type: REMOVE_TOY_FROM_TOYT, toyId })
    }

    function getToytTotal() {
        return shoppingToyt.reduce((acc, toy) => acc + toy.price, 0)
    }

    function onCheckout() {
        const amount = getToytTotal()
        checkout(amount)
            .then(()=>{
                showSuccessMsg(`Charged you: $ ${amount.toLocaleString()}`)
            })
            .catch(err=>{
                console.log('err:', err)
                showErrorMsg('Problem checking out')
            })
    }

    function onClearToyt() {
        dispatch({ type: CLEAR_TOYT })
    }

    if (!isToytShown) return <span></span>
    const total = getToytTotal()
    return (
        <section className="toyt" >
            <h5>Your Toyt</h5>
            <ul>
                {
                    shoppingToyt.map((toy, idx) =>
                        <li key={idx}>
                            <button onClick={() => removeFromToyt(toy._id)}>x</button>
                            {toy.vendor} | ${toy.price}
                        </li>
                    )
                }
            </ul>
            <p>Total: ${total} </p>
            <button disabled={!user || !total} onClick={onCheckout}>Checkout</button>
            <button onClick={onClearToyt}>Clear</button>
        </section>
    )
}
