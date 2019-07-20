import React, { Component } from 'react';

import ProjectsListContainer from '../ProjectsList';
import AppHeader from '../AppHeader';
import SearchPanel from '../SearchPanel';
import TodoList from '../TodoList';
import ItemStatusFilter from '../ItemStatusFilter';
import ItemAddForm from '../ItemAddForm';

import database from '../../services/firebase';

import './App.css';


export default class App extends Component {

    constructor(props) {
        super(props);
        this.createTodoItem = this.createTodoItem.bind(this);
        this.onDataChange = this.onDataChange.bind(this);
        this.searchItem = this.searchItem.bind(this);
        this.filter = this.filter.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.updateTask = this.updateTask.bind(this);
        this.onToggleDeveloping = this.onToggleDeveloping.bind(this);
        this.onToggleDone = this.onToggleDone.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onFilterChange = this.onFilterChange.bind(this);

        this.state = {
            todoData: {},
            term: '',
            filter: 'all'
        };
    }

    componentDidMount() {
        const tasksRef = database.ref().child("tasks");
        const startKey = tasksRef.push().key;

        tasksRef.once('value').then(snapshot => {
            this.onDataChange(snapshot, 'app_start');
        });

        tasksRef.orderByKey().startAt(startKey).on('child_added', snapshot => {
            this.onDataChange(snapshot, 'child_added');
        });

        tasksRef.on('child_changed', snapshot => {
            this.onDataChange(snapshot, 'child_changed');
        })

        tasksRef.on('child_removed', snapshot => {
            this.onDataChange(snapshot, 'child_removed');
        })
    }

    createTodoItem(label) {
        return {
            done: false,
            inDeveloping: false,
            label
        };
    }

    onDataChange(snapshot, actionType) {
        if (snapshot.val()) {
            this.setState(({ todoData }) => {
                let newState;

                switch (actionType) {
                    case 'app_start':
                        return {
                            todoData: snapshot.val()
                        }
                    case 'child_added':
                    case 'child_changed':
                        newState = { ...todoData, [snapshot.key]: snapshot.val() }

                        return {
                            todoData: newState
                        }
                    case 'child_removed':
                        newState = { ...todoData };
                        delete newState[snapshot.key];

                        return {
                            todoData: newState
                        }
                    default:
                        return;
                }
            });
        }
    }

    searchItem(items, term) {
        if (term.length === 0) {
            return Object.keys(items);
        }
        return Object.keys(items).filter(key => {
            return items[key].label.toLowerCase() === term.toLowerCase();
        });
    }

    filter(keys, items, filter) {
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

    deleteItem(id) {
        database.ref('tasks/' + id).remove();
    }

    addItem(text) {
        const newChildRef = database.ref('tasks').push();
        const newItem = this.createTodoItem(text);

        newChildRef.set(newItem).catch((error) => {
            console.log(`Неудалось добавить задачу. Ошибка: ${error}`);
        });
    }

    updateTask(id, propName) {
        const { todoData } = this.state;
        const oldItem = todoData[id];
        const newItem = { ...oldItem, [propName]: !oldItem[propName] };

        database.ref('tasks/' + id).update(newItem).catch((error) => {
            console.log(`Неудалось обновить задачу. Ошибка: ${error}`);
        });
    }

    onToggleDeveloping(id) {
        this.updateTask(id, 'inDeveloping');
    }

    onToggleDone(id) {
        this.updateTask(id, 'done');
    }

    onSearchChange(term) {
        this.setState({
            term
        });
    }

    onFilterChange(filter) {
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
            <div className="container-fluid">
                {/* <div className="left-panel"> */}
                <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                    <div className="sidebar-sticky">
                        <ProjectsListContainer />
                    </div>
                </nav>
                {/* <div className="main-panel"> */}
                <main className="col-md-9 ml-sm-auto col-lg-10 px-4">
                    <div className="todo-app">
                        <AppHeader todo={todoCount} done={doneCount} />
                        <div className="top-panel d-flex">
                            <SearchPanel onSearchChange={this.onSearchChange} />
                            <ItemStatusFilter filter={filter} onFilterChange={this.onFilterChange} />
                        </div>
                        <TodoList
                            todos={visibleItems}
                            onDeleted={(id) => this.deleteItem(id)}
                            onToggleDeveloping={this.onToggleDeveloping}
                            onToggleDone={this.onToggleDone}
                        />
                        <ItemAddForm onItemAdded={this.addItem} />
                    </div>
                </main>
            </div>
        );
    }
};