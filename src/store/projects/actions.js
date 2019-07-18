export const ADD_PROJECT = 'ADD_PROJECT';

export const addProject = projectName => ({
    type: ADD_PROJECT,
    payload: projectName
})