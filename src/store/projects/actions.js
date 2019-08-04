export const ADD_PROJECT = 'ADD_PROJECT';
export const DELETE_PROJECT = 'DELETE_PROJECT';
export const START_APP = 'START_APP';
export const SELECT_PROJECT = 'SELECT_PROJECT';
export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const TOGGLE_UPDATE_TASK = 'TOGGLE_UPDATE_TASK';
export const SET_TERM = 'SET_TERM';
export const SET_FILTER = 'SET_FILTER';
export const SET_CURRENT_USER_ID = 'SET_CURRENT_USER_ID';

// firebase on evnts
export const ON_TASKS_UPDATE = 'ON_TASKS_UPDATE';
export const ON_TASK_DELETE = 'ON_TASK_DELETE';
export const ON_PROJECTS_UPDATE = 'ON_PROJECTS_UPDATE';
export const ON_PROJECT_DELETE = 'ON_PROJECT_DELETE';


export const addProject = projectName => ({
    type: ADD_PROJECT,
    payload: projectName
});

export const deleteProject = projectId => ({
    type: DELETE_PROJECT,
    payload: projectId
});

export const selectProject = projectId => ({
    type: SELECT_PROJECT,
    payload: projectId
});

export const startApp = (data, currentUserId) => ({
    type: START_APP,
    payload: { data, currentUserId }
});

export const addTask = taskName => ({
    type: ADD_TASK,
    payload: taskName
});

export const deleteTask = taskId => ({
    type: DELETE_TASK,
    payload: taskId
});

export const toggleUpdateTask = (taskId, propName) => ({
    type: TOGGLE_UPDATE_TASK,
    payload: { taskId, propName }
});

export const setTerm = term => ({
    type: SET_TERM,
    payload: term
});

export const setFilter = filter => ({
    type: SET_FILTER,
    payload: filter
});

export const setCurrentUserId = id => ({
    type: SET_CURRENT_USER_ID,
    payload: id
});


// firebase event listeners

export const onTasksUpdate = task => ({
    type: ON_TASKS_UPDATE,
    payload: task
});

export const onTaskDelete = taskId => ({
    type: ON_TASK_DELETE,
    payload: taskId
});

export const onProjectsUpdate = project => ({
    type: ON_PROJECTS_UPDATE,
    payload: project
});

export const onProjectDelete = projectId => ({
    type: ON_PROJECT_DELETE,
    payload: projectId
});