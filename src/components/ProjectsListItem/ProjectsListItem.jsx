import React from 'react';

import './ProjectsListItem.css';

const ProjectsListItem = (props) => {

    const { label, onProjectClicked, onProjectDeleted } = props;
    return (
        // <li className="nav-item" onClick={onProjectClicked} >
        //     {/* <a href="#" className="nav-link">
        //         {label}
        //     </a> */}
        //     <button className="btn-default nav-link nav-tabs">
        //         {label}
        //     </button>
        //     <button type="button" className="btn btn-outline-danger btn-sm float-right">
        //         <i className="fa fa-trash-o" />
        //     </button>
        // </li>
        <span onClick={onProjectClicked} className="list-group-item">
            <span>{label}</span>
            <button onClick={onProjectDeleted} type="button" className="btn btn-outline-danger btn-sm float-right">
                <i className="fa fa-trash-o" />
            </button>
        </span>
    )
}

export default ProjectsListItem;