import React, { Component } from 'react';

import TodoList from './TodoList';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class TodoListContainer extends Component {

    render() {
        const { projects, selectedProject } = this.props;

        const selected = selectedProject ? selectedProject : Object.keys(projects)[0];
        const todos = projects[selected] ? projects[selected].tasks : {};

        return (
            <TodoList todos={todos || {}} />
        )
    }
}


const mapStateToProps = ({ projects }) => ({
    projects: projects.projectsData,
    selectedProject: projects.selectedProject
});

const mapDispatchToProps = dispatch => ({
    onDeleted: bindActionCreators(dispatch),
    onToggleDone: bindActionCreators(dispatch),
    onToggleDeveloping: bindActionCreators(dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(TodoListContainer);