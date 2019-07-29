import React, { Component } from 'react';

import { connect } from 'react-redux';

import ItemAddForm from './ItemAddForm';

import { addTask } from '../../store/projects/actions';

import database from '../../services/firebase';


class ItemAddFormContainer extends Component {


    createTodoItem = (label) => ({
        done: false,
        inDeveloping: false,
        label
    });

    onItemAdded = (label) => {
        const newChildRef = database.ref('projects').push();
        const item = this.createTodoItem(label);
        console.log({ [newChildRef.key]: item });
        this.props.addTask({ [newChildRef.key]: item });
    }

    render() {
        return (
            <ItemAddForm onItemAdded={this.onItemAdded} />
        )
    }
}


const mapStateToProps = state => ({
    todoData: state.tasks.todoData
});

const mapDispatchToProps = {
    addTask
}


export default connect(mapStateToProps, mapDispatchToProps)(ItemAddFormContainer);