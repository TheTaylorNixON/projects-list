import { ADD_PROJECT, START_APP } from './actions';


const defaultState = {}

export const projectsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_PROJECT:
            return {
                ...state,
                ...action.payload
            }

        case START_APP:
            return {
                ...state,
                ...action.payload
            }

        default:
            return state;
    }
}