import React, { Component } from 'react';

import { connect } from 'react-redux';

import ItemAddForm from './ItemAddForm';


class ItemAddFormContainer extends Component {

    onItemAdded = (text) => {
        // dispatch();
        console.log(text);
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


export default connect(mapStateToProps)(ItemAddFormContainer);