import React, { Component } from 'react';

import './ProjectAddForm.css';


export default class ProjectAddForm extends Component {

    state = {
        input: false,
        label: ''
    }

    onLabelChange = (e) => {
        const label = e.target.value;
        this.setState({
            label
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onProjectAdded(this.state.label);
        this.setState({
            label: ''
        })
    }

    render() {
        return (
            <form onSubmit={this.onSubmit} className="leftpanel-add-form item-add-form d-flex">
                <input onChange={this.onLabelChange} value={this.state.label} type="text" className="form-control" placeholder="Add new project" />
                <div className="input-group-prepend">
                    <button className="btn btn-outline-secondary fa fa-plus" type="submit" id="button-addon1" />
                </div>
            </form>
        )
    }
}