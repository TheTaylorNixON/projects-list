import {
    ADD_PROJECT,
    START_APP,
    SELECT_PROJECT,
    ADD_TASK,
    DELETE_TASK,
    TOGGLE_UPDATE_TASK,
    SET_TERM,
    SET_FILTER
} from './actions';


const defaultState = {
    projects: {},
    tasks: {},
    selectedProject: '',
    filter: 'all',
    term: ''
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
                projects: {
                    ...state.projects,
                    ...action.payload
                }
            }

        case START_APP:
            return {
                ...state,
                ...action.payload
            }

        case ADD_TASK:
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    ...action.payload
                }
            }

        case DELETE_TASK:
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    ...action.payload
                }
            }

        case TOGGLE_UPDATE_TASK:
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    ...action.payload
                }
            }

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