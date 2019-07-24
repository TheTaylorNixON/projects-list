import React from 'react';

import AppHeader from './AppHeader';

import { connect } from 'react-redux';

const AppHeaderContainer = (props) => {
    const { todo, done } = props;
    return (
        <AppHeader todo={todo} done={done} />
    )
}


// const mapStateToProps = (state) => {
//     console.log('IM STATE');
//     console.log(state);
//     return {
//         todoData: state.todoData
//     }
// }

const mapStateToProps = ({ todoData }) => ({
    todoData
})


export default connect(mapStateToProps)(AppHeaderContainer);