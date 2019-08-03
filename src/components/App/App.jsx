import React from 'react';

import ProjectsListContainer from '../ProjectsList';
import AppHeaderContainer from '../AppHeader';
import SearchPanel from '../SearchPanel';
import TodoListContainer from '../TodoList';
import ItemStatusFilter from '../ItemStatusFilter';
import ItemAddFormContainer from '../ItemAddForm';

import './App.css';


const App = () => {
    return (
        <div className="container-fluid">
            <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                <div className="sidebar-sticky">
                    <ProjectsListContainer />
                </div>
            </nav>
            <main className="col-md-9 ml-sm-auto col-lg-10 px-4">
                <div className="todo-app">
                    <AppHeaderContainer />
                    <div className="top-panel d-flex">
                        <SearchPanel />
                        <ItemStatusFilter />
                    </div>
                    <TodoListContainer />
                    <ItemAddFormContainer />
                </div>
            </main>
        </div>
    );
}


export default App;