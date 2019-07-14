import React, { Component } from 'react'

import ProjectAddForm from '../ProjectAddForm';
import ProjectsListItem from '../ProjectsListItem';
import './ProjectsList.css';


export default class ProjectsList extends Component {


    render() {
        const arr = ['smtext1', 'smtext2', 'smtext3', 'smtext4', 'smtext5'];
        const el = arr.map((label) => {
            return (
                <ProjectsListItem key={label} label={label} />
            )
        });

        return (
            <div>
                <ProjectAddForm />
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