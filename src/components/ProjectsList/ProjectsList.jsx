import React from 'react';

import ProjectAddForm from '../ProjectAddForm';
import ProjectsListItem from '../ProjectsListItem';
import './ProjectsList.css';


const ProjectsList = (props) => {

    const { projects, onProjectAdded, onProjectClicked } = props;
    const project = Object.keys(projects).map((key) => {
        return <ProjectsListItem
            key={key}
            label={projects[key].projectName}
            onProjectClicked={() => onProjectClicked(key)}
        />
    });

    return (
        <div>
            <ProjectAddForm onProjectAdded={onProjectAdded} />
            <ul className="nav flex-column">
                {project}
            </ul>
        </div>
    )
}

export default ProjectsList;