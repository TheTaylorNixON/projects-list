import React, { Component } from 'react';

import TodoList from './TodoList';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteTask, toggleDoneTask } from '../../store/projects/actions';


class TodoListContainer extends Component {

    render() {
        const { projects, selectedProject, deleteTask, toggleDoneTask } = this.props;

        const selected = selectedProject ? selectedProject : Object.keys(projects)[0];
        const todos = projects[selected] ? projects[selected].tasks : {};

        return (
            <TodoList todos={todos || {}}
                onDeleted={deleteTask}
                onToggleDone={toggleDoneTask}
            />
        )
    }
}


const mapStateToProps = ({ projects }) => ({
    projects: projects.projectsData,
    selectedProject: projects.selectedProject
});

const mapDispatchToProps = {
    deleteTask,
    toggleDoneTask
};

// const mapDispatchToProps = dispatch => ({
//     deleteTask: bindActionCreators(dispatch),
//     onToggleDone: bindActionCreators(dispatch),
//     onToggleDeveloping: bindActionCreators(dispatch)
// });


export default connect(mapStateToProps, mapDispatchToProps)(TodoListContainer);