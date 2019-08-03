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
    SET_FILTER
} from './actions';


const defaultState = {
    projects: {},
    tasks: {},
    selectedProject: '',
    filter: 'all',
    term: ''
}


const startApp = (state, action) => {
    const { projects } = action.payload;
    return {
        ...state,
        ...action.payload,
        selectedProject: Object.keys(projects)[0]
    }
}

const addProject = (state, action) => {
    const newChildRef = database.ref('projects').push();
    const projectId = newChildRef.key;
    const projectName = action.payload;
    const newProject = { [projectId]: action.payload }

    newChildRef.set(projectName).catch((error) => {
        console.log(`Не удалось добавить проект. Ошибка: ${error}`);
    });

    return {
        ...state,
        selectedProject: projectId,
        projects: {
            ...state.projects,
            ...newProject
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

    database.ref('projects/' + projectId).remove().catch((error) => {
        console.log(`Не удалось удалить проект. Ошибка: ${error}`);
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
        label: action.payload
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
    const { tasks } = state;
    const oldTask = tasks[taskId];
    const newTask = { ...oldTask, [propName]: !oldTask[propName] };

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

    database.ref('tasks/' + taskId).remove().catch((error) => {
        console.log(`Не удалось удалить задачу. Ошибка: ${error}`);
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

        default:
            return state;
    }
}