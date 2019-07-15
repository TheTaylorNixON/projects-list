import React, { Component } from 'react'

import { connect } from 'react-redux'
import { addProject } from '../../actions'

import ProjectAddForm from '../ProjectAddForm';
import ProjectsListItem from '../ProjectsListItem';
import './ProjectsList.css';


class ProjectsList extends Component {

    // TODO add ids(keys)
    state = {
        projects: []
    }

    onProjectAdded = (label) => {
        dispatch(addProject(label));
        // this.setState(({ projects }) => {
        //     return {
        //         projects: [... projects, label]
        //     }
        // })
    }

    render() {
        const project = this.state.projects.map((label) => {
            return (
                <ProjectsListItem key={label} label={label} />
            )
        });

        return (
            <div>
                <ProjectAddForm onProjectAdded={this.onProjectAdded} />
                <ul className="nav flex-column">
                    { project }
                </ul>
            </div>
        )
    }
}

export default connect()(ProjectsList);