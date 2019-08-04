import React from 'react';
import ProjectsList from './ProjectsList';
import ProjectAddForm from '../ProjectAddForm';

import { connect } from 'react-redux';
import { addProject, deleteProject, selectProject } from '../../store/projects/actions';


const ProjectsListContainer = ({ addProject, deleteProject, selectProject, selectedProject, projects }) => {
    return (
        <div className="list-group">
            <ProjectAddForm onProjectAdded={addProject} />
            <ProjectsList onProjectClicked={selectProject}
                selectedProject={selectedProject}
                projects={projects}
                onProjectDeleted={deleteProject} />
        </div>
    )
}

const mapStateToProps = ({ projects, selectedProject }) => ({
    projects,
    selectedProject
});

const mapDispatchToProps = {
    addProject,
    selectProject,
    deleteProject
}


export default connect(mapStateToProps, mapDispatchToProps)(ProjectsListContainer); 