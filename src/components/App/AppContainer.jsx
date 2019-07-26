import React, { Component } from 'react';

import App from './App';

import { connect } from 'react-redux';

import { addProject, startApp } from '../../store/projects/actions';
import { bindActionCreators } from 'redux';

import database from '../../services/firebase';


class AppContainer extends Component {

    state = {
        todoData: {},
        term: '',
        filter: 'all'
    };

    componentDidMount() {
        const { startApp } = this.props;
        const projectsRef = database.ref().child("projects");
        const tasksRef = database.ref().child("tasks");

        projectsRef.once('value').then(snapshot => {
            console.log(snapshot.val());
            startApp(snapshot.val());
        });

        tasksRef.once('value').then(snapshot => {
            this.setState({
                todoData: snapshot.val()
            })
        });
    }

    searchItem = (items, term) => {
        if (term.length === 0) {
            return Object.keys(items);
        }
        return Object.keys(items).filter(key => {
            return items[key].label.toLowerCase() === term.toLowerCase();
        });
    }

    filter = (keys, items, filter) => {
        let newItems = {};

        switch (filter) {
            case 'active':
                keys.filter(key => !items[key].done).forEach(key => {
                    newItems[key] = items[key];
                });
                return newItems;
            case 'done':
                keys.filter(key => items[key].done).forEach(key => {
                    newItems[key] = items[key];
                });
                return newItems;
            default:    // case 'all'
                keys.forEach(key => newItems[key] = items[key]);
                return newItems;
        }
    }

    deleteItem = (id) => {
        database.ref('tasks/' + id).remove();
    }

    addItem = (text) => {
        const newChildRef = database.ref('tasks').push();
        const newItem = this.createTodoItem(text);

        newChildRef.set(newItem).catch((error) => {
            console.log(`Неудалось добавить задачу. Ошибка: ${error}`);
        });
    }

    updateTask = (id, propName) => {
        const { todoData } = this.state;
        const oldItem = todoData[id];
        const newItem = { ...oldItem, [propName]: !oldItem[propName] };

        database.ref('tasks/' + id).update(newItem).catch((error) => {
            console.log(`Неудалось обновить задачу. Ошибка: ${error}`);
        });
    }

    onToggleDeveloping = (id) => {
        this.updateTask(id, 'inDeveloping');
    }

    onToggleDone = (id) => {
        this.updateTask(id, 'done');
    }

    onSearchChange = (term) => {
        this.setState({
            term
        });
    }

    onFilterChange = (filter) => {
        this.setState({
            filter
        });
    }

    render() {
        const { todoData, term, filter } = this.state;
        const visibleItems = this.filter(this.searchItem(todoData, term), todoData, filter);
        const doneCount = Object.keys(todoData).filter(key => todoData[key].done).length;
        const todoCount = Object.keys(todoData).length - doneCount;

        return (
            <App
                todoCount={todoCount}
                doneCount={doneCount}
                visibleItems={visibleItems}
                onDeleted={(id) => this.deleteItem(id)}
                onToggleDeveloping={this.onToggleDeveloping}
                onToggleDone={this.onToggleDone}
            />
        );
    }
}


const mapStateToProps = ({ projects }) => ({
    projects
});

const mapDispatchToProps = dispatch => ({
    addProject: bindActionCreators(addProject, dispatch),
    startApp: bindActionCreators(startApp, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);