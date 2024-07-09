// const { useSelector, useDispatch } = ReactRedux
import { useSelector,useDispatch } from 'react-redux'

import { NavLink, useNavigate } from 'react-router-dom'
// const { Link, NavLink } = ReactRouterDOM
// const { useNavigate } = ReactRouter

import { LoginSignup } from './LoginSignup.jsx'
import { userService } from '../services/user.service.local.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { logout } from '../store/actions/user.actions.js'
import { TOGGLE_TOYT_IS_SHOWN } from '../store/reducers/toy.reducer.js'


export function AppHeader() {

    const navigate = useNavigate()
    // const [_user, setUser] = useState(userService.getLoggedinUser())
    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const dispatch = useDispatch()

    function onLogout() {
        logout()
            .then(() => {
                // TODO: use dispatch
                showSuccessMsg('Bye Bye')
            })
            .catch((err) => {
                console.log('err:', err)
                showErrorMsg('OOPs try again')
            })
    }


    function onToggleToyt(ev) {
        ev.preventDefault()
        dispatch({ type: TOGGLE_TOYT_IS_SHOWN })
    }

    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>React Toy App</h1>
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/toy" >Toys</NavLink>
                    <a onClick={onToggleToyt} href="#">🛒 Toyt</a>

                </nav>
            </section>
            {user ? (
                < section >
                    <span to={`/user/${user._id}`}>Hello {user.fullname} <span>${user.score.toLocaleString()}</span></span>
                    <button onClick={onLogout}>Logout</button>
                </ section >
            ) : (
                <section>
                    <LoginSignup />
                </section>
            )}
        </header>
    )
}
