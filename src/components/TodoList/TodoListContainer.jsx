import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TodoList from './TodoList';


class TodoListContainer extends Component {



    render() {
        console.log(this.props);
        const { todos } = this.props;
        console.log(todos);
        console.log(todos['-LkFzDz8p8ONcq-UIWSf']);
        const td = todos['-LkFzDz8p8ONcq-UIWSf'] ? todos['-LkFzDz8p8ONcq-UIWSf'].tasks : {};

        return (
            <TodoList todos={td} />
        )
    }
}


const mapStateToProps = state => ({
    todos: state.projects
});

const mapDispatchToProps = dispatch => ({
    onDeleted: bindActionCreators(dispatch),
    onToggleDone: bindActionCreators(dispatch),
    onToggleDeveloping: bindActionCreators(dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(TodoListContainer);