import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { startApp } from '../../store/projects/actions';

import database from '../../services/firebase';

import App from './App';


class AppContainer extends Component {

    componentDidMount() {
        database.ref().once('value').then((snapshot) => {
            this.props.startApp(snapshot.val());
        });
    }

    render() {
        return <App />
    }
}


const mapStateToProps = ({ projects }) => ({
    projects
});

const mapDispatchToProps = dispatch => ({
    startApp: bindActionCreators(startApp, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);