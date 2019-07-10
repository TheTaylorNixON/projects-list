const todos = (state = {}, action) => {
    switch (action.type) {
        case 'APP_START':
            return {
                ...state,
                todoData: action.value
            }
        case 'ADD_TASK':
        case 'CHANGE_TASK':
            return {
                ...state,
                todoData: {
                    [action.id]: action.value
                }
            }
        case 'TOGGLE_TODO':
            return state.map(todo =>
                (todo.id === action.id)
                    ? { ...todo, completed: !todo.completed }
                    : todo
            )
        case 'DELETE_TASK':
            const newState = { ...state.todoData };
            delete newState[action.id];

            return {
                ...state,
                todoData: newState
            }
        default:
            return state
    }
}

export default todos  