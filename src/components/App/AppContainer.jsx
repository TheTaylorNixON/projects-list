import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
    startApp, setCurrentUserId,
    onTasksUpdate, onTaskDelete,
    onProjectsUpdate, onProjectDelete
} from '../../store/projects/actions';

import database from '../../services/firebase';

import App from './App';


class AppContainer extends Component {

    constructor(props) {
        super(props);
        this.updateState = this.updateState.bind(this);
    }

    updateState(currentUserId, snapshot, eventType) {
        const newData = snapshot.val();
        const { userId } = newData;

        if (currentUserId === userId) return;

        switch (eventType) {
            case 'task_added':
            case 'task_changed':
                this.props.onTasksUpdate({ [snapshot.key]: newData });
                break;

            case 'project_added':
                this.props.onProjectsUpdate({ [snapshot.key]: newData });
                break;

            default:
                break;
        }
    }

    componentDidMount() {

        const dbRef = database.ref();
        const currentUserId = dbRef.push().key;

        dbRef.once('value').then((snapshot) => {
            this.props.startApp(snapshot.val(), currentUserId);

            dbRef.child('tasks').on('child_added', snapshot => {
                this.updateState(currentUserId, snapshot, 'task_added');
            });
            dbRef.child('tasks').on('child_changed', snapshot => {
                this.updateState(currentUserId, snapshot, 'task_changed');
            });
            dbRef.child('tasks').on('child_removed', snapshot => {
                this.props.onTaskDelete(snapshot.key);
            });

            dbRef.child('projects').on('child_added', snapshot => {
                this.updateState(currentUserId, snapshot, 'project_added');
            });
            dbRef.child('projects').on('child_removed', snapshot => {
                this.props.onProjectDelete(snapshot.key);
            });
        });
    }

    render() {
        return <App />
    }
}


const mapDispatchToProps = dispatch => ({
    startApp: bindActionCreators(startApp, dispatch),
    setCurrentUserId: bindActionCreators(setCurrentUserId, dispatch),
    onTasksUpdate: bindActionCreators(onTasksUpdate, dispatch),
    onTaskDelete: bindActionCreators(onTaskDelete, dispatch),
    onProjectsUpdate: bindActionCreators(onProjectsUpdate, dispatch),
    onProjectDelete: bindActionCreators(onProjectDelete, dispatch)
});


export default connect(null, mapDispatchToProps)(AppContainer);