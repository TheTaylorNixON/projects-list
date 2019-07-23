import { combineReducers } from 'redux'
import todos from './todos'
import projects from './projects'
import visibilityFilter from './VisibilityFilter'

export default combineReducers({
    todos,
    projects,
    visibilityFilter
})