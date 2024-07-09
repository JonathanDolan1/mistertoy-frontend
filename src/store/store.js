import { toyReducer } from "./reducers/toy.reducer.js"
import { userReducer } from "./reducers/user.reducer.js"

// const { createStore, combineReducers, compose } = Redux
import { createStore, combineReducers, compose } from "redux"

const rootReducer = combineReducers({
    toyModule: toyReducer,
    userModule: userReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers())

// for DEBUGGING
window.gStore = store

// store.subscribe(() => {
//     console.log('Current state is:', store.getState())
// })
