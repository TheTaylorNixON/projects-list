import React, { Component } from 'react';

import AppHeader from '../AppHeader';
import SearchPanel from '../SearchPanel';
import TodoList from '../TodoList';
import ItemStatusFilter from '../ItemStatusFilter';
import ItemAddForm from '../ItemAddForm';

import database from '../../services/firebase';

import './App.css';


export default class App extends Component {

    constructor() {
        super();

        this.createTodoItem = (label) => {
            return {
                done: false,
                inDeveloping: false,
                label
            };
        };

        this.componentDidMount = () => {
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

        this.state = {
            todoData: {},
            term: '',
            filter: 'all'
        };

        this.onDataChange = (snapshot, actionType) => {
            if (snapshot) {
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

        this.searchItem = (items, term) => {
            if (term.length === 0) {
                return Object.keys(items);
            }
            return Object.keys(items).filter(key => {
                return items[key].label.toLowerCase() === term.toLowerCase();
            });
        }

        this.filter = (keys, items, filter) => {
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

        this.deleteItem = (id) => {
            database.ref('tasks/' + id).remove();
        };

        this.addItem = (text) => {
            const newChildRef = database.ref('tasks').push();
            const newItem = this.createTodoItem(text);

            newChildRef.set(newItem).catch((error) => {
                console.log(`Неудалось добавить задачу. Ошибка: ${error}`);
            });
        };

        this.toggleProperty = (todoData, id, propName) => {
            const oldItem = todoData[id];
            const newItem = { ...oldItem, [propName]: !oldItem[propName] };

            database.ref('tasks/' + id).update(newItem).catch((error) => {
                console.log(`Неудалось добавить задачу. Ошибка: ${error}`);
            });
        }

        this.updateTask = (id, propName) => {
            const { todoData } = this.state;
            const oldItem = todoData[id];
            const newItem = { ...oldItem, [propName]: !oldItem[propName] };

            database.ref('tasks/' + id).update(newItem).catch((error) => {
                console.log(`Неудалось добавить задачу. Ошибка: ${error}`);
            });
        }

        this.onToggleDeveloping = (id) => {
            this.updateTask(id, 'inDeveloping');
        }

        this.onToggleDone = (id) => {
            this.updateTask(id, 'done');
        }

        this.onSearchChange = (term) => {
            this.setState({
                term: term
            });
        }

        this.onFilterChange = (filter) => {
            this.setState({
                filter: filter
            });
        }
    }

    render() {
        const { todoData, term, filter } = this.state;
        const visibleItems = this.filter(this.searchItem(todoData, term), todoData, filter);
        const doneCount = Object.keys(todoData).filter(key => todoData[key].done).length;
        const todoCount = Object.keys(todoData).length - doneCount;

        return (
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
        );
    }
};