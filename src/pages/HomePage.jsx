import { CHANGE_BY, DECREMENT, INCREMENT } from "../store/reducers/user.reducer.js"

// const { useState } = React
// const { useSelector, useDispatch } = ReactRedux
import { useSelector,useDispatch } from "react-redux"

import logo from '../assets/img/logo.png'

export function HomePage() {
    // const [count, setCount] = useState(101)
    const count = useSelector(storeState => storeState.userModule.count)
    const dispatch = useDispatch()

    function onIncrease() {
        // setCount(count => count + 1)
        dispatch({ type: INCREMENT })
    }

    function onDecrease() {
        // setCount(count => count - 1)
        dispatch({ type: DECREMENT })

    }

    function changeBy(diff) {
        // setCount(count => count + diff)
        dispatch({ type: CHANGE_BY, diff })

    }

    return (
        <section>
            <h2>
                Count {count}
                <button onClick={onDecrease}>-</button>
                <button onClick={onIncrease}>+</button>
                <button onClick={() => changeBy(50)}>+50</button>
            </h2 >
            <img src={logo} />
        </section >
    )
}