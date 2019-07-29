export const ADD_PROJECT = 'ADD_PROJECT';
export const START_APP = 'START_APP';
export const SELECT_PROJECT = 'SELECT_PROJECT';
export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const TOGGLE_DONE_TASK = 'TOGGLE_DONE';
export const TOGGLE_DEVELOPING_TASK = 'TOGGLE_DEVELOPING';


export const addProject = projectName => ({
    type: ADD_PROJECT,
    payload: projectName
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

export const toggleDevelopingTask = taskId => ({
    type: TOGGLE_DEVELOPING_TASK,
    payload: taskId
});

export const toggleDoneTask = taskId => ({
    type: TOGGLE_DONE_TASK,
    payload: taskId
});