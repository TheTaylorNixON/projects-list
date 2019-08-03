import React from 'react';

import { connect } from 'react-redux';

import ItemAddForm from './ItemAddForm';

import { addTask } from '../../store/projects/actions';


const ItemAddFormContainer = (props) => {
    return (
        <ItemAddForm onItemAdded={props.addTask} />
    )
}


export default connect(null, { addTask })(ItemAddFormContainer);