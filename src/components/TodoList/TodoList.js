import React from 'react';

import TodoListItem from '../TodoListItem';
import './TodoList.css';

const TodoList = ({ todos, onDeleted, onToggleImportant, onToggleDone }) => {

    const el = todos.map((item) => {
        const {id, ...itemProps} = item;

        return (
            // <li><TodoListItem label = {item.label} important = {item.important} /></li>
            <li key={id} className="list-group-item">
                <TodoListItem 
                    {... itemProps}
                    onDeleted={ () => onDeleted(id) } 
                    onToggleImportant = { () => onToggleImportant(id) }
                    onToggleDone = { () => onToggleDone(id) }
                />
            </li>
        );
    });

    return (
        <ul className="list-group todo-list">
            {el}
        </ul>
    );
};

export default TodoList;