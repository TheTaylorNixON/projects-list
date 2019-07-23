import React, { Component } from 'react';

import App from './App';

import { connect } from 'react-redux';

import { addProject, startApp } from '../../store/projects/actions';
import { bindActionCreators } from 'redux';

import database from '../../services/firebase';


class AppContainer extends Component {

    componentDidMount() {
        const { startApp } = this.props;
        const tasksRef = database.ref().child("projects");

        tasksRef.once('value').then(snapshot => {
            startApp(snapshot.val());
        });
    }

    render() {
        console.log(this.props.projects);
        return (
            <App />
        );
    }
}


const mapStateToProps = ({ projects }) => ({
    projects
});

const mapDispatchToProps = dispatch => ({
    addProject: bindActionCreators(addProject, dispatch),
    startApp: bindActionCreators(startApp, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);