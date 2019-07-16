const initialState = [];

const projects = (state = initialState, action) => {
    console.log(state);
    console.log(action);
    switch (action.type) {
        case 'ADD_PROJECT':
            return {
                state
            }
        // return {
        //     ...state,
        //     projects: [...state.projects, action.payload]
        // }

        default:
            return state
    }
}

export default projects;