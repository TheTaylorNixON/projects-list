const initialState = {};

const projects = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_PROJECT':
            return {
                ...state,
                ...action.payload
            }

        default:
            return state
    }
}

export default projects;