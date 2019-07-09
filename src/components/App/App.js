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
                label
            };
        };

        this.componentDidMount = () => {
            // const tasksRef = database.ref('tasks');
            const tasksRef = database.ref().child("tasks");
            const startKey = tasksRef.push().key;

            tasksRef.once('value').then(snapshot => {
                const todoData = snapshot.val();

                if (todoData) {
                    this.setState({
                        todoData
                    })
                }
            });


            // const messagesRef = database.ref().child("tasks");
            tasksRef.orderByKey().startAt(startKey).on("child_added", snapshot => {
                console.log(snapshot.val());
            });

            tasksRef.on('child_changed', snapshot => {
                console.log(snapshot.val());
            })

            tasksRef.on('child_removed', snapshot => {
                console.log(snapshot.val());
                console.log(snapshot.key);
            })


            // database.ref('tasks').on('child_added', doc => {
            //     // console.log(doc);
            //     // console.log("child_added: ", doc.val());
            //     const todoData = doc.val();

            //     if (todoData) {
            //         this.setState({
            //             todoData
            //         })
            //     }
            // });




            // var newPostKey = database.ref().child('tasks').push().key;
            // console.log(database.ref().child('tasks').push().key);

            // var ref = firebase.database().ref(user + "/data/order_name");

            // database.ref('tasks').on("value", function(snapshot) {
            //     console.log(snapshot);
            //     console.log(snapshot.val());
            // });





            // database.ref('tasks').on('child_added', doc => {
            //     console.log("child_added: ", doc.val());
            // });

            // database.ref('tasks').on('child_changed', doc => {
            //     console.log("child_changed: ", doc.val());
            // });






            // database.ref('tasks').on('value', doc => {
            //     console.log(doc.val());
            // });

            // database.ref('tasks').on('value', snapshot => {
            // this.setState(({ todoData }) => {
            // if (snapshot.val()) {
            //     this.setState({
            //         todoData: snapshot.val()
            //         // todoData: snapshot.val().map((el) => {
            //         //     return this.createTodoItem(el);
            //         // }),
            //     });
            //     this.maxId = snapshot.val()[snapshot.val().length - 1].id
            // }
            // })
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
            this.setState(({ todoData }) => {
                const newData = Object.assign(todoData, {});
                delete newData[id];

                return {
                    todoData: newData
                }
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