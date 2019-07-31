import React, { Component } from 'react';

import TodoList from './TodoList';

import { connect } from 'react-redux';

import { deleteTask, toggleDoneTask } from '../../store/projects/actions';

import database from '../../services/firebase';


class TodoListContainer extends Component {

    onDeleted = (taskId) => {
        this.props.deleteTask(taskId);
        database.ref('tasks/' + taskId).remove().catch((error) => {
            console.log(`Не удалось удалить задачу. Ошибка: ${error}`);
        });
    }

    onToggleDone = (taskId) => {
        this.props.toggleDoneTask(taskId);
    }

    render() {
        const { tasks, selectedProject, toggleDoneTask } = this.props;

        const todos = {};
        for (let key in tasks) {
            if (tasks[key].projectId === selectedProject) {
                todos[key] = tasks[key];
            }
        }

        return (
            <TodoList todos={todos}
                onDeleted={this.onDeleted}
                onToggleDone={this.onToggleDone}
                onToggleDeveloping={()=>{}}
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