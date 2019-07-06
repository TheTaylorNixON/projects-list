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

        this.maxId = 0;

        this.createTodoItem = (label) => {
            return {
                done: false,
                inDeveloping: false,
                label: label
            };
        };

        this.componentDidMount = () => {
            database.ref('tasks').once('value').then(snapshot => {
                const todoData = snapshot.val();
                console.log(todoData);

                if (todoData) {
                    Object.keys(todoData).map((key) => {
                        console.log(key);
                        const item = todoData[key];
                        console.log(item);
                    })
                    this.setState({
                        todoData
                    })
                    // this.maxId = todoData[todoData.length - 1].id + 1;
                }
            });


            // var newPostKey = database.ref().child('tasks').push().key;
            // console.log(newPostKey);
            // console.log(database.ref().child('tasks').push().key);


            database.ref('tasks').on('value', snapshot => {
                // setTimeout(() => {
                //     this.setState(({ todoData }) => {
                //         console.log(todoData);
                //         console.log(snapshot.val());
                //         console.log(todoData === snapshot.val());
                //     });
                // }, 1000);
                // console.log(this.state.todoData);
                // this.setState(({ todoData }) => {
                //     console.log(todoData);
                //     console.log(snapshot.val());
                //     console.log(todoData == snapshot.val());
                // });
                // if (snapshot.val()) {
                //     this.setState({
                //         todoData: snapshot.val()
                //         // todoData: snapshot.val().map((el) => {
                //         //     return this.createTodoItem(el);
                //         // }),
                //     });
                //     this.maxId = snapshot.val()[snapshot.val().length - 1].id
                // }
            })
        }

        this.state = {
            todoData: {},
            term: '',
            filter: 'all'
        };

        this.searchItem = (items, term) => {
            if (term.length === 0) {
                return Object.keys(items);
            }
            return Object.keys(items).filter(key => {
                return items[key].label.toLowerCase() === term.toLowerCase();
            });
            // return serchedItems.map(key => {
            //     return items[key];
            // })
            // return items.filter((item) => {
            //     return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
            // });
        }

        this.filter = (keys, items, filter) => {
            let newItems = {};

            switch (filter) {
                case 'all':
                    keys.forEach(key => {
                        newItems[key] = items[key];
                    });
                    return newItems;
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
            }
        }

        this.deleteItem = (id) => {
            database.ref('tasks/' + id).remove();
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
            const newChildRef = database.ref('tasks').push();
            const newItem = this.createTodoItem(text);

            newChildRef.set(newItem).then(() => {
                this.setState(({ todoData }) => {
                    const newData = { ...todoData, [newChildRef.key]: newItem };
                    return {
                        todoData: newData
                    }
                });
            }).catch((error) => {
                console.log(`Неудалось добавить задачу. Ошибка: ${error}`);
            });

            // database.ref('tasks/' + newItem.id).set({ [newItem.id]: newItem }, error => {
            //     if (error) {
            //         console.log(`Неудалось добавить задачу. Ошибка: ${error}`);
            //     } else {
            //         this.setState(({ todoData }) => {
            //             const newArr = [...todoData, newItem];
            //             return {
            //                 todoData: newArr
            //             }
            //         });
            //     }
            // });
        };

        this.toggleProperty = (todoData, id, propName) => {
            const oldItem = todoData[id];
            const newItem = { ...oldItem, [propName]: !oldItem[propName] };
            const newData = {
                ...todoData,
                [id]: newItem
            };

            return new Promise((resolve, reject) => {
                database.ref('tasks/' + id).update(newItem, error => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(newData);
                    }
                });
            });
        }

        this.updateTask = (id, propName) => {

            this.setState(({ todoData }) => {
                this.toggleProperty(todoData, id, propName).then(newData => {
                    this.setState({
                        todoData: newData
                    });
                }).catch(error => {
                    console.log(`Неудалось обновить задачу. Ошибка: ${error}`);
                });
            });

            // this.setState(async ({ todoData }) => {
            //     try {
            //         const newData = await this.toggleProperty(todoData, id, propName);
            //         this.setState({
            //             todoData: newData
            //         })
            //     } catch (error) {
            //         console.log(`Неудалось обновить задачу. Ошибка: ${error}`);
            //     }
            // });
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
        console.log(visibleItems);
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