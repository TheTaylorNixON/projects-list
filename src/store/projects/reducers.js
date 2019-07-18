import { ADD_PROJECT } from './actions';


const defaultState = {}

export const projectsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_PROJECT:
            return {
                ...state,
                ...action.payload
            }

        default:
            return state;
    }
}