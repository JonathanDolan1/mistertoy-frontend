import { toyService } from "../../services/toy.service.local.js"

//* Toy
export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SET_FILTER_BY = 'SET_FILTER_BY'
export const TOY_UNDO = 'TOY_UNDO'

//* Shopping toyt
export const TOGGLE_TOYT_IS_SHOWN = 'TOGGLE_TOYT_IS_SHOWN'
export const ADD_TOY_TO_TOYT = 'ADD_TOY_TO_TOYT'
export const REMOVE_TOY_FROM_TOYT = 'REMOVE_TOY_FROM_TOYT'
export const CLEAR_TOYT = 'CLEAR_TOYT'

const initialState = {
    toys: [],
    lastToys: [],
    isLoading: false,
    filterBy: toyService.getDefaultFilter(),
    isToytShown: false,
    shoppingToyt: []
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

        //* Shopping toyt
        case TOGGLE_TOYT_IS_SHOWN:
            return {
                ...state,
                isToytShown: !state.isToytShown
            }
        case ADD_TOY_TO_TOYT:
            return {
                ...state,
                shoppingToyt: [...state.shoppingToyt, cmd.toy]
            }

        case REMOVE_TOY_FROM_TOYT:
            const shoppingToyt = state.shoppingToyt.filter(toy => toy._id !== cmd.toyId)
            return { ...state, shoppingToyt }


        case CLEAR_TOYT:
            return { ...state, shoppingToyt: [] }

        default:
            return state
    }
}
