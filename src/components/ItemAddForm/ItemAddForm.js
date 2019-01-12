import React, { Component } from 'react';

import './ItemAddForm.css';


export default class ItemAddForm extends Component {

    state = {
        label: ''
    }

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
        })
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onItemAdded(this.state.label);
        this.setState({
            label: ''
        })
    };

    render() {
        return (
            <form onSubmit={this.onSubmit} className="item-add-form d-flex">
                <input  onChange={this.onLabelChange} value={this.state.label} type="text" className="form-control" placeholder="What needs to be done"/>
                <button className="btn btn-outline-secondary">Add Element</button>
                {/* <button onClick={ () => this.props.onItemAdded('qwdwdq') } className="btn btn-outline-secondary">Add Element</button> */}
            </form>
        )
    }
}