import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addProject } from '../../store/projects/actions';

import database from '../../services/firebase';

import ProjectAddForm from '../ProjectAddForm';
import ProjectsListItem from '../ProjectsListItem';
import './ProjectsList.css';


class ProjectsList extends Component {

    componentDidMount = () => {
        const projectsRef = database.ref().child("projects");
        const startKey = projectsRef.push().key;

        projectsRef.once('value').then(snapshot => {
            this.props.addProject(snapshot.val());
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
        const newChildRef = database.ref('projects').push();
        const newProject = {
            projectName
        }
        newChildRef.set(newProject).catch((error) => {
            console.log(`Неудалось добавить проект. Ошибка: ${error}`);
        });
        this.props.addProject({ [newChildRef.key]: newProject });
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


const mapStateToProps = (state) => ({
    projects: state.projects
});

const mapDispatchToProps = (dispatch) => ({
    addProject: bindActionCreators(addProject, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList);