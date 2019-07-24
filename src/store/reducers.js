import { combineReducers } from "redux";
import { projectsReducer } from "./projects/reducers";
import { tasksReducer } from './tasks/reducers';


const rootReducer = combineReducers({
    projects: projectsReducer,
    tasks: tasksReducer
});

export default rootReducer;