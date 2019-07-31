import React, { Component } from 'react';

import TodoList from './TodoList';

import { connect } from 'react-redux';

import { deleteTask, toggleUpdateTask } from '../../store/projects/actions';

import database from '../../services/firebase';


class TodoListContainer extends Component {

    filterTasks = (task) => {
        const { filter } = this.props;

        switch (filter) {
            case 'done':
                return task.done;
            case 'active':
                return !task.done;
            default:
                return !task.done;
        }
    }

    visibleTodos = () => {
        const { tasks, selectedProject, term } = this.props;

        const todos = {};
        for (let key in tasks) {
            if (tasks[key].projectId === selectedProject) {
                if (this.filterTasks(tasks[key])) {
                    if (!term.length || (term.length && tasks[key].label.indexOf(term) > -1)) {
                        todos[key] = tasks[key];
                    }
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