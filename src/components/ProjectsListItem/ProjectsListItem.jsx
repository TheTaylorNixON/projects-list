import React, { Component } from 'react';

import './ProjectsListItem.css';

export default class ProjectsListItem extends Component {
    render() {
        const { label } = this.props;
        return (
            <li className="nav-item">
                <a href="/asd" className="nav-link">
                    {label}
                </a>
                {/* <button className="btn-default nav-link">
                    {label}
                </button> */}
            </li>
        )
    }
}