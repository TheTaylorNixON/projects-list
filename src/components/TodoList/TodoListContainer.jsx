import React, { Component } from 'react';

import TodoList from './TodoList';

import { connect } from 'react-redux';

import { deleteTask, toggleUpdateTask } from '../../store/projects/actions';

import database from '../../services/firebase';


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

    onDeleted = (taskId) => {
        const newTasks = Object.assign({}, this.props.tasks);
        delete newTasks[taskId];

        this.props.deleteTask(newTasks);
        database.ref('tasks/' + taskId).remove().catch((error) => {
            console.log(`Не удалось удалить задачу. Ошибка: ${error}`);
        });
    }

    onToggleDone = (taskId) => {
        const oldTask = this.props.tasks[taskId];
        const newTask = { ...oldTask, done: !oldTask.done };

        this.props.toggleUpdateTask({ [taskId]: newTask });
        database.ref('tasks/' + taskId).update(newTask).catch((error) => {
            console.log(`Не удалось обновить задачу. Ошибка: ${error}`);
        });
    }

    onToggleDeveloping = (taskId) => {
        const oldTask = this.props.tasks[taskId];
        const newTask = { ...oldTask, inDeveloping: !oldTask.inDeveloping }

        this.props.toggleUpdateTask({ [taskId]: newTask });
        database.ref('tasks/' + taskId).update(newTask).catch((error) => {
            console.log(`Не удалось обновить задачу. Ошибка: ${error}`);
        });
    }

    render() {
        return (
            <TodoList todos={this.visibleTodos()}
                onDeleted={this.onDeleted}
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