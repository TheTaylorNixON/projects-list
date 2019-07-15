import React, { Component } from 'react'

import ProjectAddForm from '../ProjectAddForm';
import ProjectsListItem from '../ProjectsListItem';
import './ProjectsList.css';


export default class ProjectsList extends Component {

    // TODO add ids(keys)
    state = {
        projects: []
    }

    onProjectAdded = (label) => {
        this.setState(({projects}) => {
            return {
                projects: [... projects, label]
            }
        })
    }

    render() {
        const el = this.state.projects.map((label) => {
            return (
                <ProjectsListItem key={label} label={label} />
            )
        });

        return (
            <div>
                <ProjectAddForm onProjectAdded={this.onProjectAdded} />
                <ul className="nav flex-column">
                    {el}
                </ul>
            </div>
            // <ul className="list-group list-group-item-action btn-outline-secondary">
            //     {el}
            // </ul>
            // <ul className="nav flex-column">
            //     {el}
            // </ul>
        )
    }
}