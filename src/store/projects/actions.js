export const ADD_PROJECT = 'ADD_PROJECT';
export const START_APP = 'START_APP';

export const addProject = projectName => ({
    type: ADD_PROJECT,
    payload: projectName
});

export const startApp = data => ({
    type: START_APP,
    payload: data
});