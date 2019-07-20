import React from 'react';
import ProjectsList from './ProjectsList';

import { connect } from 'react-redux';
import { addProject } from '../../store/projects/actions';
// import { bindActionCreators } from 'redux';


const ProjectsListContainer = (props) => {
    const { addProject, projects } = props;
    return (
        <ProjectsList addProject={addProject} projects={projects} />
    )
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