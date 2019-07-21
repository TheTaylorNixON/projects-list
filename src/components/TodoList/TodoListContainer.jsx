import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TodoList from './TodoList';


class TodoListContainer extends Component {



    render() {
        const { todos } = this.props;

        <TodoList todos={todos} />
    }
}


mapStateToProps = state => ({
    todos: state.projects[key].todos
});

mapDispatchToProps = dispatch => ({
    onDeleted: bindActionCreators(dispatch),
    onToggleDone: bindActionCreators(dispatch),
    onToggleDeveloping: bindActionCreators(dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(TodoListContainer);