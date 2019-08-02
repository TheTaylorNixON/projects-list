import React from 'react';
import ProjectsList from './ProjectsList';
import ProjectAddForm from '../ProjectAddForm';

import { connect } from 'react-redux';
import { addProject, deleteProject, selectProject } from '../../store/projects/actions';

import database from '../../services/firebase';


const ProjectsListContainer = ({ addProject, deleteProject, selectProject, projects }) => {

    const onProjectAdded = (projectName) => {
        const newChildRef = database.ref('projects').push();
        const projectId = newChildRef.key;

        addProject({ [projectId]: projectName });
        selectProject(projectId);

        newChildRef.set(projectName).catch((error) => {
            console.log(`Не удалось добавить проект. Ошибка: ${error}`);
        });
    }

    const onProjectDeleted = (projectId) => {
        const newProjects = Object.assign({}, projects);
        delete newProjects[projectId];

        deleteProject(newProjects);
        database.ref('projects/' + projectId).remove().catch((error) => {
            console.log(`Не удалось удалить проект. Ошибка: ${error}`);
        });
    }

    const onProjectClicked = (projectId) => {
        selectProject(projectId);
    }

    return (
        <div className="list-group-item">
            <ProjectAddForm onProjectAdded={onProjectAdded} />
            <ProjectsList onProjectClicked={onProjectClicked} projects={projects} onProjectDeleted={onProjectDeleted} />
        </div>
    )
}

const mapStateToProps = ({ projects }) => ({
    projects
});

const mapDispatchToProps = {
    addProject,
    selectProject,
    deleteProject
}


export default connect(mapStateToProps, mapDispatchToProps)(ProjectsListContainer); 