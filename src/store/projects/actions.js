export const ADD_PROJECT = 'ADD_PROJECT';
export const START_APP = 'START_APP';
export const SELECT_PROJECT = 'SELECT_PROJECT';


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