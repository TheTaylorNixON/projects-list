import React, { Component } from 'react';

import AppHeader from '../AppHeader';
import SearchPanel from '../SearchPanel';
import TodoList from '../TodoList';
import ItemStatusFilter from '../ItemStatusFilter';
import ItemAddForm from '../ItemAddForm';

import './App.css';

import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyClGg4uNu6RviZYrS_U5-PVGV5wbFVIeDI",
    authDomain: "todo-list-c85d9.firebaseapp.com",
    databaseURL: "https://todo-list-c85d9.firebaseio.com",
    projectId: "todo-list-c85d9",
    storageBucket: "",
    messagingSenderId: "127468982712",
    appId: "1:127468982712:web:9c65c5e667c4326c"
};

firebase.initializeApp(firebaseConfig);
// var todoTaskList;
// firebase.database().ref('tasks').once('value').then(function (snapshot) {
//     console.log(snapshot.val());
//     // todoTaskList = snapshot.val();
// });


export default class App extends Component {

    constructor() {
        super();

        this.maxId = 0;

        this.createTodoItem = (label) => {
            return {
                label: label,
                important: false,
                done: false,
                // id: firebase.database().ref().child('id')
                // id: this.maxId++
                id: this.maxId+1
            };
        };

        this.componentDidMount = () => {
            // firebase.database().ref('tasks').set({
            //     label: 'taskName',
            //     important: false,
            //     done: false,
            //     id: this.maxId++
            // });
            firebase.database().ref('tasks').on('value', (snapshot) => {
                console.log(snapshot.val());
                if (snapshot.val()) {
                    this.setState({
                        todoData: snapshot.val()
                        // todoData: snapshot.val().map((el) => {
                        //     return this.createTodoItem(el);
                        // }),
                    });
                    this.maxId = snapshot.val()[snapshot.val().length-1].id
                }
            })
        }

        this.state = {
            // todoData: [
            //     this.createTodoItem('Drink Coffee'),
            //     this.createTodoItem('Write Code'),
            //     this.createTodoItem('Make App'),
            // ],
            todoData: [],
            term: '',
            filter: 'active'
        };

        this.searchItem = (items, term) => {
            if (term.length === 0) {
                return items;
            }
            return items.filter((item) => {
                return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
            });
        }

        this.filter = (items, filter) => {
            switch (filter) {
                case 'all':
                    return items;
                case 'active':
                    return items.filter((item) => !item.done);
                case 'done':
                    return items.filter((item) => item.done);
                default:
                    return items;
            }
        }

        this.deleteItem = (id) => {
            this.setState(({ todoData }) => {
                const idx = todoData.findIndex((el) => el.id === id);
                // const newArray = todoData.slice();  - пустой slice просто копирует массив
                // newArray.splice(idx,1) - splice удаляет элемент по индекусу, второй арг(1) кол-во элементов которое нужно удалить

                return {
                    // todoData: newArray - либо так, вроде тоже правильно
                    todoData: [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]
                };
            });
        };

        this.addItem = (text) => {
            const newItem = this.createTodoItem(text);

            firebase.database().ref('tasks/' + newItem.id).set(newItem);
            // this.setState(({ todoData }) => {
            //     const newArr = [...todoData, newItem];
            //     return {
            //         todoData: newArr
            //     }
            // });
        };

        this.toggleProperty = (arr, id, propName) => {
            const idx = arr.findIndex((el) => el.id === id),
                oldItem = arr[idx],
                newItem = { ...oldItem, [propName]: !oldItem[propName] },
                newArray = [
                    ...arr.slice(0, idx),
                    newItem,
                    ...arr.slice(idx + 1)

                ]
            return newArray;
        }

        this.onToggleImportant = (id) => {
            this.setState(({ todoData }) => {
                return {
                    todoData: this.toggleProperty(todoData, id, 'important')
                }
            })
        }

        this.onToggleDone = (id) => {
            this.setState(({ todoData }) => {
                return {
                    todoData: this.toggleProperty(todoData, id, 'done')
                }
            })
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
        const visibleItems = this.filter(this.searchItem(todoData, term), filter);
        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;

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
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                />
                <ItemAddForm onItemAdded={this.addItem} />
            </div>
        );
    }
};