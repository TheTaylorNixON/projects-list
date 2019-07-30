import React from 'react';

import ProjectsListItem from '../ProjectsListItem';
import './ProjectsList.css';


const ProjectsList = (props) => {

    const { projects, onProjectClicked } = props;
    const project = Object.keys(projects).map((key) => {
        return <ProjectsListItem
            key={key}
            label={projects[key]}
            onProjectClicked={() => onProjectClicked(key)}
        />
    });

    return (
        <ul className="nav flex-column">
            {project}
        </ul>
    )
}

export default ProjectsList;