// import { combineReducers } from "redux";
// import { tasksReducer } from './tasks/reducers';

// const rootReducer = combineReducers({
//     projects: projectsReducer,
//     tasks: tasksReducer
// });

import { projectsReducer } from "./projects/reducers";

const rootReducer = projectsReducer;

export default rootReducer;