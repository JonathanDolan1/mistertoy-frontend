import { toyService } from "../../services/toy.service.local.js"

//* Toy
export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SET_FILTER_BY = 'SET_FILTER_BY'
export const TOY_UNDO = 'TOY_UNDO'

//* Shopping cart
export const TOGGLE_CART_IS_SHOWN = 'TOGGLE_CART_IS_SHOWN'
export const ADD_TOY_TO_CART = 'ADD_TOY_TO_CART'
export const REMOVE_TOY_FROM_CART = 'REMOVE_TOY_FROM_CART'
export const CLEAR_CART = 'CLEAR_CART'

const initialState = {
    toys: [],
    lastToys: [],
    isLoading: false,
    filterBy: toyService.getDefaultFilter(),
    isCartShown: false,
    shoppingCart: []
}


export function toyReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        //* Toys
        case SET_TOYS:
            return {
                ...state,
                toys: cmd.toys
            }
        case REMOVE_TOY:
            const lastToys = [...state.toys]
            return {
                ...state,
                toys: state.toys.filter(toy => toy._id !== cmd.toyId),
                lastToys
            }

        case ADD_TOY:
            return {
                ...state,
                toys: [...state.toys, cmd.toy]
            }
        case UPDATE_TOY:
            return {
                ...state,
                toys: state.toys.map(toy => toy._id === cmd.toy._id ? cmd.toy : toy)
            }
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: cmd.isLoading
            }
        case SET_FILTER_BY:
            return {
                ...state,
                filterBy: { ...state.filterBy, ...cmd.filterBy }
            }
        case TOY_UNDO:
            return {
                ...state,
                toys: [...state.lastToys]
            }

        //* Shopping cart
        case TOGGLE_CART_IS_SHOWN:
            return {
                ...state,
                isCartShown: !state.isCartShown
            }
        case ADD_TOY_TO_CART:
            return {
                ...state,
                shoppingCart: [...state.shoppingCart, cmd.toy]
            }

        case REMOVE_TOY_FROM_CART:
            const shoppingCart = state.shoppingCart.filter(toy => toy._id !== cmd.toyId)
            return { ...state, shoppingCart }


        case CLEAR_CART:
            return { ...state, shoppingCart: [] }

        default:
            return state
    }
}
