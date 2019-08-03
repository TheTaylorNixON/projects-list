import React from 'react';

import { connect } from 'react-redux';
import { setTerm } from '../../store/tasks/actions';

import './SearchPanel.css';


const SearchPanel = (props) => {

    const onSearchChange = (e) => {
        props.setTerm(e.target.value);
    }

    return (
        <input onChange={onSearchChange}
            type="text" className="form-control search-input"
            placeholder='type to search'
            value={props.term}
        />
    );
}


const mapStateToProps = ({ term }) => ({
    term
});

const mapDispatchToProps = {
    setTerm
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);