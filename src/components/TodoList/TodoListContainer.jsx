import React, { Component } from 'react';

import TodoList from './TodoList';

import { connect } from 'react-redux';

import { deleteTask, toggleUpdateTask } from '../../store/projects/actions';


class TodoListContainer extends Component {

    searchTask = (task, term) => {
        return task.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    }

    filterTask = (task, filter) => {
        switch (filter) {
            case 'done':
                return task.done;
            case 'active':
                return !task.done;
            default:
                return true;
        }
    }

    visibleTodos = () => {
        const { tasks, selectedProject, filter, term } = this.props;

        const todos = {};
        let task;
        for (let key in tasks) {
            task = tasks[key];
            if (task.projectId === selectedProject && this.filterTask(task, filter)) {
                if (term.length) {
                    if (this.searchTask(task, term)) {
                        todos[key] = tasks[key];
                    }
                } else {
                    todos[key] = tasks[key];
                }
            }
        }
        return todos;
    }

    onToggleDone = (taskId) => {
        this.props.toggleUpdateTask(taskId, 'done');
    }

    onToggleDeveloping = (taskId) => {
        this.props.toggleUpdateTask(taskId, 'inDeveloping');
    }

    render() {
        return (
            <TodoList todos={this.visibleTodos()}
                onDeleted={this.props.deleteTask}
                onToggleDone={this.onToggleDone}
                onToggleDeveloping={this.onToggleDeveloping}
            />
        )
    }
}


const mapStateToProps = ({ tasks, selectedProject, filter, term }) => ({
    tasks,
    selectedProject,
    filter,
    term
});

const mapDispatchToProps = {
    deleteTask,
    toggleUpdateTask
};


export default connect(mapStateToProps, mapDispatchToProps)(TodoListContainer);