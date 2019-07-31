import React from 'react';
import ProjectsList from './ProjectsList';
import ProjectAddForm from '../ProjectAddForm';

import { connect } from 'react-redux';
import { addProject, selectProject } from '../../store/projects/actions';

import database from '../../services/firebase';


const ProjectsListContainer = ({ addProject, selectProject, projects }) => {

    const onProjectAdded = (projectName) => {
        const newChildRef = database.ref('projects').push();
        const projectId = newChildRef.key;

        addProject({ [projectId]: projectName });
        selectProject(projectId);

        newChildRef.set(projectName).catch((error) => {
            console.log(`Не удалось добавить проект. Ошибка: ${error}`);
        });
    }

    const onProjectClicked = (key) => {
        selectProject(key);
    }

    return (
        <div>
            <ProjectAddForm onProjectAdded={onProjectAdded} />
            <ProjectsList onProjectClicked={onProjectClicked} projects={projects} />
        </div>
    )
}

const mapStateToProps = ({ projects }) => ({
    projects
});

const mapDispatchToProps = {
    addProject,
    selectProject
}


export default connect(mapStateToProps, mapDispatchToProps)(ProjectsListContainer); 