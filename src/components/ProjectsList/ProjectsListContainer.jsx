import React, { Component } from 'react';
import ProjectsList from './ProjectsList';

import { connect } from 'react-redux';
import { addProject } from '../../store/projects/actions';
// import { bindActionCreators } from 'redux';

import database from '../../services/firebase';


class ProjectsListContainer extends Component {

    componentDidMount() {
        const projectsRef = database.ref().child("projects");

        projectsRef.once('value').then(snapshot => {
            this.props.addProject(snapshot.val());
        });
    }

    onProjectAdded = (projectName) => {
        const newChildRef = database.ref('projects').push();
        const newProject = {
            projectName,
            projectTasks: {}
        }
        newChildRef.set(newProject).catch((error) => {
            console.log(`Неудалось добавить проект. Ошибка: ${error}`);
        });
        this.props.addProject({ [newChildRef.key]: newProject });
    }

    onProjectClicked = (key) => {
        console.log(key);
        console.log(this.props.projects[key]);
    }

    render() {
        return (
            <ProjectsList onProjectAdded={this.onProjectAdded}
                onProjectClicked={this.onProjectClicked}
                projects={this.props.projects} />
        )
    }
}

const mapStateToProps = state => {
    return {
        projects: state.projects
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         addProject: bindActionCreators(addProject, dispatch)
//     }
// }

const mapDispatchToProps = {
    addProject
}


export default connect(mapStateToProps, mapDispatchToProps)(ProjectsListContainer); 