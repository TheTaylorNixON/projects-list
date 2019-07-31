import React, { Component } from 'react';

import { connect } from 'react-redux';

import ItemAddForm from './ItemAddForm';

import { addTask } from '../../store/projects/actions';

import database from '../../services/firebase';


class ItemAddFormContainer extends Component {


    createTodoItem = (label, projectId) => ({
        done: false,
        inDeveloping: false,
        projectId,
        label
    });

    onItemAdded = (label) => {
        const { selectedProject, addTask } = this.props;
        const item = this.createTodoItem(label, selectedProject);
        const newChildRef = database.ref('tasks').push();

        newChildRef.set(item).catch((error) => {
            console.log(`Не удалось добавить проект. Ошибка: ${error}`);
        });
        addTask({ [newChildRef.key]: item });
    }

    render() {
        return (
            <ItemAddForm onItemAdded={this.onItemAdded} />
        )
    }
}


const mapStateToProps = ({ tasks, selectedProject }) => ({
    tasks,
    selectedProject
});

const mapDispatchToProps = {
    addTask
}


export default connect(mapStateToProps, mapDispatchToProps)(ItemAddFormContainer);