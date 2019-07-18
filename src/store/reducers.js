import { combineReducers } from "redux";
import { projectsReducer } from "./projects/reducers";


const rootReducer = combineReducers({
    projects: projectsReducer
});

export default rootReducer;