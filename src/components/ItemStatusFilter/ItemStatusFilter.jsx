import React from 'react';

import { connect } from 'react-redux';

import { setFilter } from '../../store/tasks/actions';

import './ItemStatusFilter.css';

const ItemStatusFilter = (props) => {

  const buttonsGroup = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Done' }
  ];

  const { filter, setFilter } = props;
  const buttons = buttonsGroup.map(({ name, label }) => {
    const isActive = filter === name;
    const clazz = isActive ? 'btn-info' : 'btn-outline-secondary';
    return (
      <button type="button" key={name}
        className={`btn ${clazz}`}
        onClick={() => setFilter(name)}>
        {label}
      </button>
    )
  })

  return (
    <div className="btn-group">
      {buttons}
    </div>
  );
}


const mapStateToProps = state => ({
  filter: state.tasks.filter
})

const mapDispatchToProps = {
  setFilter
}


export default connect(mapStateToProps, mapDispatchToProps)(ItemStatusFilter)