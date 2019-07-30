import {
    ADD_PROJECT,
    START_APP,
    SELECT_PROJECT,
    ADD_TASK,
    DELETE_TASK,
    TOGGLE_DONE_TASK,
    TOGGLE_DEVELOPING_TASK
} from './actions';


const defaultState = {
    projects: {},
    tasks: {},
    selectedProject: ''
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
                // projectsData: {
                //     ...state.projectsData,
                //     [state.selectedProject]: {
                //         ...state.projectsData[state.selectedProject],
                //         tasks: {
                //             ...state.projectsData[state.selectedProject].tasks,
                //             ...action.payload
                //         }
                //     }
                // }
            }

        case DELETE_TASK:
            const selected = state.selectedProject;
            const taskId = action.payload;
            const newState = Object.assign({}, state);
            delete newState.projectsData[selected].tasks[taskId];

            return {
                ...newState
            }

        case TOGGLE_DONE_TASK:
            const taskDone = state.projectsData[state.selectedProject].tasks[action.payload].done;

            return {
                ...state,
                projectsData: {
                    ...state.projectsData,
                    [state.selectedProject]: {
                        ...state.projectsData[state.selectedProject],
                        tasks: {
                            [action.payload]: {
                                ...state.projectsData[state.selectedProject].tasks[action.payload],
                                done: !taskDone
                            }
                        }
                    }
                }
            }

        default:
            return state;
    }
}