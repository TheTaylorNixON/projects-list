import database from '../../services/firebase';

import {
    ADD_PROJECT,
    DELETE_PROJECT,
    START_APP,
    SELECT_PROJECT,
    ADD_TASK,
    DELETE_TASK,
    TOGGLE_UPDATE_TASK,
    SET_TERM,
    SET_FILTER,
    SET_CURRENT_USER_ID,
    // firebase on listeners
    ON_TASKS_UPDATE,
    ON_TASK_DELETE,
    ON_PROJECTS_UPDATE,
    ON_PROJECT_DELETE
} from './actions';


const defaultState = {
    projects: {},
    tasks: {},
    selectedProject: '',
    filter: 'all',
    term: '',
    currentUserId: ''
}


const startApp = (state, action) => {
    if (!action.payload.data) {
        return {
            ...state,
            currentUserId: action.payload.currentUserId
        }
    }

    const { projects } = action.payload.data;
    return {
        ...state,
        ...action.payload.data,
        selectedProject: Object.keys(projects)[0] || '',
        currentUserId: action.payload.currentUserId
    }
}

const addProject = (state, action) => {
    const newChildRef = database.ref('projects').push();
    const projectId = newChildRef.key;
    const projectName = action.payload;
    const newProject = {
        label: projectName,
        userId: state.currentUserId
    };

    newChildRef.set(newProject).catch((error) => {
        console.log(`Не удалось добавить проект. Ошибка: ${error}`);
    });

    return {
        ...state,
        selectedProject: projectId,
        projects: {
            ...state.projects,
            [projectId]: newProject
        }
    }
}

const deleteProject = (state, action) => {
    const { projects, tasks } = state;
    const newProjects = { ...projects };
    const newTasks = { ...tasks };
    const projectId = action.payload;
    delete newProjects[projectId];
    const selectedProject = Object.keys(newProjects)[0];

    setTimeout(() => {
        database.ref('projects/' + projectId).remove().catch((error) => {
            console.log(`Не удалось удалить проект. Ошибка: ${error}`);
        });
    });

    Object.keys(tasks).forEach((key) => {
        if (tasks[key].projectId === projectId) {
            delete newTasks[key];
            database.ref('tasks/' + key).remove().catch((error) => {
                console.log(`Не удалось удалить задачу. Ошибка: ${error}`);
            });
        }
    });

    return {
        ...state,
        selectedProject,
        projects: newProjects,
        tasks: newTasks
    }
}

const addTask = (state, action) => {
    const newTask = {
        done: false,
        inDeveloping: false,
        projectId: state.selectedProject,
        label: action.payload,
        userId: state.currentUserId
    }

    const newChildRef = database.ref('tasks').push();
    newChildRef.set(newTask).catch((error) => {
        console.log(`Не удалось добавить проект. Ошибка: ${error}`);
    });

    return {
        ...state,
        tasks: {
            ...state.tasks,
            [newChildRef.key]: newTask
        }
    }
}

const updateTask = (state, action) => {
    const { taskId, propName } = action.payload;
    const { tasks, currentUserId } = state;
    const oldTask = tasks[taskId];
    const newTask = {
        ...oldTask,
        [propName]: !oldTask[propName],
        userId: currentUserId
    };

    database.ref('tasks/' + taskId).update(newTask).catch((error) => {
        console.log(`Не удалось обновить задачу. Ошибка: ${error}`);
    });

    return {
        ...state,
        tasks: {
            ...tasks,
            [taskId]: newTask
        }
    }
}

const deleteTask = (state, action) => {
    const newTasks = { ...state.tasks };
    const taskId = action.payload;
    delete newTasks[taskId];

    setTimeout(() => {
        database.ref('tasks/' + taskId).remove().catch((error) => {
            console.log(`Не удалось удалить задачу. Ошибка: ${error}`);
        });
    });

    return {
        ...state,
        tasks: newTasks
    }
}


// firebase удаляем где child projectId === нашему id передаваемому в equalTo
// в rules fb указываем indexOn
// database.ref('tasks')
//     .orderByChild("projectId")
//     .equalTo(projectId)
//     .once('value')
//     .then((snapshot) => {
//         snapshot.forEach((childSnapshot) => {
//             childSnapshot.ref.remove();
//         });
//     })
//     .catch((error) => {
//         console.log(`Не удалось удалить проект. Ошибка: ${error}`);
//     })





export const projectsReducer = (state = defaultState, action) => {

    switch (action.type) {
        case ADD_PROJECT:
            return addProject(state, action);

        case SELECT_PROJECT:
            return { ...state, selectedProject: action.payload }

        case DELETE_PROJECT:
            return deleteProject(state, action);

        case START_APP:
            return startApp(state, action);

        case ADD_TASK:
            return addTask(state, action);

        case DELETE_TASK:
            return deleteTask(state, action);

        case TOGGLE_UPDATE_TASK:
            return updateTask(state, action);

        case SET_TERM:
            return {
                ...state,
                term: action.payload
            }

        case SET_FILTER:
            return {
                ...state,
                filter: action.payload
            }

        case SET_CURRENT_USER_ID:
            return {
                ...state,
                currentUserId: action.payload
            }

        // firebase on events
        case ON_TASKS_UPDATE:
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    ...action.payload
                }
            }

        case ON_TASK_DELETE:
            const taskId = action.payload;
            if (state.tasks[taskId]) {
                const newTasks = { ...state.tasks };
                delete newTasks[taskId];
                return {
                    ...state,
                    tasks: newTasks
                }
            }
            return state;

        case ON_PROJECTS_UPDATE:
            return {
                ...state,
                projects: {
                    ...state.projects,
                    ...action.payload
                }
            }

        case ON_PROJECT_DELETE:
            const projectId = action.payload;
            if (state.projects[projectId]) {
                const newProjects = { ...state.projects };
                delete newProjects[projectId];
                return {
                    ...state,
                    projects: newProjects
                }
            }
            return state;

        default:
            return state;
    }
}