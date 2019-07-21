import React from 'react';
import ProjectsList from './ProjectsList';

import { connect } from 'react-redux';
import { addProject } from '../../store/projects/actions';

import database from '../../services/firebase';


const ProjectsListContainer = ({ addProject, projects }) => {

    const onProjectAdded = (projectName) => {
        const newChildRef = database.ref('projects').push();
        const newProject = {
            projectName
        }
        newChildRef.set(newProject).then(() => {
            addProject({ [newChildRef.key]: newProject });
        }).catch((error) => {
            console.log(`Неудалось добавить проект. Ошибка: ${error}`);
        });
    }

    const onProjectClicked = (key) => {
        console.log(key);
        console.log(projects[key]);
    }

    return (
        <ProjectsList onProjectAdded={onProjectAdded}
            onProjectClicked={onProjectClicked}
            projects={projects} />
    )
}

const mapStateToProps = ({ projects }) => ({
    projects
});

const mapDispatchToProps = {
    addProject
}

// const mapDispatchToProps = dispatch => {
//     return {
//         addProject: bindActionCreators(addProject, dispatch)
//     }
// }


export default connect(mapStateToProps, mapDispatchToProps)(ProjectsListContainer); 