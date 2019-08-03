import React from 'react';

import AppHeader from './AppHeader';

import { connect } from 'react-redux';

const AppHeaderContainer = (props) => {
    const { selectedProject, tasks } = props;
    const todo = [], done = [];

    Object.keys(tasks).forEach((key) => {
        const task = tasks[key];
        if (task.projectId !== selectedProject) return;
        if (task.done) {
            done.push(task);
        } else {
            todo.push(task);
        }
    });

    return (
        <AppHeader todo={todo.length} done={done.length} />
    )
}


const mapStateToProps = ({ selectedProject, tasks }) => ({
    selectedProject,
    tasks
})


export default connect(mapStateToProps)(AppHeaderContainer);