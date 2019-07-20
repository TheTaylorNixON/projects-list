import React, { Component } from 'react';

import ProjectAddForm from '../ProjectAddForm';
import ProjectsListItem from '../ProjectsListItem';
import './ProjectsList.css';

import database from '../../services/firebase';


export default class ProjectsList extends Component {

    componentDidMount = () => {
        const { addProject } = this.props;
        const projectsRef = database.ref().child("projects");
        // const startKey = projectsRef.push().key;

        projectsRef.once('value').then(snapshot => {
            addProject(snapshot.val());
        });

        // tasksRef.orderByKey().startAt(startKey).on('child_added', snapshot => {
        //     this.onDataChange(snapshot, 'child_added');
        // });

        // tasksRef.on('child_changed', snapshot => {
        //     this.onDataChange(snapshot, 'child_changed');
        // })

        // tasksRef.on('child_removed', snapshot => {
        //     this.onDataChange(snapshot, 'child_removed');
        // })
    }

    onProjectAdded = (projectName) => {
        const { addProject } = this.props;
        const newChildRef = database.ref('projects').push();
        const newTasksRef = database.ref('tasks').push();
        const newProject = {
            projectName,
            [newTasksRef.key]: {
                done: false,
                inDeveloping: false,
                label: 'taskLabel'
            }
        }
        console.log(newProject);
        newChildRef.set(newProject).catch((error) => {
            console.log(`Неудалось добавить проект. Ошибка: ${error}`);
        });
        // addProject({ [newChildRef.key]: newProject });
    }

    render() {
        const { projects } = this.props;
        const project = Object.keys(projects).map((key) => {
            return <ProjectsListItem key={key} label={projects[key].projectName} />
        });

        return (
            <div>
                <ProjectAddForm onProjectAdded={this.onProjectAdded} />
                <ul className="nav flex-column">
                    {project}
                </ul>
            </div>
        )
    }
}