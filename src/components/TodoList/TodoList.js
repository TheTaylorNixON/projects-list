import React from 'react';

import TodoListItem from '../TodoListItem';
import './TodoList.css';

const TodoList = ({ todos, onDeleted, onToggleDeveloping, onToggleDone }) => {
    const el = Object.keys(todos).map(key => {
        const itemProps = todos[key];

        return (
            <li key={key} className="list-group-item">
                <TodoListItem
                    {...itemProps}
                    onDeleted={() => onDeleted(key)}
                    onToggleDeveloping={() => onToggleDeveloping(key)}
                    onToggleDone={() => onToggleDone(key)}
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