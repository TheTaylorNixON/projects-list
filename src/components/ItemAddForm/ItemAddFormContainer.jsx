import React from 'react';

import { connect } from 'react-redux';

import ItemAddForm from './ItemAddForm';

import { addTask } from '../../store/projects/actions';


const ItemAddFormContainer = (props) => {
    if (!props.selectedProject) return null;

    return (
        <ItemAddForm onItemAdded={props.addTask} />
    )
}


export default connect(({ selectedProject }) => ({
    selectedProject
}), { addTask })(ItemAddFormContainer);