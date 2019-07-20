import React from 'react';

import './ProjectsListItem.css';

const ProjectsListItem = (props) => {

    const { label, onProjectClicked } = props;
    return (
        <li className="nav-item" onClick={onProjectClicked} >
            {/* <a href="#" className="nav-link">
                {label}
            </a> */}
            <button className="btn-default nav-link nav-tabs">
                {label}
            </button>
        </li>
    )
}

export default ProjectsListItem;