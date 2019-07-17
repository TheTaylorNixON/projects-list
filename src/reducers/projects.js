const initialState = {
    projects: [],
    todos: {}
};

const projects = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_PROJECT':
        return {
            ...state,
            projects: [...state.projects, action.payload]
        }

        default:
            return state
    }
}

export default projects;