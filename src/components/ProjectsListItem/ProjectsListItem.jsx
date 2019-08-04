import React from 'react';

import './ProjectsListItem.css';


const ProjectsListItem = (props) => {

    const { label, clazz, onProjectClicked, onProjectDeleted } = props;
    const onProjectClick = (e) => {
        if (e.target.tagName === 'SPAN') {
            onProjectClicked();
        }
    }

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
        <span onClick={onProjectClick} className={`list-group-item ${clazz}`} >
            <span>{label}</span>
            <button onClick={onProjectDeleted} type="button" className="btn btn-outline-danger btn-sm float-right">
                <i className="fa fa-trash-o" />
            </button>
        </span>
    )
}


export default ProjectsListItem;