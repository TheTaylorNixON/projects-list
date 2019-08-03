import React from 'react';
import ProjectsList from './ProjectsList';
import ProjectAddForm from '../ProjectAddForm';

import { connect } from 'react-redux';
import { addProject, deleteProject, selectProject, deleteTask } from '../../store/projects/actions';

import database from '../../services/firebase';


const ProjectsListContainer = ({ addProject, deleteProject, selectProject, projects, tasks, deleteTask }) => {

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

        const newTasks = { ...tasks }
        Object.keys(tasks).forEach((key) => {
            if (tasks[key].projectId === projectId) {
                delete newTasks[key];
                database.ref('tasks/' + key).remove().catch((error) => {
                    console.log(`Не удалось удалить задачу. Ошибка: ${error}`);
                });
            }
        });
        deleteTask(newTasks);
        selectProject(Object.keys(projects)[0]);

        // database.ref('tasks')
        //     .orderByChild("projectId")
        //     .equalTo(projectId)
        //     .once('value')
        //     .then((snapshot) => {
        //         snapshot.forEach((childSnapshot) => {
        //             childSnapshot.ref.remove();
        //         });
        //     })
        //     .catch((error) => {
        //         console.log(`Не удалось удалить проект. Ошибка: ${error}`);
        //     })
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

const mapStateToProps = ({ projects, tasks }) => ({
    projects,
    tasks
});

const mapDispatchToProps = {
    addProject,
    selectProject,
    deleteProject,
    deleteTask
}


export default connect(mapStateToProps, mapDispatchToProps)(ProjectsListContainer); 