import React from 'react';

import ProjectsListItem from '../ProjectsListItem';
import './ProjectsList.css';


const ProjectsList = (props) => {

    const { projects, selectedProject, onProjectClicked, onProjectDeleted } = props;
    const project = Object.keys(projects).map((key) => {
        const clazz = selectedProject === key ? 'selected-project' : '';
        return <ProjectsListItem
            clazz={clazz}
            key={key}
            label={projects[key].label}
            onProjectClicked={() => onProjectClicked(key)}
            onProjectDeleted={() => onProjectDeleted(key)}
        />
    });

    return (
        <ul className="nav flex-column">
            {project}
        </ul>
    )
}

export default ProjectsList;