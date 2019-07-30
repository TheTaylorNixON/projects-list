import React, { Component } from 'react';

import TodoList from './TodoList';

import { connect } from 'react-redux';

import { deleteTask, toggleDoneTask } from '../../store/projects/actions';


class TodoListContainer extends Component {

    render() {
        const { projects, tasks, selectedProject, deleteTask, toggleDoneTask } = this.props;

        const selected = selectedProject ? selectedProject : Object.keys(projects)[0];
        const todos = Object.keys(tasks).filter((key) => {
            return tasks[key] = selected;
        });

        return (
            <TodoList todos={todos || {}}
                onDeleted={deleteTask}
                onToggleDone={toggleDoneTask}
            />
        )
    }
}


const mapStateToProps = ({ projects, tasks, selectedProject }) => ({
    projects,
    tasks,
    selectedProject
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