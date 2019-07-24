import { SET_TERM, SET_FILTER } from './actions';

const defaultState = {
    todoData: {},
    term: '',
    filter: 'all'
}

export const tasksReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_TERM:
            return {
                ...state,
                term: action.payload
            }

        case SET_FILTER:
            return {
                ...state,
                filter: action.payload
            }

        default:
            return state;
    }
}