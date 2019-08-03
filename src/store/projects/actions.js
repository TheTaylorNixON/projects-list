export const ADD_PROJECT = 'ADD_PROJECT';
export const DELETE_PROJECT = 'DELETE_PROJECT';
export const START_APP = 'START_APP';
export const SELECT_PROJECT = 'SELECT_PROJECT';
export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const TOGGLE_UPDATE_TASK = 'TOGGLE_UPDATE_TASK';
export const SET_TERM = 'SET_TERM';
export const SET_FILTER = 'SET_FILTER';


export const addProject = projectName => ({
    type: ADD_PROJECT,
    payload: projectName
});

export const deleteProject = newProjects => ({
    type: DELETE_PROJECT,
    payload: newProjects
});

export const selectProject = projectKey => ({
    type: SELECT_PROJECT,
    payload: projectKey
});

export const startApp = data => ({
    type: START_APP,
    payload: data
});

export const addTask = task => ({
    type: ADD_TASK,
    payload: task
});

export const deleteTask = taskId => ({
    type: DELETE_TASK,
    payload: taskId
});

export const toggleUpdateTask = newTask => ({
    type: TOGGLE_UPDATE_TASK,
    payload: newTask
});

export const setTerm = term => ({
    type: SET_TERM,
    payload: term
});

export const setFilter = filter => ({
    type: SET_FILTER,
    payload: filter
})