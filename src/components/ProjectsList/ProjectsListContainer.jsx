import React from 'react';
import ProjectsList from './ProjectsList';
import ProjectAddForm from '../ProjectAddForm';

import { connect } from 'react-redux';
import { addProject, deleteProject, selectProject } from '../../store/projects/actions';


const ProjectsListContainer = ({ addProject, deleteProject, selectProject, projects }) => {
    return (
        <div className="list-group">
            <ProjectAddForm onProjectAdded={addProject} />
            <ProjectsList onProjectClicked={selectProject} projects={projects} onProjectDeleted={deleteProject} />
        </div>
    )
}

const mapStateToProps = ({ projects }) => ({
    projects: projects
});

const mapDispatchToProps = {
    addProject,
    selectProject,
    deleteProject
}


export default connect(mapStateToProps, mapDispatchToProps)(ProjectsListContainer); 