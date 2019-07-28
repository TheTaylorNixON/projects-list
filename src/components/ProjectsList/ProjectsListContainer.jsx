import React from 'react';
import ProjectsList from './ProjectsList';
import ProjectAddForm from '../ProjectAddForm';

import { connect } from 'react-redux';
import { addProject, selectProject } from '../../store/projects/actions';

import database from '../../services/firebase';


const ProjectsListContainer = ({ addProject, selectProject, projects }) => {

    const onProjectAdded = (projectName) => {
        const newChildRef = database.ref('projects').push();
        const newProject = {
            projectName
        }

        newChildRef.set(newProject).then(() => {
            addProject(newProject);
        }).catch((error) => {
            console.log(`Неудалось добавить проект. Ошибка: ${error}`);
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
    projects: projects.projectsData
});

const mapDispatchToProps = {
    addProject,
    selectProject
}

// const mapDispatchToProps = dispatch => {
//     return {
//         addProject: bindActionCreators(addProject, dispatch)
//     }
// }


export default connect(mapStateToProps, mapDispatchToProps)(ProjectsListContainer); 