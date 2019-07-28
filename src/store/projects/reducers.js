import { ADD_PROJECT, START_APP, SELECT_PROJECT } from './actions';


const defaultState = {
    projectsData: {},
    selectedProject: '-LkFzDz8p8ONcq-UIWSf'
}

export const projectsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SELECT_PROJECT:
            return {
                ...state,
                selectedProject: action.payload
            }

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